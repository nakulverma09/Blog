import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blog/${id}`);
        setUser(res?.data?.user?._id);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async (blogId) => {
    console.log("Deleting blog with ID:", blogId);
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/api/blog/${blogId}`);
      alert("Blog deleted successfully!");

      // Redirect to profile page
      navigate(`/user/profile/${user}`); // Adjust based on your schema
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (blogId) => {
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
        <button
          onClick={() => handleEdit(blog._id)}
          className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(blog._id)}
          disabled={isDeleting}
          className={`bg-red-500 text-white px-3 py-1 rounded transition text-sm ${
            isDeleting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {/* Blog Header */}
      <h1 className="text-3xl p-4 font-bold mb-4 text-black bg-gray-200 rounded-md">
        <b><i>{blog.title}</i></b>
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
