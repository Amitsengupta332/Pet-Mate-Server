import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { SitterController } from "./sitter.controller";

const router = express.Router();

// Public Routes
router.get("/", SitterController.getAllSitters);
router.get("/:id", SitterController.getSingleSitter);

// Sitter Protected Routes
router.post("/", auth(UserRole.sitter), SitterController.createSitter);
router.put("/profile", auth(UserRole.sitter), SitterController.updateSitterProfile);
router.patch("/booking/:id", auth(UserRole.sitter), SitterController.updateBookingStatus);

export const SitterRoutes = router;