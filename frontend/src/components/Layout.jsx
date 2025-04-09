// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />  {/* Ye sirf page content render karega */}
      <Footer />
    </>
  );
};

export default Layout;
