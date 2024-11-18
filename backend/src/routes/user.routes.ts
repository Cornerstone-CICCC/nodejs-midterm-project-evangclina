import { Router } from "express";
import { checkAuth } from "../middleware/auth";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.get("/", userController.getUsers)
userRouter.post("/register", userController.registerUser)
userRouter.post("/login", userController.loginUser)
userRouter.get("/logout", userController.logoutUser)
userRouter.get("/profile", checkAuth,userController.userProfile)

export default userRouter