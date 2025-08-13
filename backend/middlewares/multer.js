//multer middleware to handle the image/video upload on the cloudinary
//adds the resource to the public etc(known)
import multer from "multer";

//storing our image/video file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //to set the destination to store
    //cb is just a call back which must be on the format(cb(error | null ,destination))
    cb(null, "./public");
  },
  //to set the filename when storing it
  filename: (req, file, cb) => {
    cb(null, file, originalname);
  },
});

export const upload = multer({ storage });
