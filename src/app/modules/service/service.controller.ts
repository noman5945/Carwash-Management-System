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

const getAllServices = catchasync(async (req: Request, res: Response) => {
  const result = await CarwashServices.getAllServicesfromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Services retrieved successfully`,
    data: result,
  });
});

const getSingleServiceByID = catchasync(async (req: Request, res: Response) => {
  const serviceID = req.params.id;
  const result = await CarwashServices.getSingleService(serviceID);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Service retrieved successfully`,
    data: result,
  });
});

export const ServiceControllers = {
  createNewService,
  getAllServices,
  getSingleServiceByID,
};