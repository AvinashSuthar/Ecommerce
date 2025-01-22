import React from "react";
import { useAppStore } from "../store";
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-3xl text-center mt-4 p-4">My Profile</h1>
      <div className="lg:flex md:block justify-evenly items-center min-h-[60vh] m-3 p-2">
        <div className=" flex justify-center items-center lg:w-[40%] lg:h-[70%] ">
          {userInfo && (
            <div className="flex flex-col justify-evenly items-center">
              <img
                className="rounded-full w-60 h-60 border hover:opacity-50 transition-all duration-300"
                src={userInfo.avatar.url}
              />
              <button
                onClick={() => navigate("/profile/update")}
                className="rounded w-full pt-2 pb-2 m-3 ps-6 pe-6 bg-red-500 text-white justify-center mt-6 hover:bg-red-700 transition-all duration-300"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        {userInfo && (
          <div className="min-w-[40%] min-h-[60%]  ">
            <div className="flex">
              <div className="m-2 ">
                <p className="text-3xl p-2 ">Full Name</p>
                <p className="ps-2 ms-2 text-2xl mb-3  opacity-60 font-serif">
                  {userInfo.name}
                </p>
                <p className="text-3xl p-2">Email</p>
                <p className="ps-2 ms-2 text-2xl mb-3 font-serif  opacity-60">
                  {userInfo.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col  w-full ">
              <button  onClick={()=>navigate("/orders/me")} className="rounded pt-2 pb-2 m-3 ps-6 pe-6 bg-red-500 text-white justify-center mt-6 hover:bg-red-700 transition-all duration-300">
                My Orders
              </button>
              <button onClick={()=> navigate("/password/update")} className="rounded pt-2 pb-2 m-3 ps-6 pe-6 bg-red-500 text-white justify-center mt-6 hover:bg-red-700 transition-all duration-300">
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
