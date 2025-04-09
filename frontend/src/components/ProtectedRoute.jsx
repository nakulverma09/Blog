import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/context";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AppContext);  // Get user state from context

    // If the user is not authenticated, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;  // If authenticated, render the children (the protected route)
};

export default ProtectedRoute;
