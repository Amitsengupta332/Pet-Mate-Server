import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { PetRoutes } from "../modules/Pet/pet.route";
import { SitterRoutes } from "../modules/Sitter/sitter.route";
import { ServiceRoutes } from "../modules/Service/service.route";
import { BookingRoutes } from "../modules/Booking/booking.route";

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
    {
        path: "/service",
        router: ServiceRoutes,
    },
    {
        path: "/booking",
        router: BookingRoutes,
    },
]

routerManager.forEach((r) => router.use(r.path, r.router));

export default router;
