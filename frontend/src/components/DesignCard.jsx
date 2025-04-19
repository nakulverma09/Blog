import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const DesignCard = ({ blog }) => {
  // Convert HTML content to plain text for preview
  const plainText = blog.content.replace(/<[^>]+>/g, "");
  const previewText = plainText.split(" ").slice(0, 20).join(" ");

    // Format the date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full flex flex-col items-start justify-between border-b border-gray-300 py-4 px-2 hover:bg-gray-50 transition duration-200">
      {/* Blog Title */}
      <Link to={`/blog/${blog?._id}`}>
        <h1 className="text-2xl font-semibold text-blue-800 hover:underline mb-2">
          {blog.title}
        </h1>
      </Link>

      {/* Meta Info */}
      <div className="text-sm text-gray-600 mb-2 flex flex-wrap gap-x-2">
        <span>
          <Link
            to={`/user/profile/${blog?.user?._id}`}
            className="hover:text-blue-700"
          >
            {blog?.user?.username}
          </Link>
        </span>
        /
        <span>
          <Link to={`/${blog.category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`} className="hover:text-blue-700">
            {blog.category}
          </Link>
        </span>
        /
        <span>{formattedDate}</span>
        /
        {/* <Link
          to={`/blog/${blog._id}#comments`}
          className="hover:text-blue-700"
        >
          Leave a Comment
        </Link> */}
      </div>

      {/* Blog Preview */}
      <p className="text-gray-800 mb-3">{previewText}...</p>

      {/* Read More Link */}
      <Link
        to={`/blog/${blog._id}`}
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        Read More...
      </Link>
    </div>
  );
};

export default DesignCard;
