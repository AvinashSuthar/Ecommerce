import React, { useRef, useState } from "react";
import Box from "../components/Box";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { RESET_PASSWORD_ROUTES, SIGNUP_ROUTES, UPDATE_PASSWORD_ROUTES } from "../utils/constants";
import axios from "axios";
import { useAppStore } from "../store/index";
const ResetPassword = () => {
  const { setUserInfo } = useAppStore(); // Use setToken to store token after signup
  const {token}  = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateSignup = () => {
    if (!newPassword.length) {
      toast.error("New Password Required");
      return false;
    }
    if (newPassword.length < 8) {
      toast.error("Password should be at least 8 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Confirm Password and New Password should be Same");
      return false;
    }
    return true;
  };

  const handleNewPasswordInput = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      try {
        let route = `${RESET_PASSWORD_ROUTES}/${token}`
        console.log(route)
        const res = await axios.put(
          route,
          {
            password : newPassword,
            confirmPassword,
          },
          { withCredentials: true }
        );
        if (res.data.success) {
          setUserInfo(undefined);
          navigate("/login");
          toast.success("Password Updated");
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
        toast.error("Invalid Password");
      }
    }
  };

  return (
    <Box>
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl text-center">Update Password</h1>

        <label htmlFor="password" className="mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={handleNewPasswordInput}
            className="p-2 mb-5 border rounded w-[400px]"
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute right-2 top-5 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
          >
            {showNewPassword ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>
        <label htmlFor="password" className="mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Enter New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordInput}
            className="p-2 mb-5 border rounded w-[400px]"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-2 top-5 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
          >
            {showConfirmPassword ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </button>
        </div>

        <button
          className="mt-5 pt-3 pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
          onClick={handleFormSubmit}
        >
          UPDATE
        </button>
      </div>
    </Box>
  );
};

export default ResetPassword;
