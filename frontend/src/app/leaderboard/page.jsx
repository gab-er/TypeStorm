"use client";
import FetchChallenge from "../components/Leaderboard/FetchChallenge";
import { useEffect } from "react";
import useChallengeStore from "../stores/useChallengeStore";
import LeaderboardMenu from "../components/Leaderboard/LeaderboardMenu";
import LeaderboardDisplay from "../components/Leaderboard/LeaderboardDisplay";
import DelayedLoading from "../components/DelayedLoading";
import ChallengeProvider from "../components/Leaderboard/ChallengeProvider";

const Leaderboard = () => {
  const isLoading = useChallengeStore((state) => state.isLoading);
  return (
    <ChallengeProvider>
      {isLoading ? (
        <DelayedLoading />
      ) : (
        <div>
          <LeaderboardMenu />
          <LeaderboardDisplay />
        </div>
      )}
    </ChallengeProvider>
  );
};

export default Leaderboard;
