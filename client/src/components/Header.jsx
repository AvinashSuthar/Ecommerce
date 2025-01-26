import React, { useEffect, useRef, useState } from "react";
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

  const [isExpanded, setIsExpanded] = useState(false);

  const [input, setInput] = useState("");

  return (
    <>
      <div className="bg-white sticky top-0 z-50 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  w-[100%] p-2">
        <div className="flex mt-3 justify-between ps-10 pe-10 items-center">
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center space-x-2">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2L3 14h7v8l10-12h-7l3-8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                <span className="text-black">BAZAAR</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
                  BOLT
                </span>
              </h1>
            </div>
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
              <div className="z-20 relative flex items-center transition-all duration-300">
                {/* Expandable Input Container */}
                <div className="relative">
                  {/* Search Icon inside the Input Box */}
                  <div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer"
                    onClick={() => setIsExpanded((prev) => !prev)}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>

                  {/* Expandable Input */}
                  <input
                    type="text"
                    placeholder="Search..."
                    onKeyPress={(e) => {
                      console.log(e.key);
                      if (e.key === "Enter") {
                        navigate(`products/${input}`);
                      }
                    }}
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className={`pl-10 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "w-64 opacity-100"
                        : "w-0 opacity-0 pointer-events-none"
                    }`}
                  />
                </div>
              </div>

              <button
                type="button"
                className="relative items-center rounded-lg "
                onClick={() => navigate("/cart")}
              >
                <i className="cursor-pointer ms-3 fa-solid fa-cart-shopping scale-125" />

                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border border-white rounded-full -top-0 -end-4 dark:border-gray-900">
                  {cart.length}
                </div>
              </button>

              <div className="flex align-top justify-end pe-10 pt-2">
                <ul className="flex text-sm align-top text-left justify-center items-center">
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
                                  onClick={() => navigate("/orders/me")}
                                >
                                  Orders & Returns
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
                          <i className="scale-125 fa-solid fa-user"></i>
                        </button>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
