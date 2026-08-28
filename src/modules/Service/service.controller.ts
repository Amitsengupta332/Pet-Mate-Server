import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ServiceService } from "./service.service";

const createService = async (req: Request, res: Response) => {
  try {
    const result = await ServiceService.createServiceIntoDB(
      req.body,
      req.user?.id,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Sitter Service Created Successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to create service",
      data: null,
    });
  }
};

const getAllService = async (req: Request, res: Response) => {
  try {
    const result = await ServiceService.getAllServiceIntoDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Services retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to retrieve services",
      data: null,
    });
  }
};

const getSingleService = async (req: Request, res: Response) => {
  try {
    const result = await ServiceService.getSingleServiceIntoDB(
      req.params?.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to retrieve service",
      data: null,
    });
  }
};

export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
};