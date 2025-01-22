import React, { useState } from "react";
import Box from "../components/Box";
import OtpInput from "react-otp-input";
import { toast } from "sonner";
import { OTP_ROUTES } from "../utils/constants";
import axios from "axios";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
const OTP = () => {
  const { token, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const email = "avinashsuthar19hmh@gmail.com";
  const [otp, setOtp] = useState("");
  const validateOTP = () => {
    if (otp.length == 0) {
      toast.error("Enter OTP");
      return false;
    }
    if (otp.length < 8) {
      toast.error("Enter full OTP");
      return false;
    }
    return true;
  };
  const handleVerifyOTP = async () => {
    if (validateOTP()) {
      const res = await axios.post(
        OTP_ROUTES,
        { otp },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res);
        setUserInfo(res.data.user);
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <Box>
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl text-center font-semibold">
          Verify your email
        </h1>
        <h3 className="text-sm mb-5 text-center">
          Enter the 8 digit code you have recieved on <br /> {email}
        </h3>
        <h3 className="mb-2">Code</h3>
        <div className="flex justify-evenly mb-7 w-full">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            renderSeparator={<span className="mx-2"></span>}
            renderInput={(props) => (
              <input
                type="number"
                {...props}
                className="h-8 min-w-8 border text-2xl border-gray-500 rounded text-center focus:border-gray-900 focus:border-2 focus:outline-none"
              />
            )}
          />
        </div>
        <button
          className="mt-5 pt-3  pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
          onClick={handleVerifyOTP}
        >
          VERIFY
        </button>
      </div>
    </Box>
  );
};

export default OTP;
