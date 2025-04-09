import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "./Button";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://creative-86-backend.onrender.com/contact", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      alert("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key, { type: "server", message: error.response.data.errors[key] });
        });
      } else {
        alert(error.response?.data?.message || "Failed to send message.");
      }
    }
  };
  
  return (
    <>
      <div className="w-full min-h-[300px] bg-white flex flex-col justify-center gap-4 items-center p-4 text-center">
        <span className="font-extrabold text-4xl md:text-5xl">Contact</span>
        <p className="max-w-2xl text-gray-700">
          If you’d like to send us some feedback, lorem ipsum dolor sit amet,
          consectetur adipisicing eli sed do.*
        </p>
      </div>
      <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-2/5 flex flex-col gap-5">
            <span className="font-bold text-3xl">Company Information</span>
            <span className="border-b-2 border-black py-2">
              <Link to="#">The Creative80 Room LTD</Link>
            </span>
            <span className="border-b-2 border-black py-2">
              <Link to="#">Registered in England</Link>
            </span>
            <span className="border-b-2 border-black py-2">
              <Link to="#">75 Capthorne Way, Calow, S442LZ, UK</Link>
            </span>
          </div>

          <div className="w-full md:w-3/5 flex flex-col gap-5">
            <h1 className="font-extrabold text-3xl">MESSAGE US</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="h-[40px] px-2 w-full border-2 border-gray-600"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="h-[40px] px-2 w-full border-2 border-gray-600"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="h-[40px] px-2 w-full border-2 border-gray-600"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <textarea
                placeholder="Your Message"
                className="p-2 w-full h-[100px] border-2 border-gray-600"
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message must be at least 10 characters" }
                })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}

              <Button Title="Submit" />
            </form>
          </div>
        </div>
      </div>
      <div className="w-full bg-white flex justify-center items-center py-10 border-t-2 border-gray-600">
        <span className="font-extrabold text-4xl md:text-5xl">Get in Touch</span>
      </div>
    </>
  );
};

export default ContactForm;
