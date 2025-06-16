"use client";
import { useEffect } from "react";
import FetchStatistics from "./FetchStatistics";


const StatisticsProvider = ( {children} ) => {
  // Fetches statistics on render
  useEffect( ()=> {
    FetchStatistics();
  }, []);
  return children
};

export default StatisticsProvider;

