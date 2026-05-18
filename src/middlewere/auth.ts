import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";
import type { Roles } from "../types";
const auth = (...roles: Roles[]) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {
            // console.log(roles);
        try {
            // console.log("this is protected");

            // console.log(req.headers.Authorization);
            const token = req.headers.authorization
            if (!token) {
                res.status(401).json({
                    success: false,
                    massage: "Unauthorized access !!",
                })
            }

            const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload
            const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [decoded.email])
            // console.log(userData);
            const user = userData.rows[0]
            if (userData.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    massage: "User Not Found !!",
                })
            }

            if (!user.is_active) {
                res.status(403).json({
                    success: false,
                    massage: "Forbidden !!",
                })
            }
            // console.log("auth role", user.role);

            if(roles.length && !roles.includes(user.role)){
                res.status(401).json({
                    success: false,
                    massage: "Unauthorized !!",
                })
            }
            
            req.user = decoded
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default auth