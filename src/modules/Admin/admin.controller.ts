import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllUsersFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to retrieve users",
      data: null,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.updateUserStatusInDB(
      req.params.id as string,
      req.body.status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to update user status",
      data: null,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllBookingsFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to fetch bookings",
      data: null,
    });
  }
};

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};