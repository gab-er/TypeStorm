"use client";
import Statistics from "../components/YourProfile/Statistics";
import Profile from "../components/YourProfile/Profile";
import AuthProvider from "../components/Auth/AuthProvider";
import StatisticsProvider from "../components/YourProfile/StatisticProvider";
import GameProvider from "../components/YourProfile/GameProvider";
import RecentGames from "../components/YourProfile/RecentGames";

const YourProfile = () => {
    return (
        <>
            <AuthProvider>
                <StatisticsProvider>
                    <GameProvider>
                        <Profile />
                        <Statistics/>
                        <RecentGames/>
                    </GameProvider>
                </StatisticsProvider>
            </AuthProvider>
        </>
    )
}

export default YourProfile