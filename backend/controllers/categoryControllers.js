const Blog = require("../models/Blog.js");

exports.technology = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Technology" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching technology data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.educationAndLearning = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Education & Learning" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching education and learning data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.lifestyle = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Lifestyle" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching lifestyle data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.finance = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Finance" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching finance data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.entertainment = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Entertainment" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching entertainment data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.newsAndCurrentAffairs = async (req, res) => {
  try {
    const data = await Blog.find({ category: "News & Current Affairs" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching news and current affairs data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.inspirationAndPersonalDevelopment = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Inspiration & Personal Development" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching inspiration and personal development data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.cultureAndHistory = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Culture & History" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching culture and history data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.codingAndProjects = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Coding & Projects" }).populate("user", "username");
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching coding and projects data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.miscellaneous = async (req, res) => {
  try {
    const data = await Blog.find({ category: "Miscellaneous" }).populate("user", "username"); // Populate user details
    res.status(200).json({ message: "Data fetch of technology successfully", data });
  } catch (error) {
    console.error("Error fetching miscelleaneous data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}