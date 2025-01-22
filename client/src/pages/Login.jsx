import React, { useState } from "react";
import Box from "../components/Box";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_ROUTES } from "../utils/constants";
import {motion} from "framer-motion"
import { useAppStore } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forGotPassword, setForgotPassword] = useState(false);
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handleFormSubmit = async () => {
    if (validateLogin()) {
      try {
        const res = await axios.post(
          LOGIN_ROUTES,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (res.data.success) {
          setUserInfo(res.data.user);
          navigate("/");
          toast.success("Login Successfull");
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
        toast.error("Invalid Credentials");
      }
    }
  };
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setForgotPassword(false);
    }
  };
  return (
    <Box>
      <div onKeyDown={handleEscape} className="flex flex-col">
        <h1 className="mb-7 text-3xl text-center font-semibold">Login</h1>
        <h3 className="mb-1 text-xl text-center font-medium">
          Welcome back to ECOMMERCE
        </h3>
        <h3 className="mb-5 text-sm text-center">
          The next gen business marketplace
        </h3>
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailInput}
          className="p-2 mb-5 border rounded w-[400px]"
        />
        <label htmlFor="email" className="mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordInput}
            className="p-2 mb-5 border rounded w-[400px]"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-5 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
          >
            {showPassword ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}{" "}
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          whileDrag={{ scale: 0.9, rotate: 50 }}
          
        >
          <button
            className="mt-5 pt-3  pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
            onClick={handleFormSubmit}
          >
            LOGIN
          </button>
        </motion.button>
        <hr className="mt-4 mb-5 font-semibold" />
        <button onClick={() => navigate("/password/forgot")}>
          Forgot Password
        </button>
        <button onClick={() => navigate("/sign-up")}>
          Don't have an Account?{" "}
          <span className="font-semibold"> SIGN UP </span>
        </button>
      </div>
    </Box>
  );
};

export default Login;
