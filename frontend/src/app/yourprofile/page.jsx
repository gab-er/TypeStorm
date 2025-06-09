"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/useAuthStore";
import Loading from "../loading";
import url from "@/lib/apiUrl";
import Statistics from "../components/YourProfile/Statistics";
const YourProfile = () => {
    return (
        <>
            <Statistics/>
        </>
    )
}

export default YourProfile