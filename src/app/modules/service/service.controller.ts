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

const updateServiceByID = catchasync(async (req: Request, res: Response) => {
  const serviceID = req.params.id;
  const updates = req.body;
  const result = await CarwashServices.updateSingleService(serviceID, updates);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Service updated successfully`,
    data: result,
  });
});

const deleteServiceByIDsoft = catchasync(
  async (req: Request, res: Response) => {
    const serviceID = req.params.id;
    const result = await CarwashServices.deleteServiceSoft(serviceID);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Service deleted successfully`,
      data: result,
    });
  }
);

const createNewSlots = catchasync(async (req: Request, res: Response) => {
  const slotBody = req.body;
  const result = await CarwashServices.createNewSlotsIntoDB(slotBody);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Service deleted successfully`,
    data: result,
  });
});

export const ServiceControllers = {
  createNewService,
  getAllServices,
  getSingleServiceByID,
  updateServiceByID,
  deleteServiceByIDsoft,
  createNewSlots,
};
