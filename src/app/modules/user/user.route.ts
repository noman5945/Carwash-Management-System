import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constants";
import { BookingControllers } from "../booking/booking.controller";

const userAuthRoute = Router();
const userRoute = Router();

userAuthRoute.post(
  "/signup",
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createNewUser
);

userAuthRoute.post(
  "/login",
  validateRequest(userValidations.userLoginDataSchema),
  UserControllers.loginUser
);

userRoute.get("/", auth(USER_ROLE.user), BookingControllers.getUserBookings);

export const userAllRoutes = { userAuthRoute, userRoute };
