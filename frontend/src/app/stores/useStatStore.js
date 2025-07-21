import { create } from "zustand";

const useStatStore = create((set) => ({
  stats: [],
  displayedStat: [],
  gamemode: null,
  isLoading: true,

  // Action to add stats
  addStats: (stats) =>
    set(() => ({
      stats: stats,
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
    setIsLoading: (bool) => 
    set(() => ({
      isLoading: bool
    })),
}));

export default useStatStore;
