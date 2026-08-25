import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

// All admin endpoints require ADMIN role
router.get("/users", auth(UserRole.admin), AdminController.getAllUsers);
router.patch("/users/:id", auth(UserRole.admin), AdminController.updateUserStatus);
router.get("/bookings", auth(UserRole.admin), AdminController.getAllBookings);

export const AdminRoutes = router;