import Stripe from "stripe";
import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import config from "../../config";

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
const stripePay = async (item: any, successURL: string, failURL: string) => {
  try {
    const lineItem = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.ServiceName, // Use ServiceName as the product name
            metadata: {
              date: item.date, // Custom metadata for the service date
              startTime: item.startTime, // Custom metadata for the start time
              endTime: item.endTime, // Custom metadata for the end time
            },
          },
          unit_amount: Math.round(item.price * 100), // Price in cents
        },
        quantity: 1, // Assuming 1 booking per service
      },
    ];
    const stripe = new Stripe(config.stripe_secret_key as string);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItem,
      mode: "payment",
      success_url: successURL,
      cancel_url: failURL,
    });

    return session.id;
  } catch (error) {
    console.log(error);
    throw new Error("Stripe session creation failed");
  }
};
export const BookingService = {
  bookServicebyUser,
  getAllBookingsfromDB,
  getUserBookingsfromDB,
  stripePay,
};
