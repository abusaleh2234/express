import express, { type Application, type Request, type Response } from "express"
// const express = require('express')
import {  pool } from "./db"
import { userRoute } from "./module/user/user.router"
const app: Application = express()

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    //   res.send('Hello World!.........')
    res.status(200).json({
        message: "Express Server",
        author: "Developer Next Level"
    })
})
app.get("/api/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users
        `)
        res.status(200).json({
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
})
app.get("/api/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id);
    try {
        const result = await pool.query(`
        SELECT * FROM users WHERE id = $1    
        `, [id])
        if(result.rows.length === 0){
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
    } catch (error :any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }

})
app.put("/api/users/:id",async (req: Request, res: Response) => {
    const {id} = req.params
    const {name,age,is_active,password} = req.body
    // console.log(id, name, age, email,is_active);
    try {
        const result = await pool.query(`
            UPDATE users SET 
            name=COALESCE($1, name), 
            password=COALESCE($2, password),
            age=COALESCE($3, age),
            is_active=COALESCE($4, is_active) 
            WHERE id=$5 RETURNING *
            `,[name, password, age, is_active,id])
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
    
})
app.use("/api/users",userRoute)
app.delete("/api/users/:id",async (req:Request, res: Response) => {
    const {id} = req.params

    const result = await pool.query(`
        DELETE FROM users
        WHERE id=$1
        `,[id])
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
    } catch (error : any) {
        res.status(500).json({
            status: false,
            message: error.message,
            error: error
        })
    }
})

export default app
