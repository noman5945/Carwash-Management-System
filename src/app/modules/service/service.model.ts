import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const ServiceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: [true, "Name of the service is required"],
    },
    description: {
      type: String,
      required: [true, "Description of the service is required"],
    },
    price: {
      type: Number,
      required: [true, "Price of the service is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration of the service is missing"],
    },
    isDeleted: { type: Boolean, default: false },
    img: {
      type: String,
      required: [true, "Image link of the service is required."],
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model<TService>("service", ServiceSchema);
