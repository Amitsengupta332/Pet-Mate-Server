import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { PetService } from "./pet.service";

const createPets = async (req: Request, res: Response) => {
  try {
    console.log("Controller", req.user);
    const result = await PetService.createPetIntoDB(req.body, req.user?.id );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Pet created successfully!!",
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
export const PetController = {
  // Add controller methods here
  createPets,
};
