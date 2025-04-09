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
const User = require("./models/user.js"); // Assuming you have a User model defined
const Email = require("./models/email.js"); // Assuming you have an Email model defined
const Blog = require("./models/Blog.js")
const Contact = require("./models/contact.js"); // Assuming you have a Contact model defined
const authenticateToken = require("./middlewares/authMiddleware"); // Assuming you have a JWT authentication middleware

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

app.get("/", (req, res) => {
  try {
    res.send("Server is running... 🚀");
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", async (req, res, next) => {
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
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
          return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }

      req.login(user, { session: false }, (err) => {  
          if (err) return next(err);

          // Generate Access & Refresh Tokens
          const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
          const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

          // Store refresh token securely in an HTTP-only cookie
          res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",  // Use HTTPS in production
              sameSite: "Strict",
              maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
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
});



app.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout successful!" });
});

// Route to handle email subscription
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is already subscribed
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    // Save new email
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/verify-token", authenticateToken ,(req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid or expired token" });

      res.json({ user: decoded });
  });
});

app.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Check if all fields are present
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save data correctly
    const newContact = new Contact({ firstName, lastName, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

app.post("/blog", authenticateToken, async (req, res) => {
  // console.log("Authenticated user:", req.user.userId); // Debugging
  try {
    const { title, category, content, tags } = req.body;
    console.log("Authenticated user:", req.user); // Debugging
    const userId = req.user.userId; // Ensure correct case
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    // Check if all fields are present
    if (!title || !category || !content || !tags ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save blog post to the database with isPublished set to true
    const newBlogPost = new Blog({
      title,
      category,
      content,
      tags,
      user: userId, // Associate blog with authenticated user
      isPublished: true, // Automatically publish the blog
    });

    await newBlogPost.save();

    res.status(201).json({ message: "Blog post created successfully!", blog: newBlogPost });
  } catch (error) {
    console.error("Error creating blog post from backend:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
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
