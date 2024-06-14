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

export const BookingControllers = {
  bookService,
};
