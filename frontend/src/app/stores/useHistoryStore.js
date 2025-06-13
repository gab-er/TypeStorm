import { create } from "zustand";

const useHistoryStore = create((set) => ({
    history:[],
    isLoading: true,
    page: 1,
    lastPage: 1,

    setIsLoading: (bool) => 
    set(() => ({
      isLoading: bool
    })),

    setHistory: (games) =>
    set(() => ({
      history: games,
    })),

    setPage: (number) =>
      set(() => ({
        page:number
      })),

    setLastPage: (number) =>
      set(() => ({
        lastPage:number
      })),

}));

export default useHistoryStore;