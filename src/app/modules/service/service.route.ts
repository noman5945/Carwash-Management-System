import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";
import { ServiceControllers } from "./service.controller";
import validateRequest from "../../middleware/validateRequest";
import { ServiceValidators } from "./service.validation";

const serviceRoutes = Router();

serviceRoutes.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidators.serviceValidationSchema),
  ServiceControllers.createNewService
);

export default serviceRoutes;
