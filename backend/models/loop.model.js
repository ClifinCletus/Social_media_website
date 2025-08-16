import mongoose from "mongoose";

const loopSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      //the link of the media stored in cloudinary
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    likes: [
      //who have liked the post
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      //who have liked the post
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Loop = mongoose.model("Loop", loopSchema);

export default Loop;
