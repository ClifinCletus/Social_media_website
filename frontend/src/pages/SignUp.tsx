import { useState } from "react";
import logo from "../assets/logo2.png";
import logo1 from "../assets/logo1.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
        console.log(error.response?.data); // will show "Email already exist!" etc.
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  //to manage the handle click and to make the others false hence can be able to properly highlight the current selected only
  //here,just checks if the current field is that, eg:if clicked email, current one passed here is email, so we need the email to be true and others
  // to be false hencecompares as the current fiels is this
  const handleClick = (field: keyof typeof inputClicked) => {
    setInputClicked({
      name: field === "name",
      userName: field === "userName",
      email: field === "email",
      password: field === "password",
    });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-800 flex flex-col justify-center items-center">
      {/* signup card */}
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        {/* left form */}
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign Up to</span>
            <img src={logo} alt="website logo" className="w-[80px]" />
          </div>

          {/* Name input */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[10px] border-2 border-black"
            onClick={() => handleClick("name")}
          >
            <label
              htmlFor="name"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.name
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0 required"
            />
          </div>

          {/* userName Input */}

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[10px] border-2 border-black"
            onClick={() => handleClick("userName")}
          >
            <label
              htmlFor="userName"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.userName
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Enter Your userName
            </label>
            <input
              type="text"
              id="userName"
              onChange={(e) => setuserName(e.target.value)}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0 required"
            />
          </div>

          {/* email input */}

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[10px] border-2 border-black"
            onClick={() => handleClick("email")}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.email
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Enter email
            </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0 required"
            />
          </div>

          {/* password input */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[10px] border-2 border-black"
            onClick={() => handleClick("password")}
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.password
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Enter the Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0 required"
            />
            {/* eye icon to show or hide password */}
            {showPassword ? (
              <IoMdEyeOff
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoMdEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {/* to show the errors from the fetching or from the data given */}
          {error && <p className="text-red-500">{error}</p>}

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold
            h-[50px] cursor-pointer rounded-2xl mt-[30px] "
            onClick={handleSignup}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>
          <p
            className="cursor-pointer text-gray-800"
            onClick={() => navigate("/signin")}
          >
            Already have an Account?
            <span className="text-black border-b-2 border-b-black pb-[3px] hover:text-red-500 ">
              Sign in
            </span>
          </p>
        </div>

        {/* right panel  with website small styles for large devices*/}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={logo1} alt="" className="w-[40px]" />
          <p>Not just a platform, its a VYBE</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
