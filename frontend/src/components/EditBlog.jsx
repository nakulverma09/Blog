import React, { useState, useEffect } from "react";
import axios from "axios";
import { RichTextEditor } from "@mantine/rte";
import { useParams, useNavigate } from "react-router-dom";

// import "@mantine/core/styles.css"; // Uncomment if needed

const EditBlog = () => {
  const { id } = useParams(); // Assuming you're using react-router-dom for routing
  const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState(""); // Separate tag input state

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // or however you store it
    const fetchBlog = async () => {
      if (id) {
        try {
          const res = await axios.get(`https://creative-86-backend.onrender.com/api/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFormData(res.data);
          setTagInput(res.data.tags.join(", ")); // Sync tag input with fetched tags
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      }
    };

    fetchBlog();
  }, [id]);

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
    const input = e.target.value;
    setTagInput(input); // Always update visible input

    const tagsArray = Array.from(
      new Set(
        input
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      )
    ).slice(0, 5);

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

      const response = await axios.put(
        `https://creative-86-backend.onrender.com/api/edit/blog/${id}`,
        blogData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Blog updated successfully!");

      setFormData({
        title: "",
        category: "",
        content: "",
        tags: [],
      });
      setTagInput("");
      navigate(`/blog/${id}`); // Redirect to the blog page after submission
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-auto">
      <div className="w-full max-w-[90vw] bg-white p-6 rounded-lg shadow-lg mt-5">
        <h2 className="text-2xl font-bold mb-4">Edit a Blog Post</h2>
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
            value={tagInput}
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

export default EditBlog;
