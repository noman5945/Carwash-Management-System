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

export const SlotServices = {
  getAllAvailableSlotsfromDB,
};
