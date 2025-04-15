const Blog = require("../models/Blog.js");
const mongoose = require("mongoose")

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

exports.blogId = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "username");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.deleteBlogId = async (req, res) => {
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
}

exports.editBlogId = async (req, res) => {
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
}