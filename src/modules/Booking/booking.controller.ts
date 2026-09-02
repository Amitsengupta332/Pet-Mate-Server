import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createService = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.createBookingIntoDB(
      req.body,
      req.user?.id,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking Created Successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const getUserBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getUserBookingsFromDB(
      req.user?.id,
      req.user?.role,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getSingleBookingFromDB(
      req.params.id as string,
      req.user?.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to retrieve booking",
      data: null,
    });
  }
};

const cancelBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.cancelBookingByOwnerInDB(
      req.params.id as string,
      req.user?.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking cancelled successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to cancel booking",
      data: null,
    });
  }
};

// BookingController অবজেক্টে এক্সপোর্ট করুন:
export const BookingController = {
  createService,
  getUserBookings,
  getSingleBooking,
  cancelBooking,
};