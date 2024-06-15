import { Request, RequestHandler, Response } from "express";
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

const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { accesToken, safeUser } = await userServices.userLoginByEmailPass(
      req.body
    );
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `User logged in successfully`,
      token: accesToken,
      data: safeUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: error.message,
      });
    }
  }
};

export const UserControllers = {
  createNewUser,
  loginUser,
};
