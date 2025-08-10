import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controllers.js";

//router
const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser); // to get current user details

export default userRouter;
