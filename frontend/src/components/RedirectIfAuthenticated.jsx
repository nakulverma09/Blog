import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/context";

const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useContext(AppContext);

    // If user is already logged in, redirect them to /home
    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children; // Otherwise, allow access to the page
};

export default RedirectIfAuthenticated;
