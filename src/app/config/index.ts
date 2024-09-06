import dotenv, { config } from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_connection_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  jwt_accsess_token_sign: process.env.JWT_ACCESS_TOKEN_SECRATE,
  bcrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};
