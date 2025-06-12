"use client";
//Components
import Statistics from "../components/YourProfile/Statistics";
import Profile from "../components/YourProfile/Profile";
import RecentGames from "../components/YourProfile/RecentGames";
import Loading from "../loading";
import NotLoggedIn from "../components/Error/NotLoggedIn";

//Providers
import AuthProvider from "../components/Auth/AuthProvider";
import StatisticsProvider from "../components/YourProfile/StatisticProvider";
import GameProvider from "../components/YourProfile/GameProvider";

//Stores
import useAuthStore from "../stores/useAuthStore";
import useGameStore from "../stores/useGameStore";
import useStatStore from "../stores/useStatStore";


const YourProfile = () => {
    const isLoadingAuth = useAuthStore((state)=>state.isLoading)
    const isLoggedIn = useAuthStore((state)=>state.isLoggedIn)
    const isLoadingStat = useStatStore((state)=>state.isLoading)
    const isLoadingGame = useGameStore((state)=>state.isLoading)
    return (
        <>
           
                {isLoadingAuth? <Loading/>:
                !isLoggedIn? <NotLoggedIn/>: 
                    <StatisticsProvider>
                        <GameProvider>
                            {isLoadingStat||isLoadingGame? <Loading/>:
                            <>
                                <Profile/>
                                <Statistics/>
                                <RecentGames/>
                            </>}
                        </GameProvider>
                    </StatisticsProvider>
                }
            
        </>
    )
}

export default YourProfile