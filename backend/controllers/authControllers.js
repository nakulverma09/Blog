const { session } = require("passport");
const jwt = require("jsonwebtoken");
const passport = require("passport"); // Passport ko import karna
const User = require("../models/user.js"); // User model ko import karna

exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const newUser = new User({ name, username, email }); // Password include nahi karna
    const registeredUser = await User.register(newUser, password); // Ye user create karega

    req.login(registeredUser, { session: false }, (err) => {
      if (err) return next(err);

      // Generate Access & Refresh Tokens
      const accessToken = jwt.sign({ userId: registeredUser._id }, process.env.ACCESS_SECRET, { expiresIn: "7d" });
      const refreshToken = jwt.sign({ userId: registeredUser._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

      // Store refresh token securely in an HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, // ✅ important for https
        sameSite: "None", // ✅ important for cross-domain
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: "User registered and logged in successfully",
        user: { _id: registeredUser._id, name: registeredUser.name, username: registeredUser.username, email: registeredUser.email }, // Send only necessary fields
        accessToken: accessToken,
        redirectUrl: "/home"
      });
    });
  } catch (error) {
    console.error("Signup Error backend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
          return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }

      req.login(user, { session: false }, (err) => {  
          if (err) return next(err);

          // Generate Access & Refresh Tokens
          const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET, { expiresIn: "7d" });
          const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

          // Store refresh token securely in an HTTP-only cookie
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, // ✅ important for https
            sameSite: "None", // ✅ important for cross-domain
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });    

          res.status(200).json({
              message: "Login successful!",
              user: {
                  _id: user._id,
                  name: user.name,
                  username: user.username,
                  email: user.email
              },
              accessToken,
              redirectUrl: "/home"
          });
      });
  })(req, res, next);
}

exports.logout = async (req, res) => {
  res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout successful!" });
}