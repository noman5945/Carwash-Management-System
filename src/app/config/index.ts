import dotenv, { config } from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_connection_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};
