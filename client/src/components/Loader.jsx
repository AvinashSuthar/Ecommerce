import React from "react";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" }, animationDuration:'600ms' }}
        thickness={2}

        size={200}
      />
    </React.Fragment>
  );
}

const Loader = ({ show}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center transition-all duration-500 ${
        show ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } z-50`}
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      <GradientCircularProgress />
    </div>
  );
};

export default Loader;
