import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    try {
      const response = await axios.post("https://creative-86-backend.onrender.com/subscribe", { email }, {withCredentials: true});
      console.log("Success:", response.data);
      setEmail(""); // Clear the input field on success
      alert("Subscription successful!"); // Show success message
    } catch (error) {
      alert(JSON.stringify(error.response?.data?.message || error.message)); // more readable
      setEmail(""); // Clear the input field on success
      console.error("Error subscribing:", error.response?.data?.message || error.message);
    }    
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row justify-center gap-4 items-center">
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 w-full sm:w-[60%] rounded-lg px-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button Title="SUBSCRIBE" className="w-full sm:w-auto" />
    </form>
  );
};

export default EmailInput;
