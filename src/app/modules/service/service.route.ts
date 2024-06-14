import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";
import { ServiceControllers } from "./service.controller";
import validateRequest from "../../middleware/validateRequest";
import { ServiceValidators } from "./service.validation";
import { SlotValidators } from "../slot/slot.validation";

const serviceRoutes = Router();

serviceRoutes.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidators.serviceValidationSchema),
  ServiceControllers.createNewService
);

serviceRoutes.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  ServiceControllers.getSingleServiceByID
);

serviceRoutes.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  ServiceControllers.getAllServices
);

serviceRoutes.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidators.updateServiceValidationSchema),
  ServiceControllers.updateServiceByID
);

serviceRoutes.delete(
  "/:id",
  auth(USER_ROLE.admin),
  ServiceControllers.deleteServiceByIDsoft
);

serviceRoutes.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidators.slotValidationSchema),
  ServiceControllers.createNewSlots
);

export default serviceRoutes;
