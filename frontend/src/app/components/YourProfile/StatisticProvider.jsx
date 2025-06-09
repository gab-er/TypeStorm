"use client";
import { useEffect } from "react";
import useStatStore from "../../stores/useStatStore";
import url from "../../../lib/apiUrl";
import FetchStatistics from "./FetchStatistics";


const StatisticsProvider = ( {children} ) => {
  // This useEffect hook will run only once on the first mount of every component
  useEffect( ()=> {
    FetchStatistics();
  });
  return children
};

export default StatisticsProvider;

