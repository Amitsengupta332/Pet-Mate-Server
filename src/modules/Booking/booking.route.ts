import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post("/", auth(UserRole.owner), BookingController.createService);
export const BookingRoutes = router;
