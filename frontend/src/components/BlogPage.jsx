import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("user")); // Assuming user is stored as an object
  const localUserId = localUser?._id;

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // or however you store it
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://creative-86-backend.onrender.com/api/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async (blogId) => {
    const token = localStorage.getItem("accessToken"); // or however you store it
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(
        `https://creative-86-backend.onrender.com/api/blog/${blogId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog deleted successfully!");
      navigate(`/user/profile/${localUserId}`);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/blog/${id}`);
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={60} />
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Edit/Delete Buttons */}
      <div className="flex justify-end mb-4 gap-2">
        {localUserId === blog?.user?._id && (
          <>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              disabled={isDeleting}
              className={`px-3 py-1 rounded text-white text-sm transition-colors ${
                isDeleting
                  ? "bg-red-500 opacity-50 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
      </div>

      {/* Blog Header */}
      <h1 className="text-3xl p-4 font-bold mb-4 text-black bg-gray-200 rounded-md">
        <b>
          <i>{blog.title}</i>
        </b>
      </h1>
      <p className="text-sm text-gray-500 italic mb-6">
        Category: <span className="text-blue-500">{blog.category}</span>
      </p>

      {/* Blog HTML Content */}
      <div
        className="prose prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm text-gray-500 mb-1">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BlogPage;
