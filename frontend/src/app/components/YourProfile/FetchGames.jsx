import useGameStore from "../../stores/useGameStore";
import url from "../../../lib/apiUrl";

const FetchGames = async () => {
    const addGames = useGameStore.getState().addGames;
    const setIsLoading = useGameStore.getState().setIsLoading;
    try {
        const res = await fetch(`${url}/game`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

        });
        const data = await res.json();
        addGames(data);
        console.log(data);
    } catch(error) {
        console.log('No data');
        console.log(error);
    }

}

export default FetchGames