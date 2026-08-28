import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ServiceController } from "./service.controller";

const router = express.Router();

router.post("/", auth(UserRole.sitter), ServiceController.createService);
router.get("/", ServiceController.getAllService); // পাবলিক সার্ভিস লিস্ট
router.get("/:id", auth(UserRole.owner), ServiceController.getSingleService); // শুধু ওনার দেখতে পারবে

export const ServiceRoutes = router;