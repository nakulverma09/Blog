const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "Technology",
          "Education & Learning",
          "Lifestyle",
          "Finance",
          "Entertainment",
          "News & Current Affairs",
          "Inspiration & Personal Development",
          "Culture & History",
          "Coding & Projects",
          "Miscellaneous",
        ],
        message: "Category must be one of Technology, Education & Learning, Lifestyle, Finance, Entertainment, News & Current Affairs, Inspiration & Personal Development, Culture & History, Coding & Projects, Miscellaneous",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    content: {
      type: String, // Single string for entire blog content
      required: [true, "Content is required"],
      minlength: [300, "Content must be at least 300 characters long"],
      maxlength: [5000, "Content cannot exceed 5000 characters"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "You can add up to 5 tags only",
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
