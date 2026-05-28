import { Request, Response } from "express";
import { AuthService } from "./auth.service";
 

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await  AuthService.createUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result
        })

        
    } catch (error) {
        console.log(error);
    }
};
const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await  AuthService.loginUserIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result
        })

        
    } catch (error) {
        console.log(error);
    }
};

export const AuthController = {
  createUser,
  loginUser
};
