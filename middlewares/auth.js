const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const user = require("../model/user");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user.findById(decodedData.id);
  next(); 
});

exports.authorizeRoles = (...roles)=>{
  return (req, res, next)=>{
    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`) , 403);
    }
    next();
  }
}