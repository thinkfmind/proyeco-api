import { Request, Response, NextFunction } from "express";
import { RefreshToken } from "../models/refresh-token.model";
import jwt from "express-jwt";
import { db } from "../helpers/db";
import dotenv from "dotenv";

dotenv.config();

const secret: string = process.env.JWT_KEY ? process.env.JWT_KEY : "DEMO";

interface jwtInterface extends Request {
  user?: any;
}

export function authorize(roles: string | string[] = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    jwt({ secret, algorithms: ["HS256"] }),

    async (req: jwtInterface, res: Response, next: NextFunction) => {
      const user = await db.User.findById(req.user.sub);

      if (!user || (roles.length && !roles.includes(user.role)))
        return res.status(401).json({ message: "Unauthorized" });

      req.user.role = user.role;
      const refreshTokens = await db.RefreshToken.find({ user: user.id });
      req.user.ownsToken = (token: string) =>
        !!refreshTokens.find((o: RefreshToken) => o.token === token);
      next();
    },
  ];
}
