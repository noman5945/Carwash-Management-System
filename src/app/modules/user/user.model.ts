import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { NextFunction } from "express";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchemas = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxlength: 20,
    },
    phone: {
      type: String,
      required: [true, "Phone Number required"],
      maxlength: 11,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    address: {
      type: String,
      required: [true, "Address required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchemas.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<TUser>("user", userSchemas);
