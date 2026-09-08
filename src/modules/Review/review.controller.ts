import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.createReviewIntoDB(
      req.body,
      req.user?.id
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review submitted successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to submit review",
      data: null,
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.updateReviewIntoDB(
      req.params.id as string,
      req.user?.id,
      req.body
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to update review",
      data: null,
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.deleteReviewFromDB(
      req.params.id as string,
      req.user?.id
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error?.message || "Failed to delete review",
      data: null,
    });
  }
};

const getSitterReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getSitterReviewsFromDB(
      req.params.sitterId as string
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Reviews retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to fetch reviews",
      data: null,
    });
  }
};

export const ReviewController = {
  createReview,
  updateReview,
  deleteReview,
  getSitterReviews,
};