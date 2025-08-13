import { useSelector } from "react-redux";
import dp from "../assets/emptyDp.png";

//to show the users for the leftside's suggested user and for other pages also
const OtherUser = ({ user }) => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div
      className="w-full h-[80px] flex items-center justify-between border-b-2 
    border-gray-800"
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-[50px] h-[50px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
        >
          <img
            src={user.profileImage || dp}
            alt="user_dp"
            className="w-full object-cover"
          />
        </div>
        <div>
          <div className="text-[18px] text-white font-semibold">
            {user.userName}
          </div>
          <div className="text-[15px] text-gray-400 font-semibold">
            {user.name}
          </div>
        </div>
      </div>
      <button
        className="px-2.5 w-[100px]
       py-1.5 h-[40px] bg-white rounded-2xl"
      >
        Follow
      </button>
    </div>
  );
};

export default OtherUser;
