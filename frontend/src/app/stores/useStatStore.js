import { create } from "zustand";

const useStatStore = create((set) => ({
  stats: [],
  displayedStat: [],
  gamemode: "STANDARD",
  isLoading: true,

  // Action to add stats
  addStats: (stats) =>
    set(() => ({
      stats: stats,
      displayedStat: stats.filter((stat) => stat.gamemode == "STANDARD"),
      gamemode: "STANDARD",
      isLoading: false,
    })),

  // Action to set gamemode
  setGamemode: (gamemode) =>
    set((state) => ({
      displayedStat: state.stats.filter((stat) => stat.gamemode == gamemode),
      gamemode: gamemode,
    })),

  setIsLoading: (bool) =>
    set(() => ({
      isLoading: bool,
    })),
}));

export default useStatStore;
