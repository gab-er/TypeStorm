"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/useAuthStore";
import Loading from "../loading";
import url from "@/lib/apiUrl";
import Statistics from "../components/YourProfile/Statistics";
import Profile from "../components/YourProfile/Profile";
import StatisticsProvider from "../components/YourProfile/StatisticProvider";

const YourProfile = () => {
    return (
        <>
            <StatisticsProvider>
                <Profile />
                <Statistics/>
            </StatisticsProvider>
        </>
    )
}

export default YourProfile