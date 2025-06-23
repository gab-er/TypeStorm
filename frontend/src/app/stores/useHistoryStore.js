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

    // action to set history
    setHistory: (games) =>
    set(() => ({
      history: games,
    })),
    //action to set pahe
    setPage: (number) =>
      set(() => ({
        page:number
      })),
    // action to set last page
    setLastPage: (number) =>
      set(() => ({
        lastPage:number
      })),

}));

export default useHistoryStore;