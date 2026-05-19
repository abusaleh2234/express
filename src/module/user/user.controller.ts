import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"
import sendResponse from "../../utility/sendResponse";

const createUser = async (req: Request, res: Response) => {
    // console.log(req.body);
    // const { name, age, email, password } = req.body
    try {
        const result = await userService.createUserIntoDB(req.body)
        // res.status(201).json()
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User Created successfully!",
            data: result.rows[0],
        })
    } catch (error: any) {
       sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error:error
        })
    }

}
const getAllUsers = async (req: Request, res: Response) => {
    // console.log(req.user);

    try {
        const result = await userService.getAllUsersFromDB()
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User retrived successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}
const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params
    // console.log(id);
    try {
        const result = await userService.getSingleUserFromDB(id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "User retrived successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }

}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    // const {name,age,is_active,password} = req.body
    // console.log(id, name, age, email,is_active);
    try {
        const result = await userService.updateUserFromDB(req.body, id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        res.status(200).json({
            success: true,
            message: "User Updated successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }

}
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await userService.deleteUserFromDB(id as string)
    if (result.rowCount === 0) {
        res.status(404).json({
            success: false,
            message: "User Not Found",
        })
    }
    try {
        res.status(200).json({
            success: true,
            message: "User Deleted successfully",
        })
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            error: error
        })
    }
}
export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}