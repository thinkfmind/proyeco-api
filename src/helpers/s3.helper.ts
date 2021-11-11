import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import dotenv from 'dotenv';
import archiver from 'archiver';
import path from 'path';
import { PassThrough } from 'stream';
import moment from 'moment';

dotenv.config();

export const uploadS3 = (file: any, path: string) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const myFile = file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${path}/${uuidv4()}.${fileType}`,
    Body: file.buffer ?? 'asd',
  };

  return s3.upload(params).promise();
};

export const uploadPdfS3 = (file: any, equipo: string, empresa: string) => {
  const date = moment().format('DD-MM-YYYY-SSSS');
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const myFile = file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  if (fileType !== 'pdf') throw new Error('No es un pdf');

  const params = {
    Bucket: 'devenv-s3',
    Key: `historicos/${equipo}-${empresa}-${date}.${fileType}`,
    Body: file.buffer ?? 'asd',
  };

  return s3.upload(params).promise();
};

export const getFromS3 = (infos: any) => {
  console.log(infos)
  console.log(infos.length);
  const s3bucket = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    region: process.env.AWS_REGION,
  });

  const archive = archiver('zip', { zlib: { level: 5 } });

  for (let i = 0; i < infos.length; i += 1) {
    const passthrough = new PassThrough();
    s3bucket
      .getObject({ Bucket: 'devenv-s3', Key: `${infos[i].filename}` })
      .createReadStream()
      .pipe(passthrough);
    // name parameter is the name of the file that the file needs to be when unzipped.
    archive.append(passthrough, { name: infos[i].filename });
  }

  return archive;
};
