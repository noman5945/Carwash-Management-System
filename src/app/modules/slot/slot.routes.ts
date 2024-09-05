import { Router } from "express";
import { SlotControllers } from "./slot.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const slotRoutes = Router();

slotRoutes.get("/availability", SlotControllers.getAllAvailableSlots);

slotRoutes.get("/single-slot", SlotControllers.getSingleSlotByID);

slotRoutes.put(
  "/update-slot",
  auth(USER_ROLE.admin),
  SlotControllers.updateSlotByID
);

export default slotRoutes;
