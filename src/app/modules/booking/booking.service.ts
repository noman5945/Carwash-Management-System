import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const bookServicebyUser = async (bookingInfo: TBooking) => {
  const serviceExists = await Service.findById(bookingInfo.service);
  const slotExists = await Slot.findById(bookingInfo.slot);
  if (!serviceExists || !slotExists) {
    throw new Error("Service or slot does not exist.");
  }
  if (slotExists.isBooked === "booked" || slotExists.isBooked === "canceled") {
    throw new Error("Slot is not available.");
  }
  const bookResult = await Booking.create(bookingInfo);
  await Slot.findByIdAndUpdate(bookingInfo.slot, { isBooked: "booked" });
  const finalDispalyData = await Booking.findById(bookResult._id)
    .populate("customer", "-password -role -createdAt -updatedAt")
    .populate("slot", "-createdAt -updatedAt")
    .populate("service", "-createdAt -updatedAt");

  return finalDispalyData;
};

export const BookingService = {
  bookServicebyUser,
};
