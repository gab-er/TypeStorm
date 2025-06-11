"use client";
import Statistics from "../components/YourProfile/Statistics";
import Profile from "../components/YourProfile/Profile";
import StatisticsProvider from "../components/YourProfile/StatisticProvider";
import GameProvider from "../components/YourProfile/GameProvider";
import History from "../components/YourProfile/History";

const YourProfile = () => {
    return (
        <>
            <StatisticsProvider>
                <GameProvider>
                    <Profile />
                    <Statistics/>
                    <History/>
                </GameProvider>
            </StatisticsProvider>
        </>
    )
}

export default YourProfile