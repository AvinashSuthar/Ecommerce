const jwtToken = (statuscode, user, res) => {
  const token = user.getJWTToken();

  // Set cookie options
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // Set expiration time
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    secure: "production", // Set cookie as secure if in production (requires HTTPS)
    sameSite: "None", // Allow cross-site cookies
  };

  // Send response with cookie and user data
  res.status(statuscode)
    .cookie("token", token, options) // Set the cookie
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = jwtToken;
