const mongoose = require("mongoose");
const dummyBlogs = require("./dummyBlogs");
const Blog = require("../models/Blog.js");

mongoose
  .connect(process.env.MONGO_URI,{})
  .then(() => Blog.insertMany(dummyBlogs))
  .then(() => {
    console.log("✅ 50 Dummy Blogs Inserted");
    mongoose.disconnect();
  })
  .catch((err) => console.error("Insert Failed:", err));
