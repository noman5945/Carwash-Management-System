import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";
import { BookingControllers } from "./booking.controller";

const bookingRoutes = Router();

bookingRoutes.post("/", auth(USER_ROLE.user), BookingControllers.bookService);

bookingRoutes.get(
  "/",
  auth(USER_ROLE.admin),
  BookingControllers.getAllBookings
);

bookingRoutes.post("/stripe-pay", BookingControllers.stripePayment);

export default bookingRoutes;
