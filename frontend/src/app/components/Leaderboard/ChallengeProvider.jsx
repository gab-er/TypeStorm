"use client";
import { useEffect } from "react";
import FetchChallenge from "./FetchChallenge";

// This component is used to wrap every page so that every page checks if the user has a cookie and can be logged in automatically

const ChallengeProvider = ({ children }) => {
  // This useEffect hook will run only once on the first mount of every component
  useEffect(() => {
    FetchChallenge();
  }, []);

  return children;
};

export default ChallengeProvider;
