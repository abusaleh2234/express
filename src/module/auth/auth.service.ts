import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import config from "../../config";

const authLoginIntoDB = async (payLoad: {email: string, password: string}) => {

    // console.log(payLoad);

    const {email, password} = payLoad
    // check if the user exist
    // compare the password
    // generate token

    const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
        `,[email])
    // console.log(userData,"user data");
    if(userData.rows.length === 0){
        throw new Error("Invalid Credentials not user")
    }

    const user = userData.rows[0]

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials ! don't match pass")
    }
    // generate token

    const jwtPayLoad = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayLoad,config.secret as string, {expiresIn: "1d"})
    return {accessToken}
}

export const authService = {
    authLoginIntoDB
}