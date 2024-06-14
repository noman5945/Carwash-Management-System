import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { vehicleTypeEnum } from "./booking.constants";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "service",
      required: [true, "Service ID is required"],
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: "slot",
      required: [true, "Slot ID is required"],
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: vehicleTypeEnum,
    },
    vehicleBrand: {
      type: String,
      required: [true, "Vehicle type is required"],
    },
    vehicleModel: {
      type: String,
      required: [true, "Vehicle Model is required"],
    },
    manufacturingYear: {
      type: Number,
      required: [true, "Manufacturing Year is required"],
    },
    registrationPlate: { type: String, required: [true, "Reg No is required"] },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<TBooking>("booking", bookingSchema);
