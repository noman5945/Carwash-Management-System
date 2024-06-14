import { Types } from "mongoose";

export type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};

export type TSlotTimes = {
  startTime: string;
  endTime: string;
};

export type TSlotTimesArray = TSlotTimes[];
