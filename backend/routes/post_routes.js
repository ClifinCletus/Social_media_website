import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  comment,
  getAllPosts,
  like,
  saved,
  uploadPost,
} from "../controllers/post.controllers.js";

//router
const postRouter = express.Router();

postRouter.get("/upload", isAuth, upload.single("media"), uploadPost); //to upload a single media file
postRouter.get("/getAll", isAuth, getAllPosts);
postRouter.post("/like/:postId", isAuth, like);
postRouter.get("/comment", isAuth, comment);
postRouter.get("/saved/:postId", isAuth, saved);

export default postRouter;
