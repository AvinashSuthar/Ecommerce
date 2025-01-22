const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const jwtToken = require("../utils/jwtToken");
const sendMail = require("../utils/mailer");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

exports.registerUser = catchAsyncError(async (req, res, next) => {
  if (!req.body.avatar) {
    return res.status(400).json({
      success: false,
      message: "Avatar is required",
    });
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "ecom",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  jwtToken(201, user, res);
});

// login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and Password"), 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials"), 401);
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    return next(new ErrorHandler("Invalid Credentials"), 401);
  }
  jwtToken(200, user, res);
});

// logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

// forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  const email = user.email;
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const mail = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification OTP</title>
  </head>
  <body>
      <p>Dear User,</p>
      
      <h1 style="font-size: 2em; margin-bottom: 20px;">${resetPasswordURL}</h1>
     
      <p>If you did not request this URL, please ignore this email. Your account security is important to us.</p>
      <p>Thank you for using our service.</p>
      <p>Best regards,</p>
      <p>ECOMMERCE <br> Avinash Suthar</p>
  </body>
  </html>`;

  try {
    await sendMail(email, "Reset for Email Verification", mail);
    res.status(200).json({
      success: true,
      message: "Email send",
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("user not found", 404));
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  jwtToken(200, user, res);
});

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// updatePassword
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isCorrectPassword = await user.comparePassword(req.body.password);
  if (!isCorrectPassword) {
    return next(new ErrorHandler("Password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("new password and confirm password should be same", 400)
    );
  }
  user.password = req.body.newPassword;
  await user.save();
  jwtToken(200, user, res);
});

//update profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if ( req.body.avatar !== "" ) {
    console.log("hjeer")
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// get all users -- admin route
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// get Single User -- admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not Found", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update user role -- admin route

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// delete a user -- admin route
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
