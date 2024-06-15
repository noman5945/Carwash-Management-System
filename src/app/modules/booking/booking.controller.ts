import { Request, Response } from "express";
import catchasync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";

const bookService = catchasync(async (req: Request, res: Response) => {
  const userID = req.user.userId;
  const query = {
    customer: userID,
    ...req.body,
  };
  query.service = query.serviceId;
  query.slot = query.slotId;
  delete query.serviceId;
  delete query.slotId;
  const result = await BookingService.bookServicebyUser(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Booking successful`,
    data: result,
  });
});

const getAllBookings = catchasync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingsfromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All bookings retrieved successfully`,
    data: result,
  });
});

const getUserBookings = catchasync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await BookingService.getUserBookingsfromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User bookings retrieved successfully`,
    data: result,
  });
});

export const BookingControllers = {
  bookService,
  getAllBookings,
  getUserBookings,
};
