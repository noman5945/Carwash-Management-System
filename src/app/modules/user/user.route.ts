import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const userRoute = Router();

userRoute.post(
  "/signup",
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createNewUser
);

export default userRoute;
