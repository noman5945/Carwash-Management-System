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

const getAllBookingsfromDB = async () => {
  const result = await Booking.find({})
    .populate("customer", "-password -role -createdAt -updatedAt")
    .populate("slot", "-createdAt -updatedAt")
    .populate("service", "-createdAt -updatedAt");

  if (result.length < 1) {
    throw new Error("There are no bookings in the database.");
  }

  return result;
};

const getUserBookingsfromDB = async (userID: string) => {
  const result = await Booking.find({ customer: userID })
    .populate("customer", "-password -role -createdAt -updatedAt")
    .populate("slot", "-createdAt -updatedAt")
    .populate("service", "-createdAt -updatedAt");

  if (result.length < 1) {
    throw new Error("You have not booked anything yet");
  }

  return result;
};

export const BookingService = {
  bookServicebyUser,
  getAllBookingsfromDB,
  getUserBookingsfromDB,
};
