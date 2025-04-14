const User = require("../models/user.js")
const Blog = require("../models/Blog.js")

exports.userProfileId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-hash -salt");
    if (!user) return res.status(404).json({ message: "User not found" });

    const blogs = await Blog.find({ user: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ user, blogs });
  } catch (error) {
    console.error("Error in backend:", error);
    res.status(500).json({ message: "Server Error" });
  }
}