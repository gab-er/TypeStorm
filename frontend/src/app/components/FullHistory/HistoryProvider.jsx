"use client";
import { useEffect } from "react";
import FetchHistoryStart from "./FetchHistoryStart";

const HistoryProvider = ({children}) => {
    useEffect(()=>{
        FetchHistoryStart()
    }, [])
    return children
}


export default HistoryProvider