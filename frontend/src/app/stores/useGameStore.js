import { create } from "zustand";

const useGameStore = create((set) => ({
  games: [],
  isLoading: true,

  //action to add games to store
  addGames: (games) =>
    set(() => ({
      games: games,
      isLoading:false
    })),


    setIsLoading: (bool) => 
    set(() => ({
      isLoading: bool
    })),
}));

export default useGameStore;