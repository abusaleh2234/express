import type { Request, Response } from "express";
import { authService } from "./auth.service";

const authLogin = async (req: Request, res: Response) => {
    try {
        const result = await authService.authLoginIntoDB(req.body)
        console.log(result);
        
        res.status(201).json({
            success: true,
            massage: "User login successfully",
            data: {result}
        })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}

export const authController = {
    authLogin
}