import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post("/", auth(UserRole.owner), BookingController.createService);
router.get("/", auth(UserRole.owner, UserRole.sitter), BookingController.getUserBookings);
router.get("/:id", auth(UserRole.owner, UserRole.sitter), BookingController.getSingleBooking);
router.patch("/:id/cancel", auth(UserRole.owner), BookingController.cancelBooking);

export const BookingRoutes = router;