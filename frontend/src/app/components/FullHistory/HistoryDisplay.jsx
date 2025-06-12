"use client";
import useGameStore from "@/app/stores/useGameStore"
import GameDisplay from "../YourProfile/GameDisplay"
import PageButton from "./PageButton"
import { useState, useEffect } from "react"

const HistoryDisplay = () => {
  const history = useGameStore((state)=>state.history)
  const [firstEntry,setFirstEntry] = useState(history[0])
  const[lastEntry,setLastEntry] = useState(history[49])
  useEffect(()=>{
    setFirstEntry(history[0]);
    setLastEntry(history[history.length-1])
  },[history])

  return (
    <div className="flex flex-col gap-4 p-4 justify-center">
        <h1 className='text-white-700 text-3xl p-4  h-auto  text-center underline font-bold'>History</h1>
        <GameDisplay games = {history}/>
        <PageButton firstEntry={firstEntry} setFirstEntry={setFirstEntry} lastEntry={lastEntry} setLastEntry={setLastEntry}/>
    </div>
  )}
    

export default HistoryDisplay