import React from "react";
import { motion } from "framer-motion";

const EnterAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};

export default EnterAnimation;
