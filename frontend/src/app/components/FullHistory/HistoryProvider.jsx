"use client";
import { useEffect } from "react";
import FetchHistoryStart from "./FetchHistoryStart";

const HistoryProvider = ({children}) => {
    // fetch 50 most recent games on render
    useEffect(()=>{
        FetchHistoryStart()
    }, [])
    return children
}


export default HistoryProvider