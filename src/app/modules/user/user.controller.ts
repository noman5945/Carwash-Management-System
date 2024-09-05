import { Request, RequestHandler, Response } from "express";
import catchasync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TUserTokenData } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

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

const updateUserRole = catchasync(async (req: Request, res: Response) => {
  const userData: TUserTokenData = req.body;
  const result = await userServices.updateUserRole(
    userData.role,
    userData.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});

const updateUserInfo = catchasync(async (req: Request, res: Response) => {
  const incomingData: any = req.body;
  let id;
  let updatedData: any = {};
  for (let key in incomingData) {
    if (key === "userID") {
      id = incomingData[key];
    }
    if (key === "password") {
      updatedData.password = await bcrypt.hash(
        incomingData[key],
        Number(config.bcrypt_salt_rounds)
      );
    } else {
      updatedData[key] = incomingData[key];
    }
  }
  const result = await userServices.updateUserInfo(updatedData, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const getAllUsers = catchasync(async (req: Request, res: Response) => {
  const allUserData = await userServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: allUserData,
  });
});

const getUserByID = catchasync(async (req: Request, res: Response) => {
  const { userID } = req.query;
  const user = await userServices.getUserByID(userID as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: user,
  });
});

export const UserControllers = {
  createNewUser,
  loginUser,
  updateUserRole,
  getAllUsers,
  getUserByID,
  updateUserInfo,
};
