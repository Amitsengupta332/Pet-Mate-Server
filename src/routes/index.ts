import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { PetRoutes } from "../modules/Pet/pet.route";
import { SitterRoutes } from "../modules/Sitter/sitter.route";

const router = Router();

// router.use("/auth", AuthRoutes);
// router.use("/pet", PetRoutes);

const routerManager = [
    {
        path: "/auth",
        router: AuthRoutes,
    },
    {
        path: "/pet",
        router: PetRoutes,
    },
    {
        path: "/sitter",
        router: SitterRoutes,
    },
]

routerManager.forEach((r) => router.use(r.path, r.router));

export default router;
