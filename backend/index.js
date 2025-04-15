const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes.js")
const subsRoutes = require("./routes/subsRoutes.js")
const blogRoutes = require("./routes/blogRoutes.js")
const tokenRoutes = require("./routes/tokenRoutes.js")
const categoryRoutes = require("./routes/categoryRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const User = require("./models/user.js"); // Assuming you have a User model defined
const Email = require("./models/email.js"); // Assuming you have an Email model defined
const Blog = require("./models/Blog.js")
const Contact = require("./models/contact.js"); // Assuming you have a Contact model defined
const authenticateToken = require("./middlewares/authMiddleware"); // Assuming you have a JWT authentication middleware
const { refreshToken } = require("./controllers/tokenControllers.js");

dotenv.config();
connectDB();

const app = express();
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysecretkey",
  resave: false,
  saveUninitialized: false, // 🔥 Set this to false to prevent empty sessions
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "Lax", // 🔥 Required for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
  },
};


// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://blog-frontend-sa3d.onrender.com", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());  // Enables reading HTTP-only cookies


// Express session middleware
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", authRoutes); // Route to handle auth subscription
app.use("/", subsRoutes); // Route to handle email, contact subscription
app.use("/", tokenRoutes);
app.use("/api", categoryRoutes); //Route to handle category 
app.use("/api", userRoutes); //Route to handle user data
app.use("/api", blogRoutes); //Route to handle Blog crud operation

app.get("/", (req, res) => {
  try {
    res.send("Server is running... 🚀");
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
