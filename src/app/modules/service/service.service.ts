import { string } from "zod";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TSlot, TSlotTimesArray } from "../slot/slot.interface";
import createSlots from "../slot/slot.utils";
import { Slot } from "../slot/slot.model";

const createNewServiceIntoDB = async (serviceData: TService) => {
  const result = await Service.create(serviceData);
  return result;
};

const getAllServicesfromDB = async () => {
  const result = await Service.find({});
  return result;
};

const getSingleService = async (id: string) => {
  const result = await Service.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const updateSingleService = async (id: string, update: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, update, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found for Update");
  }
  return result;
};

const deleteServiceSoft = async (id: string) => {
  const update = { isDeleted: true };
  const result = await Service.findByIdAndUpdate(id, update, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found for Update");
  }
  return result;
};

const createNewSlotsIntoDB = async (slotNew: TSlot) => {
  const serviceExists = await getSingleService(slotNew.service.toString());
  if (!serviceExists) {
    throw new Error("The Service does not Exist.Check Service list again.");
  }
  const slotTimes: TSlotTimesArray = createSlots(
    slotNew.startTime,
    slotNew.endTime
  );

  const slots: TSlot[] = [];
  slotTimes.forEach((slotTime) => {
    slots.push({
      service: slotNew.service,
      date: slotNew.date,
      startTime: slotTime.startTime,
      endTime: slotTime.endTime,
      isBooked: "available",
    });
  });

  const result = await Slot.insertMany(slots);
  return result;
};

export const CarwashServices = {
  createNewServiceIntoDB,
  getAllServicesfromDB,
  getSingleService,
  updateSingleService,
  deleteServiceSoft,
  createNewSlotsIntoDB,
};
