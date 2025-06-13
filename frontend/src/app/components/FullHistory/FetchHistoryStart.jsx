import url from "@/lib/apiUrl"
import useHistoryStore from "@/app/stores/useHistoryStore"

const FetchHistoryStart = async () => {
    const setHistory = useHistoryStore.getState().setHistory;
    const setPage = useHistoryStore.getState().setPage;
    const setLastPage = useHistoryStore.getState().setLastPage;
    const setIsLoading = useHistoryStore.getState().setIsLoading;
    
    setIsLoading(true);
    try {
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

        const data = await res.json();
        const length = await res1.json();
        setPage(1);
        setLastPage(Math.max(Math.ceil(Number(length/50)),1))
        setHistory(data);
        console.log(data);
        console.log(length)
    } catch(error) {
        console.log('No data');
        console.log(error);
    } finally {
        setIsLoading(false)
    }

}

export default FetchHistoryStart