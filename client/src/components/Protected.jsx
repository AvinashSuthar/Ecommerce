import React from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../store";

const Protected = ({ children }) => {
  const { userInfo } = useAppStore();
  // Wait until loading is complete
  return userInfo ? children : <Navigate to="/login" />;
};

export default Protected;
