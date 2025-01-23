import React, { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

const Count = ({ end, time }) => {
  const [key, setKey] = useState(0); // State to force re-render

  useEffect(() => {
    setKey((prev) => prev + 1); // Increment key on reload
  }, []); // Empty dependency to run only once on component mount

  function HTMLContent() {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (value) => Math.round(value)); // Correct usage of `useTransform`

    useEffect(() => {
      const controls = animate(count, end, { duration: time });
      return () => controls.stop();
    }, [count, end, time]); // Add dependencies to re-run animation when props change

    return <motion.pre>{rounded}</motion.pre>;
  }

  return <div key={key}>{HTMLContent()}</div>; // Use key to re-render the component
};

export default Count;
