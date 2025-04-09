import React, { useEffect, useState } from "react";
import DesignLayout from "../components/DesignLayout";
import axios from "axios";
import NoPosts from "../components/NoPosts";

const Entertainment = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/entertainment");
        setBlogs(response.data.data); // Make sure your backend sends { data: [...] }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {blogs.length === 0 ? (
        <NoPosts />
      ) : (
        <div>
          <DesignLayout heading={"Entertainment"} blogs={blogs} />
        </div>
      )}
    </>
  );
};

export default Entertainment;
