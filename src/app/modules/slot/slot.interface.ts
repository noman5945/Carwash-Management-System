import { Types } from "mongoose";

export type TSlot = {
  service: string;
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
