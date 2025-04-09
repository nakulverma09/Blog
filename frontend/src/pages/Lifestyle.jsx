import React from 'react'
import DesignLayout from '../components/DesignLayout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NoPosts from '../components/NoPosts'

const Lifestyle = () => {
  const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/lifestyle"
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
            <DesignLayout heading={"Lifestyle"} blogs={blogs} />
          </div>
        )}
      </>
    );
}

export default Lifestyle