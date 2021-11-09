import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../helpers/db';
import { User, UserAuth } from '../models/user.model';
import { RefreshToken, RefreshTokenAuth } from '../models/refresh-token.model';
import { uploadS3, getFromS3 } from '../helpers/s3.helper';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { PassThrough } from 'stream';
import path from 'path';

dotenv.config();

const secret: string = process.env.JWT_KEY ? process.env.JWT_KEY : 'DEV_ENV';

export async function register(user: User, file: any): Promise<Object> {
  if (await db.User.findOne({ username: user.username })) {
    throw `Username "${user.username}" is already taken.`;
  }

  if (file) {
    const upload = await uploadS3(file, 'empresas');
    console.log(upload);
    user.picture = upload ? upload.Location : '';
  }

  // for (const filed of files) {
  //   const upload = await uploadS3(filed)
  // }

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const userCreated = await db.User.create(user);
  return basicDetails(userCreated);
}

export async function auth({ username, password, ipAddress }: UserAuth) {
  const user = await db.User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw 'Username or password is incorrect';

  if (user.trash) throw 'User desactivated';

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user, ipAddress);

  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: refreshToken.token,
  };
}

export async function refreshToken({ token, ipAddress }: RefreshTokenAuth) {
  const refreshToken = await getRefreshToken(token);
  const { user } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(user, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
}

async function getRefreshToken(token: string) {
  const refreshToken = await db.RefreshToken.findOne({ token }).populate('user');
  if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
  return refreshToken;
}

export async function revokeToken({ token, ipAddress }: RefreshTokenAuth) {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}

export async function getAllUsers() {
  const users = await db.User.find();
  return users.map((o: User) => basicDetails(o));
}

export async function getRefreshTokens(userId: string) {
  // check that user exists
  await getUser(userId);

  // return refresh tokens for user
  const refreshTokens = await db.RefreshToken.find({ user: userId });
  return refreshTokens;
}

export async function updateUser(body: any, id: any, file: any) {
  const user = {
    name: body.name,
    username: body.username,
    role: body.role,
  };

  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
    Object.assign(user, { password: body.password });
  }

  if (file) {
    const upload = await uploadS3(file, 'empresas');
    Object.assign(user, { picture: upload.Location });
  }

  return await db.User.findOneAndUpdate({ _id: id }, user);
}

// const multiFilesStream = (infos: any) => {
//   // using archiver package to create archive object with zip setting -> level from 0(fast, low compression) to 10(slow, high compression)
//   const archive = archiver('zip', { zlib: { level: 5 } });

//   for (let i = 0; i < infos.length; i += 1) {
//     // using pass through stream object to wrap the stream from aws s3
//     const passthrough = new PassThrough();
//     s3bucket
//       .getObject({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: path.join(infos[i].path, infos[i].filename);
//       })
//       .createReadStream()
//       .pipe(passthrough);
//     // name parameter is the name of the file that the file needs to be when unzipped.
//     archive.append(passthrough, { name: infos[i].filename });
//   }
//   return archive;
// };

// * HELPERS

function basicDetails(user: User): object {
  const { id, name, username, role, picture, createdAt } = user;
  return { id, name, username, role, picture, createdAt };
}

// CHECK RETURN PROMISE<OBJECT>
async function getUser(id: string): Promise<Object> {
  if (!db.isValidId(id)) throw 'User not found';
  const user = await db.User.findById(id);
  if (!user) throw 'User not found';
  return user;
}

function generateJwtToken(user: User) {
  // create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign({ sub: user.id, id: user.id }, secret, {
    expiresIn: '15d',
  });
}

function generateRefreshToken(user: User, ipAddress: string) {
  // create a refresh token that expires in 7 days
  return new db.RefreshToken({
    user: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
}

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

export async function trashUser(id: any, state: any) {
  await db.User.findAndUpdate({ _id: id }, { trash: state });
}

export async function deleteUser(id: any) {
  const search = await db.User.findById(id);
  if (!search) throw new Error('User not found');

  if (search.name === 'Admin') throw new Error('IS ADMIN');

  const search2 = await db.Equipo.find({ empresa: id });

  for (let equipo of search2) {
    await db.Linea.findOneAndUpdate({ _id: equipo.linea }, { $pull: { empresas: search.id } });
  }

  await db.Historico.deleteMany({ empresa: id });
  await db.Actividad.deleteMany({ empresa: id });
  await db.Equipo.deleteMany({ empresa: id });

  await db.User.deleteOne({ _id: id });
}
