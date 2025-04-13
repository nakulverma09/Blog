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
app.use(cors({ origin: "https://blog-frontend-sa3d.onrender.com", credentials: true }));
app.use(cookieParser());  // Enables reading HTTP-only cookies


// Express session middleware
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", authRoutes); // Route to handle auth subscription
app.use("/", subsRoutes); // Route to handle email subscription
app.use("/", tokenRoutes);
app.use("/", refreshToken); // Route to handle token refresh
app.use("/contact", subsRoutes); // Route to handle contact form submission);
app.use("/blog", blogRoutes); // Route to handle blog creation


app.get("/", (req, res) => {
  try {
    res.send("Server is running... 🚀");
  } catch (error) {
    console.log(error);
  }
});




app.get("/api/technology", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Technology" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/education-and-learning", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Education & Learning" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/lifestyle", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Lifestyle" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/finance", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Finance" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/entertainment", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Entertainment" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/news-and-current-affairs", async (req, res) => {
  try {
    const data = await Blog.find({ category: "News & Current Affairs" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/inspiration-and-personal-development", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Inspiration & Personal Development" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/culture-and-history", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Culture & History" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/coding-and-projects", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Coding & Projects" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/miscellaneous", async (req, res) => {
  try {
    const data = await Blog.find({ category: "Miscellaneous" }).populate("user", "username"); // Populate user details
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.get("/api/user/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-hash -salt");
    if (!user) return res.status(404).json({ message: "User not found" });

    const blogs = await Blog.find({ user: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ user, blogs });
  } catch (error) {
    console.error("Error in backend:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "username");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/api/blog/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/edit/blog/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
