import React, { useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGOUT_ROUTE } from "../utils/constants";

const Header = () => {
  const { userInfo, setUserInfo, cart } = useAppStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get(LOGOUT_ROUTE, { withCredentials: true });
    setUserInfo(undefined);
  };

  return (
    <>
      <div className="bg-white h-[100px] w-[100%] p-2">
        <div className="flex align-top justify-end pe-10 pt-2">
          <ul className="flex text-sm align-top text-left justify-center items-center">
            <li className="ps-4">Help</li>
            <li className="ps-4 cursor-pointer" onClick={()=>navigate("/orders/me")}>Orders & Returns</li>
            <li className="ms-3 ps-4 relative">
              <div className="flex items-center">
                {userInfo ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    <img
                      className="rounded-full border bg-contain w-12 h-12 cursor-pointer z-50"
                      src={userInfo.avatar.url}
                      alt="User Avatar"
                    />
                    {open && (
                      <div className="absolute right-0 pt-2 w-48 bg-white border rounded-lg shadow-lg z-40">
                        <ul className="flex flex-col text-left">
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate("/dashboard")}
                          >
                            Dashboard
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate("/profile")}
                          >
                            Profile
                          </li>

                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => navigate("/login")} className="">
                    Login
                  </button>
                )}
              </div>
            </li>
          </ul>
        </div>

        <div className="flex justify-between ps-10 pe-10 items-center">
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            ECOMMERCE
          </h1>
          <div className="flex">
            <ul className="flex">
              <li className="ms-3 me-3 font-medium cursor-pointer">
                Categories
              </li>
              <li className="ms-3 me-3 font-medium cursor-pointer">Sale</li>
              <li className="ms-3 me-3 font-medium cursor-pointer">
                Clearance
              </li>
              <li className="ms-3 me-3 font-medium cursor-pointer">
                New Stock
              </li>
              <li className="ms-3 me-3 font-medium cursor-pointer">Trending</li>
            </ul>
          </div>
          <div className="">
            <div className="flex text-left justify-end">
              <i
                className="cursor-pointer ms-3 me-3 fa-solid fa-magnifying-glass"
                onClick={() => navigate("/search")}
              />
              <i onClick={()=>navigate("/cart")} className="cursor-pointer ms-3 fa-solid fa-cart-shopping" />
              <p>{cart.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
