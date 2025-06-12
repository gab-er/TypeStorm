import url from "@/lib/apiUrl"
import useGameStore from "@/app/stores/useGameStore"

const FetchHistory = async (cursorid, isprev=false) => {
    const setHistory = useGameStore.getState().setHistory;
    const setIsLoading = useGameStore.getState().setIsLoading;
    setIsLoading(true);
    try {
        const body = {
            id: cursorid,
        }
        const res = await fetch(`${url}/game/${isprev?"prev":"next"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body)

        });
        const data = await res.json();
        setHistory(data)
        console.log(data);
    } catch(error) {
        console.log('No data');
        console.log(error);
    } finally {
        setIsLoading(false)
    }

}
  


export default FetchHistory