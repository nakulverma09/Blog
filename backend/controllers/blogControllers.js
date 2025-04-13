const Blog = require("../models/Blog.js");

exports.blog = async (req, res) => {
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
}