import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/emptyDp.png";
import axios from "axios";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imageInput = useRef(null); //for just hidding or showing thr image Input
  const [frontEndImage, setFrontEndImage] = useState(
    userData?.profileImage || dp
  ); //image which we see on the frontend(the image we input also would be added here)
  const [backEndImage, setBackEndImage] = useState(null); //image to be send to backend for adding there
  const [name, setName] = useState(userData.name || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0]; //for the details of the file
    setBackEndImage(file); //would pass the image to backend
    setFrontEndImage(URL.createObjectURL(file)); //would set that image to urlform andd add it to the frontend image
  };

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("userName", userName);
      formdata.append("bio", bio);
      formdata.append("profession", profession);
      formdata.append("gender", gender);

      if (backEndImage) {
        formdata.append("profileImage", backEndImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/editProfile`,
        formdata,
        { withCredentials: true }
      );

      dispatch(setProfileData(result.data));
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate(`/profile/${userData.userName}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-5">
      {/* back btn */}
      <div className="w-full h-[80px]  gap-5 flex items-center px-5">
        <MdOutlineKeyboardBackspace
          onClick={() => navigate(`/profile/${userData.userName}`)}
          className="cursor-pointer text-white w-[25px] h-[25px]"
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>

      {/* dp profile div */}
      <div
        className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
        onClick={() => imageInput.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          onChange={handleImage}
        />
        <img
          src={frontEndImage}
          alt="user_dp"
          className="w-full object-cover"
        />
      </div>

      {/* editing area */}
      <div
        className="text-blue-500 text-center text-[20px] font-semibold cursor-pointer"
        onClick={() => imageInput.current.click()}
      >
        Change your profile picture
      </div>

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-5 outline-none"
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-5 outline-none"
        placeholder="Enter your userName"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-5 outline-none"
        placeholder="Bio "
        onChange={(e) => setBio(e.target.value)}
        value={bio}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-5 outline-none"
        placeholder="profession"
        onChange={(e) => setProfession(e.target.value)}
        value={profession}
      />

      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-5 outline-none"
        placeholder="Gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />

      <button
        className="px-2.5 w-[60%] max-w-[400px] py-[5px] h-[50px] 
    bg-white cursor-pointer rounded-2xl"
        onClick={handleEditProfile}
      >
        {loading ? <ClipLoader size={30} color="black" /> : "Save profile"}
      </button>
    </div>
  );
};

export default EditProfile;
