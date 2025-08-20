import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  getStoryByUserName,
  uploadStory,
  viewStory,
} from "../controllers/story.controllers.js";

//router
const storyRouter = express.Router();

storyRouter.get("/upload", isAuth, upload.single("media"), uploadStory); //to upload a single media file
storyRouter.get("/getByUserName", isAuth, getStoryByUserName);
storyRouter.post("/view/:viewId", isAuth, viewStory);

export default storyRouter;
