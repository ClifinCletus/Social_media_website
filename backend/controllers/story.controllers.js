//for uploading story

import Story from "../models/story.model";
import User from "../models/user.model";
import uploadOnCloudinary from "../utils/cloudinary";

export const uploadStory = async (req, res) => {
  //only able to upload one story, ifadded one more while currently having one uploaded story,
  // then make it auto deleted and then gets new one uploaded

  /**
   * Make this to many story uploadable in future Change
   */
  try {
    const user = await User.findById(req.userid);
    //if story is present, delete
    if (user.story) {
      await Story.findByIdAndDelete(user.story);
      user.story = null;
    }

    const { mediaType } = req.body;

    let media;

    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "media is required!" });
    }

    const story = await Story.create({
      author: req.userId,
      mediaType,
      media,
    });

    user.story = story._id;
    await user.save();

    //just saving the contents of the related details to the db
    const populatedStory = await Story.findById(story._id)
      .populate("author", "name userName profileImage")
      .populate("viewers", "name userName profileImage");

    return re.status(200).json({ success: true, populatedStory });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error uploading the story ${error}`,
    });
  }
};

//to get add our viewership to someone's story
export const viewStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(400).json({ message: "Story not found" });
    }

    //we are doing as when we view someone's story, adding our id to the viewers list of their story.
    const viewersIds = story.viewers.map((id) => id.toString());

    if (!viewersIds.includes(req.userId.toString())) {
      story.viewers.push(req.userId);
      await story.save();
    }

    const populatedStory = await Story.findById(story._id)
      .populate("author", "name userName profileImage")
      .populate("viewers", "name userName profileImage");

    return res.status(200).json(populatedStory);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error viewing the story ${error}`,
    });
  }
};

//to get someone's story
export const getStoryByUserName = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const populatedStory = await Story.find({
      author: user._id, //find the story via the author(ie, get the story of the user)
    }).populate("viewers author");

    return res.status(200).json(populatedStory);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error getting the story of the user by Id ${error}`,
    });
  }
};
