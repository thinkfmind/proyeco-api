import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import * as service from '../services/user.services';
import { Role } from '../helpers/role';
import Joi from 'joi';

interface MulterRequest extends Request {
  file: any;
}

export function registerSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(4).required(),
    password: Joi.string().min(5).required(),
    role: Joi.string(),
  });
  validateRequest(req, next, schema);
}

export function register(req: Request, res: Response, next: NextFunction) {
  const documentFile = (req as MulterRequest).file;
  service
    .register(req.body, documentFile)
    .then((user) => res.json(user))
    .catch(next);
}

export function updateUser(req: Request, res: Response, next: NextFunction) {
  const documentFile = (req as MulterRequest).file;
  const id = req.params.id;
  service
    .updateUser(req.body, id, documentFile)
    .then((user) => res.json(user))
    .catch(next);
}

export function authenticateSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  service
    .auth(req.body)
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
}

export function refreshToken(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.refreshToken;
  const ipAddress: string = req.ip;

  service
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
}

export function revokeTokenSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    token: Joi.string().empty(''),
  });
  validateRequest(req, next, schema);
}

interface jwtInterface extends Request {
  user?: any;
}

export function revokeToken(req: jwtInterface, res: Response, next: NextFunction) {
  // accept token from request body or cookie
  const token: string = req.body.token || req.cookies.refreshToken;
  const ipAddress: string = req.ip;

  if (!token) return res.status(400).json({ message: 'Token is required' });

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  service
    .revokeToken({ token, ipAddress })
    .then(() => res.json({ message: 'Token revoked' }))
    .catch(next);
}

export function getAllUsers(req: Request, res: Response, next: NextFunction) {
  service
    .getAllUsers()
    .then((users) => res.json(users))
    .catch(next);
}

export function getRefreshTokens(req: jwtInterface, res: Response, next: NextFunction) {
  // users can get their own refresh tokens and admins can get any user's refresh tokens
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  service
    .getRefreshTokens(req.params.id)
    .then((tokens) => (tokens ? res.json(tokens) : res.sendStatus(404)))
    .catch(next);
}

// helper functions

function setTokenCookie(res: Response, token: string) {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie('refreshToken', token, cookieOptions);
}

export function trashUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .trashUser(id, req.body)
    .then(() => res.json({success: true}))
    .catch(next);
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .deleteUser(id)
    .then(() => res.json({success: true}))
    .catch(next);
}