"use client";
import useTipStore from "@/app/stores/useTipStore"
import { useEffect } from "react";

const TypingTip = ({isCylcing}) => {
    const displayTip = useTipStore((state) => state.displayTip)
    const initialize = useTipStore((state) =>state.initialize)
    const cycleTip = useTipStore((state) =>state.cycleTip)
    useEffect(()=>{
        initialize()
    },[])
    if (isCylcing) {
        useEffect(()=>{
            setInterval(()=>cycleTip(),30000)
    },[])}

    return (
        <div className="flex flex-col w-3/10 border text-center text-xl">
            <div> Tip: </div>
            <div> {displayTip}</div>
        </div>

    )}
    


export default TypingTip