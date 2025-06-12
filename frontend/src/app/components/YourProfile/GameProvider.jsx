"use client";
import { useEffect } from "react";
import FetchGames from "./FetchGames";


const GameProvider = ( {children, limit = 25, isHistory=false} ) => {

  useEffect( ()=> {
    FetchGames(limit,isHistory);
  },[]);
  return children
};

export default GameProvider;