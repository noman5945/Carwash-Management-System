import { Request, Response } from "express";
import catchasync from "../../utils/catchAsync";
import { SlotServices } from "./slot.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllAvailableSlots = catchasync(async (req: Request, res: Response) => {
  const result = await SlotServices.getAllAvailableSlotsfromDB({
    ...req.query,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Available slots retrieved successfully`,
    data: result,
  });
});

const getSingleSlotByID = catchasync(async (req: Request, res: Response) => {
  const result = await SlotServices.getSingleSlotByID(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Slot retrieved successfully`,
    data: result,
  });
});

const updateSlotByID = catchasync(async (req: Request, res: Response) => {
  const result = await SlotServices.updateSlotByID(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Slot updated successfully`,
    data: result,
  });
});

export const SlotControllers = {
  getAllAvailableSlots,
  getSingleSlotByID,
  updateSlotByID,
};
