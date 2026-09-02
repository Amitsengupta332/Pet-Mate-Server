import express from "express";
import { PetController } from "./pet.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(UserRole.owner), PetController.createPets);
router.get("/", auth(UserRole.owner), PetController.getAllPets);
router.get("/:id", auth(UserRole.owner), PetController.getSinglePets);
router.patch("/:id", auth(UserRole.owner), PetController.updatePet);
router.delete("/:id", auth(UserRole.owner), PetController.deletePet);

export const PetRoutes = router;