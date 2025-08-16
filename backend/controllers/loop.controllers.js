import Loop from "../models/loop.model.js";
import User from "../models/user.model.js";

export const uploadLoop = async (req, res) => {
  try {
    const { caption } = req.body;
    let media;
    //for uploading the file(image or video)
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Media is required!" });
    }

    //creating the loop
    const loop = await Loop.create({
      caption,
      media,
      author: req.userId,
    });

    //the user model contains loop related etc, so need there, hence adding there
    const user = await User.findById(req.userId);
    user.loops.push(loop._id); //here,adding new values, not editing current values. its an array, so may push to it
    user.save();

    //populating the loop with the author details
    const populatedLoop = await Loop.findById(loop._id).populate(
      "author",
      "name userName profileImage"
    );

    return res.status(201).json(populatedLoop);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: `Error while uploading loop:${error} ` });
  }
};

export const like = async (req, res) => {
  try {
    const loopId = req.params.loopId;
    const loop = await Loop.findById(loopId);

    if (!loop) {
      return res.status(400).json({ message: "loop not found" });
    }

    //check if i have already liked the loop
    const alreadyLiked = loop.likes.some(
      (id) => id.toString() == req.userId.toString()
    );

    //if its already liked, remove the like(means on second tap on the like btn, we are removing the like)
    if (alreadyLiked) {
      //filtering out and hence gets ones without our id on it
      loop.likes = loop.likes.filter(
        (id) => id.toString() !== req.userId.toString()
      );
    } else {
      loop.likes.push(req.user);
    }

    await loop.save();
    loop.populate("author", "name userName profileImage");

    return res.status(200).json(loop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while liking loop:${error} ` });
  }
};

export const comment = async (req, res) => {
  try {
    const { message } = req.body;
    const loopId = req.params.loopId;

    const loop = await Loop.findById(loopId);
    if (!loop) {
      return res.status(400).json({ message: "loop not found" });
    }

    loop.comments.push({
      author: req.userId,
      message,
    });

    await loop.save();

    loop.populate("author", "name userName profileImage");
    loop.populate("comments.author");

    return res.status(200).json(loop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while commenting on loop:${error} ` });
  }
};

export const getAllLoops = async (req, res) => {
  try {
    const loops = await Loop.find({})
      .populate("author", "name userName profileImage")
      .populate("comments.author");

    return res.status(200).json(loops);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while fetching all loops:${error} ` });
  }
};
