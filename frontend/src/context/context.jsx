import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // Track active link
  const [user, setUser] = useState(null); // Track logged-in user

  // Handle link click and close mobile menu
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsOpen(false);
  };

  // Simulate user login (you can replace it with actual auth logic)
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        activeLink,
        setActiveLink,
        handleLinkClick,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
