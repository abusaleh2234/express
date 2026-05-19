import type { Request, Response } from "express";
import { authService } from "./auth.service";

const authLogin = async (req: Request, res: Response) => {
    try {
        const result = await authService.authLoginIntoDB(req.body)
        // console.log(result);
        const {refreshToken} = result
        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        })
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
const refreshToken = async (req: Request, res: Response) => {
    try {
        const result = await authService.generateRefreshToken(req.cookies.refreshToken)
        // console.log(result);
        res.status(201).json({
            success: true,
            massage: "Access Token Generated",
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
    authLogin,
    refreshToken
}