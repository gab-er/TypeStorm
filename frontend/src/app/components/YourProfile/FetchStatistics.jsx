import useStatStore from "../../stores/useStatStore";
import url from "../../../lib/apiUrl";

const FetchStatistics = async () => {
  // Get addStats and setIsLoading from useStatStore
  const addStats = useStatStore.getState().addStats;
  const setIsLoading = useStatStore.getState().setIsLoading;
  setIsLoading(true);
  try {
    // Try to fetch user statistics
    const res = await fetch(`${url}/statistic`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // Add stats to store
    const data = await res.json();
    addStats(data);
  } catch (error) {
    // Catch and log any errors
    console.log(error);
  } finally {
    // Set loading to false
    setIsLoading(false);
  }
};

export default FetchStatistics;
