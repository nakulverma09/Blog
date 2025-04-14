import React, { useState } from "react";
import axios from "axios";
import { RichTextEditor } from "@mantine/rte";
// import "@mantine/core/styles.css"; // Uncomment if needed

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: [],
  });

  const categories = [
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
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const tagsArray = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .slice(0, 5);
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.title.length < 10 || formData.title.length > 100) {
      alert("Title must be between 10-100 characters.");
      return;
    }
    if (!categories.includes(formData.category)) {
      alert("Invalid category selected.");
      return;
    }

    const plainText = formData.content.replace(/<[^>]+>/g, "");
    if (plainText.length < 300 || plainText.length > 5000) {
      alert("Content must be between 300-5000 characters.");
      return;
    }

    try {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Authentication token is missing. Please log in again.");
        return;
      }

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        return;
      }

      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;
      }

      const blogData = { ...formData, isPublished: true };

      const response = await axios.post(
        "https://creative-86-backend.onrender.com/api/blog",
        blogData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert("Blog posted successfully!");

      setFormData({
        title: "",
        category: "",
        content: "",
        tags: [],
      });
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to post blog. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-auto">
      <div className="w-full max-w-[90vw] bg-white p-6 rounded-lg shadow-lg mt-5">
        <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 border border-gray-300 rounded"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="border border-gray-300 rounded overflow-hidden">
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
              style={{
                minHeight: "24rem",
                maxHeight: "30rem",
                overflowY: "auto",
                padding: "1rem",
              }}
              controls={[
                ["bold", "italic", "underline", "strike"],
                ["h1", "h2", "h3"],
                ["unorderedList", "orderedList"],
                ["blockquote", "codeBlock"],
                ["alignLeft", "alignCenter", "alignRight"],
                ["undo", "redo"],
                ["clean"],
              ]}
            />
          </div>

          <input
            type="text"
            name="tags"
            onChange={handleTagChange}
            placeholder="Tags (comma separated, max 5)"
            className="p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
