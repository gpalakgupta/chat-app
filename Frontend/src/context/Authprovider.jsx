import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  // We only use localStorage for storing the user object
  const initialUserState = localStorage.getItem("messanger");

  const [authuser, setAuthUser] = useState(
    // initialUserState ? JSON.parse(initialUserState) : undefined
    null
  );

  return (
    <AuthContext.Provider value={{ authuser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
