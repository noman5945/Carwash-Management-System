import { Types } from "mongoose";

export type TReview = {
  userID: Types.ObjectId;
  rating: number;
  feedback: string;
};
