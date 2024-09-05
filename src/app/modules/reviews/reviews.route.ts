import { Router } from "express";
import { ReviewControllers } from "./reviews.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const reviewRoutes = Router();

reviewRoutes.get("/", ReviewControllers.getAllReviews);
reviewRoutes.post(
  "/post-review",
  auth(USER_ROLE.admin, USER_ROLE.user),
  ReviewControllers.createNewReview
);
export default reviewRoutes;
