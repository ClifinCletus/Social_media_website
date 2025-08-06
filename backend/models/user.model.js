import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    followers: [
      //array of the list of all the followers of the user
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //same this schema
      },
    ],
    following: [
      //array of the list of all the followingof the user
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      //posts made by the user
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    saved: [
      //posts saved by the user
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    loops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loop",
      },
    ],
    story: {
      //user can only upload 1 story
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
