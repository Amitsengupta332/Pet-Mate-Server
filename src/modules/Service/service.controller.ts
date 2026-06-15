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
      statusCode: 201,
      success: true,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const getAllService = async (req: Request, res: Response) => {
  try {
    const result = await ServiceService.getAllServiceIntoDB(req.user?.id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Sitter retrived Successfully.",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 201,
      success: false,
      message: error?.message || "Something went wrong!!",
      data: null,
    });
  }
};

const getSingleSitter = async (req: Request, res: Response) => {
  try {
    const result = await ServiceService.getSingleServiceIntoDB(
      req.params?.id as string,
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Pets retrived Successfully.",
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

export const ServiceController = {
  // Add controller methods here
  createService,
  getAllService,
  getSingleSitter
};
