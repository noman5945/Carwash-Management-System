import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchasync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchasync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access denied");
    }
    const token = tokenString?.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      config.jwt_accsess_token_sign as string
    ) as JwtPayload;
    const { role } = decoded;
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access denied");
    }
    next();
  });
};

export default auth;
