"use client";
import useGameStore from "@/app/stores/useGameStore"
import GameDisplay from "../YourProfile/GameDisplay"
import PageButton from "./PageButton"
import { useState, useEffect } from "react"

const HistoryDisplay = () => {
  const history = useGameStore((state)=>state.history)
  const setPage = useGameStore((state) =>state.setPage)
  const firstEntry=history[0]
  const lastEntry = history[history.length-1]
  
  return (
    <div className="flex flex-col gap-4 p-4 justify-center">
        <h1 className='text-white-700 text-3xl p-4  h-auto  text-center underline font-bold'>History</h1>
        <GameDisplay games = {history}/>
        <PageButton firstEntry={firstEntry} lastEntry={lastEntry} />
    </div>
  )}
    

export default HistoryDisplay