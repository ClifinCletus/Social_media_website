import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import axios from "axios";

type inputClick = {
  email: boolean;
  otp: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

function ForgotPassword() {
  //here we have 3 steps: a) enter email,send otp b)otp verification c)reset password
  //hence we are manually tracking the current step , based on that also we  would change the ui and would do the opertions
  const [step, setStep] = useState<number>(1);
  const [inputClicked, setInputClicked] = useState<inputClick>({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleClick = (field: string) => {
    setInputClicked({
      email: field === "email",
      otp: field === "otp",
      newPassword: field === "newPassword",
      confirmPassword: field === "confirmPassword",
    });
  };

  const handleStep1 = async () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        { email },
        { withCredentials: true }
      );
      setLoading(false);
      setStep(2);
      console.log(result.data);
    } catch (error: unknown) {
      setLoading(false);
      // Type guard to check if error is an axios error
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message || "Failed to send OTP");
      } else {
        setError("Failed to send OTP");
      }
      console.log(error);
    }
  };

  const handleStep2 = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        { email, otp },
        { withCredentials: true }
      );
      setLoading(false);
      setStep(3);
      console.log(result.data);
    } catch (error: unknown) {
      setLoading(false);
      // Type guard to check if error is an axios error
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message || "Failed to send OTP");
      } else {
        setError("Failed to send OTP");
      }
      console.log(error);
    }
  };

  const handleStep3 = async () => {
    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // Fixed: Changed endpoint from sendOtp to resetPassword (assuming correct endpoint)
      const result = await axios.post(
        `${serverUrl}/api/auth/resetPassword`,
        { email, password: newPassword },
        { withCredentials: true }
      );
      setLoading(false);
      // Add success handling here (e.g., redirect to login)
      console.log(result.data);
    } catch (error: unknown) {
      setLoading(false);
      // Type guard to check if error is an axios error
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message || "Failed to send OTP");
      } else {
        setError("Failed to send OTP");
      }
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-800 flex flex-col justify-center items-center">
      {step === 1 && (
        <div
          className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl 
      flex justify-center items-center flex-col border-[#1a1f23]"
        >
          <h2 className="text-[30px] font-semibold">Forgot password</h2>
          {/* email input */}

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => handleClick("email")}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.email || email
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Enter email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleClick("email")}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={loading}
            onClick={handleStep1}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold
                        h-[50px] cursor-pointer rounded-2xl mt-[30px] disabled:opacity-50"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}
      {step === 2 && (
        <div
          className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl 
      flex justify-center items-center flex-col border-[#1a1f23]"
        >
          <h2 className="text-[30px] font-semibold">Forgot password</h2>
          {/* otp input */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => handleClick("otp")}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.otp || otp
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Enter OTP received
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onFocus={() => handleClick("otp")}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={loading}
            onClick={handleStep2}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold
                        h-[50px] cursor-pointer rounded-2xl mt-[30px] disabled:opacity-50"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit OTP"}
          </button>
        </div>
      )}

      {step === 3 && (
        <div
          className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl 
      flex justify-center items-center flex-col border-[#1a1f23]"
        >
          <h2 className="text-[30px] font-semibold">Reset password</h2>
          {/* passwords input */}
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => handleClick("newPassword")}
          >
            <label
              htmlFor="newpassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.newPassword || newPassword
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Enter new Password
            </label>
            <input
              type="password"
              id="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => handleClick("newPassword")}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black"
            onClick={() => handleClick("confirmPassword")}
          >
            <label
              htmlFor="confirmpassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-200 ${
                inputClicked.confirmPassword || confirmPassword
                  ? "top-[-20px]"
                  : "top-[50%] translate-y-[-50%]"
              }`}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleClick("confirmPassword")}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={loading}
            onClick={handleStep3}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold
                        h-[50px] cursor-pointer rounded-2xl mt-[30px] disabled:opacity-50"
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
