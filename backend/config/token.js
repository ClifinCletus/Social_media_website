import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    return res.status(500).json(`Error generating token: ${error.message}`);
  }
};

export default genToken;
