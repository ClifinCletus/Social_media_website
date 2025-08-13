import logo from "../assets/logo1.png";
import { FaRegHeart } from "react-icons/fa";
import dp from "../assets/emptyDp.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import OtherUser from "./OtherUser";

const LeftHome = () => {
  const { userData, suggestedUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-black  border-r-2 border-gray-900">
      {/* logo and notification icon */}
      <div
        className="w-full h-[100px] flex items-center
      justify-between p-5"
      >
        <img src={logo} alt="website-logo" className="w-[80px]" />
        {/* notifications icon */}
        <div>
          <FaRegHeart className="text-white w-5 h-5" />
        </div>
      </div>
      {/* profile and user basic */}
      <div className="flex items-center  w-full px-[10px] justify-between gap-2.5 border-b-2 border-b-gray-900 py-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-[70px] h-[70px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
          >
            <img
              src={userData.profileImage || dp}
              alt="user_dp"
              className="w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] text-white font-semibold">
              {userData.userName}
            </div>
            <div className="text-[15px] text-gray-400 font-semibold">
              {userData.name}
            </div>
          </div>
        </div>

        <div
          className="text-blue-500 font-semibold cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </div>
      </div>
      {/* suggested users */}
      <div className="w-full flex flex-col gap-5 p-5">
        <h1 className="text-white text-[20px]">Suggested Users</h1>
        {/* only taking the first 3 users been to suggest */}
        {suggestedUsers &&
          suggestedUsers
            .slice(0, 3)
            .map((user, index) => <OtherUser key={index} user={user} />)}
      </div>
    </div>
  );
};

export default LeftHome;
