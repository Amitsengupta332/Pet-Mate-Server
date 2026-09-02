import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ServiceController } from "./service.controller";

const router = express.Router();

router.post("/", auth(UserRole.sitter), ServiceController.createService);
router.get("/", ServiceController.getAllService);
router.get("/:id", ServiceController.getSingleService);
router.patch("/:id", auth(UserRole.sitter), ServiceController.updateService);
router.delete("/:id", auth(UserRole.sitter), ServiceController.deleteService);

export const ServiceRoutes = router;