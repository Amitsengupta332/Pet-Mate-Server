import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.owner), ReviewController.createReview);
router.patch("/:id", auth(UserRole.owner), ReviewController.updateReview);
router.delete("/:id", auth(UserRole.owner), ReviewController.deleteReview);
router.get("/sitter/:sitterId", ReviewController.getSitterReviews);

export const ReviewRoutes = router;