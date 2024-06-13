import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { NextFunction } from "express";

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
      select: false,
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

// userSchemas.post("save", async function (doc, next) {
//   let data = await this.model("user").findById(doc._id).select("-password");

//   next();
// });

export const User = model<TUser>("user", userSchemas);
