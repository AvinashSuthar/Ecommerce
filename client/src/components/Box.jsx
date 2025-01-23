import React from "react";
import { motion } from "framer-motion";

const Box = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        scale: { type: "spring", visualDuration: 0.7, bounce: 0.4 },
      }}
    >
      <div className="flex items-center justify-center mt-[100px] h-[90vh] mb-10">
        <div className="border rounded-xl p-10">{children}</div>
      </div>
    </motion.div>
  );
};
export default Box;
