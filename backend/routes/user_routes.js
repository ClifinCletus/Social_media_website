import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  editProfile,
  getCurrentUser,
  getprofile,
  suggestedUsers,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";

//router
const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser); // to get current user details
userRouter.get("/suggested", isAuth, suggestedUsers);
//to edit the profile and upload new profile image
userRouter.post(
  "/editProfile",
  isAuth,
  upload.single("profileImage"), //multer middleware to upload a single image which is of name profileimage (got from frontend)
  editProfile
);
userRouter.get("/getProfile/:userName", isAuth, getprofile);

export default userRouter;
