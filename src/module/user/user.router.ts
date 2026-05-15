import { Router, type Request, type Response } from "express";
import { pool } from "../../db";

const router = Router()

router.post("/api/users", async (req: Request, res: Response) => {
    // console.log(req.body);
    const { name, age, email, password } = req.body
    try {
        const result = await pool.query(
            `
        INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
        RETURNING *
        `, [name, email, password, age],
        )
        res.status(201).json({
            message: "User Created Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }

})

export const userRoute = router