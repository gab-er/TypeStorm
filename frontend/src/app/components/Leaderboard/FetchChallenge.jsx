import url from "@/lib/apiUrl";
import useChallengeStore from "@/app/stores/useChallengeStore";

const FetchChallenge = async (level = 0) => {
  const setLeaderboard = useChallengeStore.getState().setLeaderboard;
  const setLevel = useChallengeStore.getState().setLevel;
  const setIsLoading = useChallengeStore.getState().setIsLoading;
  const setUserData = useChallengeStore.getState().setUserData;
  setIsLoading(true);

  try {
    //try to fetch next or previous 50 games from cursor
    setLevel(level);
    const res = await fetch(`${url}/challenge/${level.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // Set history to fetched data
    const challenge = await res.json();
    setLeaderboard(challenge);

    const res1 = await fetch(`${url}/challenge/user/${level.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const userStatus = await res1.status;

    if (userStatus == 200) {
      const userData = await res1.json();
      setUserData(userData);
    } else {
      setUserData(null);
    }
  } catch (error) {
    // Catch and log any error
    console.log(error);
  } finally {
    // Set loading to false
    setIsLoading(false);
  }
};

export default FetchChallenge;
