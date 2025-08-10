import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//sign up logic
export const signUp = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    if (!name || !email || !password || !userName) {
      return res.status(400).json("User credentials missing");
    }
    const findByEmail = await User.findOne({
      email,
    });

    if (findByEmail) {
      return res.status(400).json({ message: "Email already exist!" });
    }

    const findByUserName = await User.findOne({
      userName,
    });

    if (findByUserName) {
      return res.status(400).json({ message: "Username already exist!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters!" });
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    //token generation(passes the userId) to verify current user

    const token = await genToken(user._id);

    //store the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //converting the cookie storage time(we have given 30  days for the token expiry,same here)
      secure: false, //false for localhost,true in production deployed
      sameSite: "Strict",
    });

    return res.status(201).json({
      email: user.email,
      name: user.name,
      userName: user.userName,
    });
  } catch (error) {
    return res.status(500).json({
      message: `signup error ${error.message}`,
    });
  }
};

//login
export const signIn = async (req, res) => {
  try {
    const { password, userName } = req.body;

    if (!password || !userName) {
      return res.status(400).json("User credentials missing");
    }

    const user = await User.findOne({
      userName,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const token = await genToken(user._id);

    //store the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //converting the cookie storage time(we have given 30  days for the token expiry,same here)
      secure: false, //false for localhost,true in production deployed
      sameSite: "Strict",
    });

    return res.status(200).json({
      email: user.email,
      name: user.name,
      userName: user.userName,
    });
  } catch (error) {
    return res.status(500).json({
      message: `signin error ${error.message}`,
    });
  }
};

//logout
export const signOut = async (req, res) => {
  try {
    //just remove the cookie
    res.clearCookie("token");
    return res.status(200).json({ message: "Signout successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `signout error ${error.message}`,
    });
  }
};
