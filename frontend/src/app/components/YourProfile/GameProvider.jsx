"use client";
import { useEffect } from "react";
import FetchGames from "./FetchGames";


const GameProvider = ( {children} ) => {

  useEffect( ()=> {
    FetchGames();
  },[]);
  return children
};

export default GameProvider;