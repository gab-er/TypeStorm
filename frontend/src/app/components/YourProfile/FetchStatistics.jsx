import useStatStore from "../../stores/useStatStore";
import url from "../../../lib/apiUrl";

const FetchStatistics = async () => {
    const addStats = useStatStore.getState().addStats;
    try {
        const res = await fetch(`${url}/statistic`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

        });
        const data = await res.json();
        addStats(data);
    } catch(error) {
        console.log('No data');
        console.log(error);
    }

}

export default FetchStatistics