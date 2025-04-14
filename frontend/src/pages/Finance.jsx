import React from 'react'
import DesignLayout from '../components/DesignLayout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NoPosts from '../components/NoPosts'

const Finance = () => {
  const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem("accessToken"); // or however you store it
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://creative-86-backend.onrender.com/api/finance",{
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
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
            <DesignLayout heading={"Finance"} blogs={blogs} />
          </div>
        )}
      </>
    );
}

export default Finance