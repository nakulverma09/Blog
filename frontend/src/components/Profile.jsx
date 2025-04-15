import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({ user: null, blogs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("accessToken"); // or however you store it

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `https://creative-86-backend.onrender.com/api/user/profile/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setProfileData({ user: data.user, blogs: data.blogs });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const { user, blogs } = profileData;

  const blogCount = useMemo(() => blogs.length, [blogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl font-semibold">
        User not found.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* User Info */}
      <motion.section
        className="flex flex-col items-center border-b pb-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-blue-700">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-400">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-blue-500 mt-2">
          Total Blogs Posted: {blogCount}
        </p>
      </motion.section>

      {/* Blogs Section */}
      <motion.h2
        className="text-2xl font-semibold mb-4 text-gray-800"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Blogs by {user.name}
      </motion.h2>

      {blogs.length > 0 ? (
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Link
                to={`/blog/${blog._id}`}
                className="block p-4 border rounded-lg hover:shadow-md hover:border-blue-500 transition bg-white"
              >
                <h3 className="text-xl font-bold text-blue-600">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm">{blog.category}</p>
                <p className="text-gray-700 mt-1">
                  {(() => {
                    const plainText = blog.content.replace(/<[^>]+>/g, "");
                    const previewText = plainText
                      .split(" ")
                      .slice(0, 20)
                      .join(" ");
                    return `${previewText}...`;
                  })()}
                </p>

                {blog.tags?.length > 0 && (
                  <div className="text-sm text-gray-500 mt-2">
                    Tags: {blog.tags.join(", ")}
                  </div>
                )}
              </Link>
            </motion.article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No blogs published yet.</p>
      )}
    </motion.div>
  );
};

export default Profile;
