import url from "@/lib/apiUrl"
import useHistoryStore from "@/app/stores/useHistoryStore"

const HandleScroll = async (cursorid, isprev=false) => {
    // get setHistory, setIsLoadin, page, setPage from historystore
    const setHistory = useHistoryStore.getState().setHistory;
    const setIsLoading = useHistoryStore.getState().setIsLoading;
    const page = useHistoryStore.getState().page;
    const setPage = useHistoryStore.getState().setPage;

    // Set loading to true
    setIsLoading(true);
    try {
        //try to fetch next or previous 50 games from cursor
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
        // Set history to fetched data
        const data = await res.json();
        setHistory(data);

        // Increment of decrement page number
        (isprev? setPage(page-1):setPage(page+1));
        console.log(data);
    } catch(error) {
        // Catch and log any error
        console.log(error);
    } finally {
        // Set loading to false
        setIsLoading(false)
    }

}
  


export default HandleScroll