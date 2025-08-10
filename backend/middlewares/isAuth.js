//to check the current user is signed in (authenticated)
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    //verifies using the token present in the cookie
    const token = req.cookies.token;
    if (!token) {
      res.status(400).json({ message: "Token is not found" });
    }

    const decodedUserId = await jwt.verify(token, process.env.JWT_SECRET);
    //decodes the userId from the token verification and add it to the req for using it for verifying the current user.
    req.userId = decodedUserId.userId;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `auth verification error ${error}` });
  }
};

export default isAuth;
