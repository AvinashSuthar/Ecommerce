import React, { useRef, useState } from "react";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SIGNUP_ROUTES } from "../utils/constants";
import axios from "axios";
import { useAppStore } from "../store/index";
import { motion } from "framer-motion";

const SignUp = () => {
  const { setUserInfo } = useAppStore(); // Use setToken to store token after signup
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log("here");
    }
  };

  const validateSignup = () => {
    if (!name.length) {
      toast.error("Name is required");
      return false;
    }
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleNameInput = (e) => setName(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);

      try {
        const res = await axios.post(SIGNUP_ROUTES, myForm, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          setUserInfo(res.data.user);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <Box>
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl text-center">Create your account</h1>

        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={handleNameInput}
          className="mb-5 p-2 border rounded w-[400px]"
        />

        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailInput}
          className="p-2 mb-5 border rounded w-[400px]"
        />

        <label htmlFor="password" className="mb-1">
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
            )}
          </button>
        </div>

        <label htmlFor="avatar" className="mb-1">
          Avatar
        </label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={registerDataChange}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          whileDrag={{ scale: 0.9, rotate: 50 }}
        >
          <button
            className="mt-5 pt-3 pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
            onClick={handleFormSubmit}
          >
            CREATE ACCOUNT
          </button>
        </motion.button>

        <button onClick={() => navigate("/login")}>
          Have an Account? <span className="font-semibold"> LOGIN </span>
        </button>
      </div>
    </Box>
  );
};

export default SignUp;
