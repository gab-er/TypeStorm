import url from "@/lib/apiUrl"
import useHistoryStore from "@/app/stores/useHistoryStore"

const FetchHistoryStart = async () => {
    // get setHistory, setIsLoadin, page, setPage from historystore
    const setHistory = useHistoryStore.getState().setHistory;
    const setPage = useHistoryStore.getState().setPage;
    const setLastPage = useHistoryStore.getState().setLastPage;
    const setIsLoading = useHistoryStore.getState().setIsLoading;
    
    // Set loading to true
    setIsLoading(true);
    try {
        // Fetch 50 most recent games and total number of games
        const res = await fetch(`${url}/game/?limit=50`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

        });
        const res1 = await fetch(`${url}/game/length`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        // Add 50 games to history
        const data = await res.json();
        setHistory(data);

        // Set page to 1 and set last page according to total amount of games
        const length = await res1.json();
        setPage(1);
        setLastPage(Math.max(Math.ceil(Number(length/50)),1))
    } catch(error) {
        // Catch and log any errors
        console.log(error);
    } finally {
        // Set Loading to false
        setIsLoading(false)
    }

}

export default FetchHistoryStart