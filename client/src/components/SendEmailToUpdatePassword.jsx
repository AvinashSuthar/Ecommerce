import React, { useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
import Box from "./Box";
import { toast } from "sonner";
import axios from "axios";
import { FORGOT_PASSWORD_ROUTES } from "../utils/constants";

const SendEmailToUpdatePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleFormSubmit = async () => {
    try {
      const res = await axios.post(FORGOT_PASSWORD_ROUTES, {email}, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Email is sent to your email address");
      }
    } catch (error) {
      toast.error("Invalid Email");
      navigate("/password/forgot");
    }
  };
  return (
    <Box>
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl text-center">Enter your Email</h1>

        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-5 border rounded w-[400px]"
        />

        <button
          className="mt-5 pt-3  pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
          onClick={handleFormSubmit}
        >
          LOGIN
        </button>

        <button onClick={() => navigate("/sign-up")}>
          Don't have an Account?{" "}
          <span className="font-semibold"> SIGN UP </span>
        </button>
      </div>
    </Box>
  );
};

export default SendEmailToUpdatePassword;
