import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader
      .upload(file, { resource_type: "auto" }) //select based on whether image or video
      .then((result) => console.log(result));

    //deleting the file from the public folder(added via multer) after uploading it to cloudinary
    fs.unlinkSync(file);

    return result.secure_url; //can take the secure_url,resource_type etc from this
  } catch (error) {
    fs.unlinkSync(file);
    console.log(error);
  }
};

export default uploadOnCloudinary;
