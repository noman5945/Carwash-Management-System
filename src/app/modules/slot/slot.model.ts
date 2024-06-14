import { Schema, Types, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: String,
      ref: "service",
    },
    date: {
      type: String,
      required: [true, "Date required"],
    },
    startTime: {
      type: String,
      required: [true, "Starting Time missing"],
    },
    endTime: {
      type: String,
      required: [true, "Ending Time missing"],
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  { timestamps: true }
);

export const Slot = model<TSlot>("slot", slotSchema);
