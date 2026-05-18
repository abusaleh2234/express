import type { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
    // console.log("this is protected");

    console.log(req.headers.Authorization);
    
    next()
}

export default auth