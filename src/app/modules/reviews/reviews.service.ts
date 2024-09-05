import AppError from "../../errors/AppError";
import { TReview } from "./reviews.interface";
import { Review } from "./reviews.model";

const createNewReivew = async (reviewData: TReview) => {
  if (reviewData.userID === null) {
    throw new AppError(500, "User ID is null!");
  }
  const result = await Review.create(reviewData);
  return result;
};

const getAllReviews = async (rawQuery: any) => {
  let limit = 10;
  let page = 1;
  for (let key in rawQuery) {
    if (key === "limit") {
      limit = rawQuery[key];
    }
  }
  let skip = (page - 1) * limit;
  const result = await Review.find({})
    .skip(skip)
    .sort({ rate: -1 })
    .limit(limit)
    .populate("user", "-password");

  return result;
};

export const ReviewServices = {
  createNewReivew,
  getAllReviews,
};
