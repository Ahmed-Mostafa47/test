import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('user');

  const handleLogin = (userData) => {
    console.log("Authentication successful!", userData);
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setUserRole(userData.role || 'user');

    localStorage.setItem("cyberops_user", JSON.stringify(userData));
    localStorage.setItem("userRole", userData.role || 'user');
  };

  const handleRegister = (userData) => {
    console.log("Registration successful!", userData);
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setUserRole(userData.role || 'user');

    localStorage.setItem("cyberops_user", JSON.stringify(userData));
    localStorage.setItem("userRole", userData.role || 'user');
  };

  const handleLogout = () => {
    console.log("Logging out operative...");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserRole('user');

    localStorage.removeItem("cyberops_user");
    localStorage.removeItem("userRole");
  };

  const checkExistingSession = () => {
    const storedUser = localStorage.getItem("cyberops_user");
    const storedRole = localStorage.getItem("userRole");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setCurrentUser(userData);
      setUserRole(storedRole || 'user');
    }
  };

  const hasPermission = (permission) => {
    const permissions = {
      admin: ["create", "read", "update", "delete", "manage_users", "manage_labs"],
      instructor: ["create", "read", "update", "manage_labs"],
      user: ["read"]
    };
    return permissions[userRole]?.includes(permission) || false;
  };

  return {
    isLoggedIn,
    currentUser,
    userRole,
    handleLogin,
    handleRegister,
    handleLogout,
    checkExistingSession,
    hasPermission,
  };
};
