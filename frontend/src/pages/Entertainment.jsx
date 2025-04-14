import React, { useEffect, useState } from "react";
import DesignLayout from "../components/DesignLayout";
import axios from "axios";
import NoPosts from "../components/NoPosts";

const Entertainment = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // or however you store it
    const fetchData = async () => {
      try {
        const response = await axios.get("https://creative-86-backend.onrender.com/api/entertainment",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
