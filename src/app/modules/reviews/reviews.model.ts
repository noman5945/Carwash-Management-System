import { model, Schema } from "mongoose";
import { TReview } from "./reviews.interface";

const ReviewSchema = new Schema<TReview>({
  userID: {
    type: Schema.Types.ObjectId,
    required: [true, "user id required"],
    ref: "user",
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
  },
  feedback: {
    type: String,
    required: [true, "Review massege required"],
  },
});

export const Review = model<TReview>("reviews", ReviewSchema);
