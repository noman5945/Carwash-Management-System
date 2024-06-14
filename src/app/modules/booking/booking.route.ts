import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";
import { BookingControllers } from "./booking.controller";

const bookingRoutes = Router();

bookingRoutes.post("/", auth(USER_ROLE.user), BookingControllers.bookService);

export default bookingRoutes;
