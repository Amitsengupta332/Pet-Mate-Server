import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.owner), ReviewController.createReview);
router.get("/sitter/:sitterId", ReviewController.getSitterReviews); // Public view

export const ReviewRoutes = router;