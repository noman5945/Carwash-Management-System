import { TUserTokenData } from "./user.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createAccesstoken = (
  jwtpayload: TUserTokenData,
  secret: string,
  expireTime: string
) => {
  return jwt.sign(jwtpayload, secret, { expiresIn: expireTime });
};

const isPasswordMatched = async (plainText: string, hashedText: string) => {
  return await bcrypt.compare(plainText, hashedText);
};

export const userAuthUtils = { createAccesstoken, isPasswordMatched };
