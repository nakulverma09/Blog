import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/context";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setUser, login} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post("https://creative-86-backend.onrender.com/refresh-token", {}, { withCredentials: true });
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data.accessToken;
    } catch (err) {
      console.error("Refresh failed");
      return null;
    }
  };
  
  useEffect(() => {
    const verified = searchParams.get("verified");
  
    if (verified === "true") {
      alert("✅ Email verified! You can now login.");
    } else if (verified === "fail") {
      alert("❌ Verification failed or link expired.");
    } else if (verified === "already") {
      alert("ℹ️ Email already verified.");
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");
  
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      refreshAccessToken(); // ✅ if token missing, try to refresh using cookie
    }
  }, []);
  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const { data } = await axios.post(
      "https://creative-86-backend.onrender.com/login",
      formData,
      { withCredentials: true }
    );

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Save user too
    setUser(data.user);
    navigate("/home");
  } catch (error) {
    console.error("Login error:", error);
    setError("Invalid credentials");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "password"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className={`w-full text-white py-3 rounded-lg font-semibold transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
