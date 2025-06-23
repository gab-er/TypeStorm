"use client";
import { useEffect } from "react";
import FetchGames from "./FetchGames";


const GameProvider = ( {children} ) => {
  // Fetches recent games on render
  useEffect( ()=> {
    FetchGames();
  },[]);
  return children
};

export default GameProvider;