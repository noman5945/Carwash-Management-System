import { Request, Response } from "express";
import catchasync from "../../utils/catchAsync";
import { CarwashServices } from "./service.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createNewService = catchasync(async (req: Request, res: Response) => {
  const result = await CarwashServices.createNewServiceIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Service created successfully`,
    data: result,
  });
});

export const ServiceControllers = {
  createNewService,
};
