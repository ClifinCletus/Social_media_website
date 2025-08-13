import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/logo1.png";
import StoryDp from "./StoryDp";
import Nav from "./Nav";

const Feed = () => {
  return (
    <div
      className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh]
    relative lg:overflow-y-auto"
    >
      {/* logo and notification icon for small devices */}
      <div
        className="w-full h-[100px] flex items-center
      justify-between p-5 lg:hidden"
      >
        <img src={logo} alt="website-logo" className="w-[80px]" />
        {/* notifications icon */}
        <div>
          <FaRegHeart className="text-white w-5 h-5" />
        </div>
      </div>

      {/* story cards */}
      <div className="flex w-full overflow-auto gap-5 p-5 items-center">
        <StoryDp userName="clifin cletus" />
      </div>

      {/* posts area */}
      <div
        className="w-full min-h-[100vh] flex flex-col items-center gap-5 p-2.5 pt-10
       bg-white rounded-t-[60px] relative pb-[120px]"
      >
        <Nav />
      </div>
    </div>
  );
};

export default Feed;
