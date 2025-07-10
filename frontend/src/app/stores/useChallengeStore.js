import { create } from "zustand";

const useChallengeStore = create((set) => ({
  leaderboard: [],
  level: null,
  userData: null,
  isLoading: true,

  //action to add games to store
  setLeaderboard: (games) =>
    set(() => ({
      leaderboard: games,
    })),

  setLevel: (level) =>
    set(() => ({
      level: level,
    })),

  setUserData: (userData) =>
    set(() => ({
      userData: userData,
    })),

  setIsLoading: (bool) =>
    set(() => ({
      isLoading: bool,
    })),
}));

export default useChallengeStore;
