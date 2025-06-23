
import useGameStore from "@/app/stores/useGameStore";
import { useState } from "react";
import GameDisplay from "./GameDisplay";
import ShowMore from "./ShowMore";
import HistoryLink from "./HistoryLink";

const RecentGames = () => {
    // Get games from gamestore
    const games = useGameStore((state)=>state.games)
    //Create display state which determines how many games are displayed, setting it to 5 by default
    const [display, setDisplay] = useState(5)
    return(
        <>
            <h1 className='text-white-700 text-3xl relative flex mx-auto p-4  h-auto  w-7/10 '>Recent Games</h1>
            {/*Display games up to display amount*/}
            <GameDisplay games ={games.slice(0,display)}/>
            <div className="flex justify-center items-center gap-8 text-center p-4">
                <div className='p-1 w-8'></div>
                {/*Button switches between diplaying 5 and 25 games*/}
                <ShowMore less = {5} more = {25} display = {display} setDisplay={setDisplay}/>
                <HistoryLink/>
            </div>
            <div className="p-2"></div>

        </>
        
    )
}

export default RecentGames