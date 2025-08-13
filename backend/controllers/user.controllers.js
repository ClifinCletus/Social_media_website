import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error getting user: ${error}` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId }, //to not include the current user
    }).select("-password"); //get all users
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get suggested user error: ${error}` });
  }
};

//to edit the user profile
export const editProfile = async (req, res) => {
  try {
    const { name, userName, bio, profession, gender } = req.body;
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const sameUserWithUserName = await User.findOne({ userName }).select(
      "-password"
    );

    //checking if the same username is already taken and its not by the current user
    if (sameUserWithUserName && sameUserWithUserName._id !== req.userId) {
      return res.status(400).json({
        message: "User already exists with same username",
      });
    }

    //to upload the image file
    let profileImage;
    //gets the file from the multer(req.file) as the multer is a middleware
    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path);
    }

    user.name = name;
    user.userName = userName;
    user.profileImage = profileImage;
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;

    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `error editing profile ${error}`,
    });
  }
};

//to get the user profile details using the userName in the params

export const getprofile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `error getting user profile: ${error.message}` });
  }
};
