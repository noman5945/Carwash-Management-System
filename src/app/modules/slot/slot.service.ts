import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const getAllAvailableSlotsfromDB = async (
  ...queries: Record<string, unknown>[]
) => {
  const query = { ...queries }[0];
  if (
    Object.keys(query).length > 0 &&
    Object.keys(query).includes("serviceId")
  ) {
    query.service = query.serviceId;
    delete query.serviceId;
  }

  const result = await Slot.find(query).populate("service");
  return result;
};

const getSingleSlotByID = async (params: any) => {
  let id;
  if (params.slotID) {
    id = params.slotID;
  }
  const res = await Slot.findById(id).populate("service");
  if (!res) {
    throw new AppError(404, "Slot not found");
  }
  return res;
};

const updateSlotByID = async (updateData: any) => {
  let query: any = {};
  let id;
  for (let key in updateData) {
    if (key === "slotID") {
      id = updateData["slotID"];
    } else {
      query[key] = updateData[key];
    }
  }
  const result = await Slot.findByIdAndUpdate(id, query, { new: true });
  return result;
};
export const SlotServices = {
  getAllAvailableSlotsfromDB,
  getSingleSlotByID,
  updateSlotByID,
};
