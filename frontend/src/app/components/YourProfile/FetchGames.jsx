import useGameStore from "../../stores/useGameStore";
import url from "../../../lib/apiUrl";

const FetchGames = async (limit, isHistory) => {
    const addGames = useGameStore.getState().addGames;
    const setIsLoading = useGameStore.getState().setIsLoading;
    const setHistory = useGameStore.getState().setHistory;
    const setPage = useGameStore.getState().setPage;
    try {
        const res = await fetch(`${url}/game/?limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

        });
        const data = await res.json();
        isHistory? setHistory(data) && setPage(1):addGames(data);
        console.log(data);
    } catch(error) {
        console.log('No data');
        console.log(error);
    } finally {
        setIsLoading(false)
    }

}

export default FetchGames