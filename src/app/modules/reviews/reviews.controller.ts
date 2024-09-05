import { Request, Response } from "express";
import catchasync from "../../utils/catchAsync";
import { ReviewServices } from "./reviews.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TReview } from "./reviews.interface";

const getAllReviews = catchasync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviews(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Review fetched successfully`,
    data: result,
  });
});

const createNewReview = catchasync(async (req: Request, res: Response) => {
  const rawQuery: any = req.body;
  let data: TReview = {
    userID: null as any,
    rating: 0,
    feedback: "",
  };
  for (let key in rawQuery) {
    if (key === "userID") {
      data.userID = rawQuery[key];
    }
    if (key === "rating") {
      data.rating = rawQuery[key];
    }
    if (key === "feedback") {
      data.feedback = rawQuery[key];
    }
  }
  const result = await ReviewServices.createNewReivew(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Review created successfully`,
    data: result,
  });
});

export const ReviewControllers = {
  getAllReviews,
  createNewReview,
};
