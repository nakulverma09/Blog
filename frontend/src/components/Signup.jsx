import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/context";

const Signup = () => {
  const { setUser, login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ LocalStorage se user restore karo
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://creative-86-backend.onrender.com/signup",
        formData,
        { withCredentials: true }
      );

      alert(data.message);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Save user in localStorage
        localStorage.setItem("accessToken", data.accessToken); // Save access token in localStorage

        setUser(data.user); // Set user in context
        login(data.user); // Call login function from context
        alert(data.message);
        navigate(data.redirectUrl); // Navigate to home
      }
    } catch (error) {
      console.error("Signup error frontend:", error);
      setError(error.response?.data?.error || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "username", "email", "password"].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 font-medium capitalize">
                {field}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "password"
                    ? "password"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
