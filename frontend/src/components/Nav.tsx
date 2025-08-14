import { FiPlusSquare, FiSearch } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { RxVideo } from "react-icons/rx";
import dp from "../assets/emptyDp.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  return (
    <div
      className="w-[90%] lg:w-[40%] h-[80px] bg-black flex 
    justify-around items-center fixed bottom-[20px] rounded-full 
    shadow-2xl shadow-black z-100"
    >
      <div>
        <GoHomeFill className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiSearch className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiPlusSquare className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <RxVideo className="text-white w-[25px] h-[28px]" />
      </div>
      {/* profile icon */}
      <div
        className="w-[60px] h-[60px] border-2 border-black rounded-full 
        cursor-pointer overflow-hidden"
        onClick={() => navigate(`/profile/${userData.userName}`)}
      >
        <img src={dp} alt="user_dp" className="w-full object-cover" />
      </div>
    </div>
  );
};

export default Nav;
