import { Router } from "express";
import { SlotControllers } from "./slot.controller";

const slotRoutes = Router();

slotRoutes.get("/availability", SlotControllers.getAllAvailableSlots);

export default slotRoutes;
