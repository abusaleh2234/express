import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewere/auth";
import { User_Role } from "../../types";

const router = Router()

router.post("/", userController.createUser)
router.get("/",auth(User_Role.admin, User_Role.agent), userController.getAllUsers)
router.get("/:id", userController.getSingleUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)

export const userRoute = router