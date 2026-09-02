import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.createUserIntoDB(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);

    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict", // none / strict / lax
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.getMeFromDB(req.user?.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to retrieve profile",
      data: null,
    });
  }
};

const updateMe = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.updateMeIntoDB(req.user?.id, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully",
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

// AuthController অবজেক্টে এক্সপোর্ট করুন:
export const AuthController = {
  createUser,
  loginUser,
  getMe,
  updateMe,
};