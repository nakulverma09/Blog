const User = require("../models/User"); // User model ko import karna

exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const newUser = new User({ name, username, email }); // Password include nahi karna
    const registeredUser = await User.register(newUser, password); // Ye user create karega

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      res.status(201).json({
        message: "User registered and logged in successfully",
        user: { _id: registeredUser._id, name: registeredUser.name, username: registeredUser.username, email: registeredUser.email }, // Send only necessary fields
        redirectUrl: "/home"
      });
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }}