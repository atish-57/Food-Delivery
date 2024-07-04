import express from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.post("/login" , loginUser)
userRouter.post("/register" , registerUser)

export default userRouter