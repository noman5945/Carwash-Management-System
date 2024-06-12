import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchemas = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
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

export const User = model<TUser>("user", userSchemas);
