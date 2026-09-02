import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { SitterService } from "./sitter.service";

const createSitter = async (req: Request, res: Response) => {
  try {
    const result = await SitterService.createSitterIntoDB(req.body, req.user?.id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Sitter profile created successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

const updateSitterProfile = async (req: Request, res: Response) => {
  try {
    const result = await SitterService.updateSitterProfileIntoDB(req.body, req.user?.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sitter profile updated successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to update profile",
      data: null,
    });
  }
};

const getAllSitters = async (req: Request, res: Response) => {
  try {
    const result = await SitterService.getAllSittersFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sitters retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to retrieve sitters",
      data: null,
    });
  }
};

const getSingleSitter = async (req: Request, res: Response) => {
  try {
    const result = await SitterService.getSingleSitterFromDB(req.params.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sitter details retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: error?.message || "Sitter not found",
      data: null,
    });
  }
};

const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const result = await SitterService.updateBookingStatusIntoDB(
      req.body.status,
      req.params.id as string
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking status updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to update booking status",
      data: null,
    });
  }
};

export const SitterController = {
  createSitter,
  updateSitterProfile,
  getAllSitters,
  getSingleSitter,
  updateBookingStatus,
};