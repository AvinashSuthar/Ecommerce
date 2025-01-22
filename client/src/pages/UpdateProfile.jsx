import React, { useState } from "react";
import { useAppStore } from "../store";
import Box from "../components/Box";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_ROUTES } from "../utils/constants";
import axios from "axios";

const UpdateProfile = () => {
        const { userInfo, setUserInfo } = useAppStore(); // Use setToken to store token after signup
  const navigate = useNavigate();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [avatar, setAvatar] = useState("");


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
    return true;
  };

  const handleNameInput = (e) => setName(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);

      try {
        const res = await axios.put(UPDATE_PROFILE_ROUTES, myForm, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          setUserInfo(res.data.user);
          toast.success("Profile Updated Successfully!");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("Profile Update Failed. Please try again.");
      }
    }
  };

  return (
    <Box>
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl text-center">Update Profile</h1>

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

        <label htmlFor="avatar" className="mb-1">
          Avatar
        </label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={registerDataChange}
        />

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

export default UpdateProfile;
