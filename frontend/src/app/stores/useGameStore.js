import { create } from "zustand";

const useGameStore = create((set) => ({
  games: [],
  history:[],
  isLoading: true,
  page: null,


  addGames: (games) =>
    set(() => ({
      games: games,
      isLoading:false
    })),

    setIsLoading: (bool) => 
    set(() => ({
      isLoading: bool
    })),

    setHistory: (games) =>
    set(() => ({
      history: games,
      isLoading:false
    })),

    setPage: (number) =>
      set(() => ({
        page:number
      }))

}));

export default useGameStore;