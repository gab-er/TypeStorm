"use client";
import HistoryDisplay from "../components/FullHistory/HistoryDisplay";
import PageButton from "../components/FullHistory/PageButton";
import Loading from "../loading";
import NotLoggedIn from "../components/Error/NotLoggedIn";

//Providers
import GameProvider from "../components/YourProfile/GameProvider";

//Stores
import useAuthStore from "../stores/useAuthStore";
import useGameStore from "../stores/useGameStore";


const History = () => {
    const isLoadingAuth = useAuthStore((state)=>state.isLoading)
    const isLoggedIn = useAuthStore((state)=>state.isLoggedIn)
    const isLoadingGame = useGameStore((state)=>state.isLoading)
    return(
        <>
                {isLoadingAuth? <Loading/>:
                !isLoggedIn? <NotLoggedIn/>: 
                    <GameProvider limit = {50} isHistory = {true}>
                        {isLoadingGame? <Loading/>:
                        <>
                            <HistoryDisplay/>
                        </>}
                    </GameProvider>
                }
            
        </>
    )
}

export default History