import { TUserTokenData } from "./user.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Creates an access token after successfull login
 * @param jwtpayload Data that the token will contain
 * @param secret A hashed secret sign of authority
 * @param expireTime Time of expiry of that token either '10d' or '365d' etc
 * @returns jwt access token
 */
const createAccesstoken = (
  jwtpayload: TUserTokenData,
  secret: string,
  expireTime: string
) => {
  return jwt.sign(jwtpayload, secret, { expiresIn: expireTime });
};

/**
 * Function to match user password and input password
 * @param plainText Password in plain text string
 * @param hashedText Encrypted password fetched from database
 * @returns Boolean whether paswword matched or not. True if password matches False if mismatch
 */
const isPasswordMatched = async (plainText: string, hashedText: string) => {
  return await bcrypt.compare(plainText, hashedText);
};

export const userAuthUtils = { createAccesstoken, isPasswordMatched };
