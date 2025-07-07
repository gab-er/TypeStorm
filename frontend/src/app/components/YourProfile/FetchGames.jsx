import useGameStore from "../../stores/useGameStore";
import url from "../../../lib/apiUrl";

const FetchGames = async () => {
    // Get addGames and setIsLoading functions from useGameStore
    const addGames = useGameStore.getState().addGames;
    const setIsLoading = useGameStore.getState().setIsLoading;
    try {
        // Try to fetch 25 most recent games played
        const res = await fetch(`${url}/game/?limit=25`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

        });
        // Add the games to the store
        const data = await res.json();
        addGames(data);
    } catch(error) {
        // Catch and log any errors
        console.log(error);
    } finally {
        // Set Loading to false
        setIsLoading(false)
    }

}

export default FetchGames