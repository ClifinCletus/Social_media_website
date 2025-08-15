import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dp from "../assets/emptyDp.png";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Nav from "../components/Nav";

const Profile = () => {
  const { userName } = useParams(); //username for getting the particular user's profile
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);

  return (
    <div className="w-full min-h-screen bg-black ">
      {/* for the top section with basic things of the page */}
      <div
        className="w-full h-[80px] flex justify-between 
      items-center px-7  text-white"
      >
        {/* back icon */}
        <div onClick={() => navigate("/")}>
          <MdOutlineKeyboardBackspace className="cursor-pointer text-white w-[25px] h-[25px]" />
        </div>
        <div className="font-semibold text-xl">{profileData?.userName}</div>
        {/* logout */}
        <div
          className="font-semibold cursor-pointer text-xl text-blue-500"
          onClick={handleLogout}
        >
          Log Out
        </div>
      </div>
      {/* profile  */}
      <div
        className="w-full h-[150px] flex items-start gap-5 
      lg:gap-12 pt-[20px] px-[10px] justify-center"
      >
        <div
          className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
        >
          <img
            src={profileData?.profileImage || dp}
            alt="user_dp"
            className="w-full object-cover"
          />
        </div>
        {/* profile details */}
        <div className="">
          <div className="font-semibold text-[22px] text-white ">
            {profileData?.name}
          </div>
          <div className="text-[17px] text-gray-200">
            {profileData?.profession || "New User"}
          </div>
          <div className="text-[17px] text-gray-200">{profileData?.bio}</div>
        </div>
      </div>

      {/* followers  etc*/}
      <div
        className="w-full h-[100px] flex items-center justify-center
      gap-[40px] md:gap-[60px] px-[20%] pt-[30px]"
      >
        <div>
          {/* post */}
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.posts?.length}
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </div>
        </div>
        {/* followers */}
        <div>
          <div className="flex items-center justify-center gap-5">
            {/* to just create a image of overlapping dp */}
            <div className="flex relative">
              <div
                className="w-[40px] h-[40px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="user_dp"
                  className="w-full object-cover"
                />
              </div>
              <div
                className="w-[40px] h-[40px] border-2 absolute left-[10px] border-black rounded-full 
        cursor-pointer overflow-hidden"
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="user_dp"
                  className="w-full object-cover"
                />
              </div>
              <div
                className="w-[40px] h-[40px]  absolute left-[20px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="user_dp"
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.followers.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Followers
          </div>
        </div>
        {/* following */}
        <div>
          <div className="flex  items-center justify-center gap-5">
            {/* to just create a image of overlapping dp */}
            <div className="flex relative">
              <div
                className="w-[40px] h-[40px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="user_dp"
                  className="w-full object-cover"
                />
              </div>
              <div
                className="w-[40px] h-[40px] border-2 absolute left-[10px] border-black rounded-full 
        cursor-pointer overflow-hidden"
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="user_dp"
                  className="w-full object-cover"
                />
              </div>
              <div
                className="w-[40px] h-[40px]  absolute left-[20px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="user_dp"
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.following.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>
      {/* edit/view user area */}
      <div className="w-full h-[80px] flex justify-center items-center gap-5 mt-2.5">
        {/* if the profile is of the current user logged in, make editable */}
        {profileData?._id == userData._id && (
          <button
            className="px-2.5 min-w-[150px] py-[5px] h-[40px] 
          bg-white cursor-pointer rounded-2xl"
            onClick={() => navigate("/editProfile")}
          >
            Edit Profile
          </button>
        )}
        {/* if not,do make able to follow and message */}
        {profileData?._id != userData._id && (
          <>
            <button
              className="px-2.5 min-w-[150px] py-[5px] h-[40px] 
          bg-white cursor-pointer rounded-2xl"
            >
              Follow
            </button>
            <button
              className="px-2.5 min-w-[150px] py-[5px] h-[40px] 
          bg-white cursor-pointer rounded-2xl"
            >
              Message
            </button>
          </>
        )}
      </div>

      {/* posts area */}
      <div className="w-full h-[100vh] flex justify-center">
        <div
          className="w-full max-w-[900px] flex flex-col items-center 
        rounded-t-[30px] bg-white relative gap-5 pt-7"
        >
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Profile;
