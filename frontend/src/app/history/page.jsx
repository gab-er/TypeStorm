"use client";
import HistoryDisplay from "../components/FullHistory/HistoryDisplay";
import Loading from "../loading";
import NotLoggedIn from "../components/Error/NotLoggedIn";

//Providers
import HistoryProvider from "../components/FullHistory/HistoryProvider";

//Stores
import useAuthStore from "../stores/useAuthStore";
import useHistoryStore from "../stores/useHistoryStore";


const History = () => {
    const isLoadingAuth = useAuthStore((state)=>state.isLoading)
    const isLoggedIn = useAuthStore((state)=>state.isLoggedIn)
    const isLoadingHistory = useHistoryStore((state)=>state.isLoading)
    return(
        <>
                {isLoadingAuth? <Loading/>:
                !isLoggedIn? <NotLoggedIn/>: 
                    <HistoryProvider>
                        {isLoadingHistory? <Loading/>:
                        <>
                            <HistoryDisplay/>
                        </>}
                    </HistoryProvider>
                }
            
        </>
    )
}

export default History