import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/context";
import Cookies from "js-cookie";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      const res = await axios.get("https://creative-86-backend.onrender.com/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Session expired:", error);
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login");      // Optional: redirect to login or logout user
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await axios.post(
  //       "https://creative-86-backend.onrender.com/logout",
  //       {},
  //       { withCredentials: true }
  //     );
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("user");
  //     Cookies.remove("refreshToken"); // Remove refresh token cookie
  //     setUser(null);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };


  const handleLogout = async () => {  
    try {
      await axios.post("https://creative-86-backend.onrender.com/logout", {}, {
        withCredentials: true, // 👈 VERY IMPORTANT for cookies
      });
  
      // ✅ Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
  
      // ✅ Clear context state if used
      setUser(null);
  
      // ✅ Navigate to login
      navigate("/login");
  
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const menuItems = [
    "Home",
    "Technology",
    "Education & Learning",
    "Lifestyle",
    "Finance",
    "Entertainment",
    "News & Current Affairs",
    "Inspiration & Personal Development",
    "Culture & History",
    "Coding & Projects",
    "Miscellaneous",
  ];

  return (
    <nav className="h-20 w-full flex gap-1 items-center justify-between px-2 md:px-3 lg:px-3 xl:px-3 border-b border-t border-red-600 bg-white relative">
      {/* 🟢 Mobile Menu Button */}
      <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 🟢 Desktop Menu */}
      <div className="hidden lg:flex flex-wrap gap-6 text-sm md:text-sm">
        {menuItems.map((link) => (
          <Link
          key={link}
          to={`/${link.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
          className={`hover:text-blue-700 transition ${
            user ? "text-black" : "text-gray-500"
          }`}
        >
          {link}
        </Link>        
        ))}
      </div>

      {/* 🟢 Auth Buttons (Desktop) */}
      <div className="hidden lg:flex gap-3 md:gap-4 w-[12%] mr-0">
        {console.log("User : ",user)}
        {localStorage.getItem("user") ? (
          <button
            onClick={handleLogout}
            className="px-2 py-2 border-2 border-red-600 rounded-lg bg-red-700 text-white hover:bg-red-800 transition"
          >
            <b className="text-xs">Logout</b>
          </button>
        ) : (
          <>
            <Link
              to="/signup"
              className="px-2 py-2 border h-auto w-auto border-gray-500 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              <b className="text-xs">Sign Up</b>
            </Link>
            <Link
              to="/login"
              className="px-2 py-2 border border-gray-500 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
            >
              <b className="text-xs">Login</b>
            </Link>
          </>
        )}
      </div>

      {/* 🟢 Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* 🔹 Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* 🔹 Menu Container */}
          <div className="fixed top-0 left-0 w-full h-full bg-white shadow-md flex flex-col items-center justify-center gap-6 z-50">
            {/* 🔹 Close Button */}
            <button
              className="absolute top-6 right-6"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* 🔹 Mobile Links */}
            {menuItems.map((link) => (
              <Link
              key={link}
              to={`/${link.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
              className={`hover:text-blue-700 text-lg font-semibold text-black transition ${
                user ? "text-black" : "text-gray-500"
              }`}
            >
              {link}
            </Link>  
            ))}

            {/* 🔹 Auth Buttons (Mobile) */}
            <div className="flex gap-4 mt-4">
              {localStorage.getItem("user") ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-5 py-2 border-2 border-red-600 rounded-lg bg-red-700 text-white hover:bg-red-800 transition"
                >
                  <b>Logout</b>
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-5 py-2 border h-auto w-auto border-gray-500 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <b>Sign Up</b>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-5 py-2 border border-gray-500 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
                  >
                    <b>Login</b>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
