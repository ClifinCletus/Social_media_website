import uploadOnCloudinary from "../utils/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption, mediaType } = req.body;
    let media;
    //for uploading the file(image or video)
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Media is required!" });
    }

    //creating the post
    const post = await Post.create({
      caption,
      media,
      mediaType,
      author: req.userId,
    });

    //the user model contains posts related etc, so need there, hence adding there
    const user = await User.findById(req.userId);
    user.posts.push(post._id); //here,adding new values, not editing current values. its an array, so may push to it
    user.save();

    //populating the post with the author details
    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name userName profileImage"
    );

    return res.status(201).json(populatedPost);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: `Error while uploading post:${error} ` });
  }
};

//to get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate(
      "author",
      "name userName profileImage"
    );

    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while fetching posts:${error} ` });
  }
};

//which ever posts we have liked, it would find the post and push our name(id) to that post
export const like = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "post not found" });
    }

    //check if i have already liked the post
    const alreadyLiked = post.likes.some(
      (id) => id.toString() == req.userId.toString()
    );

    //if its already liked, remove the like(means on second tap on the like btn, we are removing the like)
    if (alreadyLiked) {
      //filtering out and hence gets ones without our id on it
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.userId.toString()
      );
    } else {
      post.likes.push(req.user);
    }

    await post.save();
    post.populate("author", "name userName profileImage");

    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while liking posts:${error} ` });
  }
};

export const comment = async (req, res) => {
  try {
    const { message } = req.body;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "post not found" });
    }

    post.comments.push({
      author: req.userId,
      message,
    });

    await post.save();

    post.populate("author", "name userName profileImage");
    post.populate("comments.author");

    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while commenting on post:${error} ` });
  }
};

//saving(benchmark etc)
export const saved = async (req, res) => {
  try {
    const postId = req.params.postId;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    //check if i have already saved the post
    const alreadySaved = user.saved.some(
      (id) => id.toString() == postId.toString()
    );

    //if its already Saved
    if (alreadySaved) {
      //filtering out and hence gets ones without our id on it
      user.saved = user.saved.filter(
        (id) => id.toString() !== postId.toString()
      );
    } else {
      user.saved.push(postId);
    }

    await user.save();
    user.populate("saved");

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while saving posts:${error} ` });
  }
};
