import { Request, Response } from "express";
import catchasync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createNewUser = catchasync(async (req: Request, res: Response) => {
  const result = await userServices.createNewUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const UserControllers = {
  createNewUser,
};
