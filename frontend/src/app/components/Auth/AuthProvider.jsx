"use client";
import { useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { cookieValidation } from "../../../lib/cookieValidation";

// This component is used to wrap every page so that every page checks if the user has a cookie and can be logged in automatically

const AuthProvider = ({ children }) => {
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const isLoading = useAuthStore((state) => state.isLoading);
  // This useEffect hook will run only once on the first mount of every component
  useEffect(() => {
    cookieValidation();
  }, []);

  return children;
};

export default AuthProvider;
