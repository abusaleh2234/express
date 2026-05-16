import express, { type Application, type Request, type Response } from "express"
// const express = require('express')
import {  pool } from "./db"
import { userRoute } from "./module/user/user.router"
import { profileRouter } from "./module/profile/profile.router"
const app: Application = express()

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    //   res.send('Hello World!.........')
    res.status(200).json({
        message: "Express Server",
        author: "Developer Next Level"
    })
})

app.use("/api/users",userRoute)
app.use("/api/profile", profileRouter)


export default app
