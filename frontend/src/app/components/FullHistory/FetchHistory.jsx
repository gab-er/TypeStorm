import url from "@/lib/apiUrl"
import useHistoryStore from "@/app/stores/useHistoryStore"

const FetchHistory = async (cursorid, isprev=false) => {
    const setHistory = useHistoryStore.getState().setHistory;
    const setIsLoading = useHistoryStore.getState().setIsLoading;
    const page = useHistoryStore.getState().page;
    const setPage = useHistoryStore.getState().setPage;

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
        setHistory(data);
        (isprev? setPage(page-1):setPage(page+1));
        console.log(data);
    } catch(error) {
        console.log('No data');
        console.log(error);
    } finally {
        setIsLoading(false)
    }

}
  


export default FetchHistory