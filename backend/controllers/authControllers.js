const { session } = require("passport");
const jwt = require("jsonwebtoken");
const passport = require("passport"); // Passport ko import karna
const User = require("../models/user.js"); // User model ko import karna
const sendVerificationEmail = require('../utils/mail.js'); // Email utility ko import karna

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.redirect(`${process.env.BASE_URL}/login?verified=fail`);
    }

    if (user.isVerified) {
      return res.redirect(`${process.env.BASE_URL}/login?verified=already`);
    }

    if (user && !user.isVerified) {
      user.isVerified = true;
      await user.save();
      return res.redirect(`${process.env.BASE_URL}/login?verified=true`);
    }

  } catch (err) {
    console.error("Verification error:", err.message);
    return res.redirect(`${process.env.BASE_URL}/login?verified=fail`);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const newUser = new User({ name, username, email });
    const registeredUser = await User.register(newUser, password);

    // ✅ Create a token for email verification
    const emailToken = jwt.sign(
      { id: registeredUser._id },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Save the email token to the user document

    // ✅ Send verification email
    await sendVerificationEmail(email, emailToken);

    // req.login(registeredUser, { session: false }, (err) => {
    //   if (err) return next(err);

    //   const accessToken = jwt.sign({ userId: registeredUser._id }, process.env.ACCESS_SECRET, { expiresIn: "7d" });
    //   const refreshToken = jwt.sign({ userId: registeredUser._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    //   res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "None",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //   });

    res.status(201).json({
      message: "User registered. Please verify your email before logging in.",
      // user: {
      //   _id: registeredUser._id,
      //   name: registeredUser.name,
      //   username: registeredUser.username,
      //   email: registeredUser.email,
      // },
      // accessToken,
      // redirectUrl: "/home",
      // });
    });
  } catch (error) {
    console.log(error)
    console.error("Signup Error backend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ error: info?.message || "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first." });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);

      // Generate Access & Refresh Tokens
      const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET, { expiresIn: "7d" });
      const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

      // Store refresh token in secure HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
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
};


exports.logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout successful!" });
}

