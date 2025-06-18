import { create } from "zustand";
const DEFAULT_TIME = 5;

const useTimedStore = create((set, get) => ({
  timeLimit: DEFAULT_TIME,
  timeLeft: DEFAULT_TIME,
  timerActive: false,

  // Action to set timeLimit
  setTimeLimit: (num) => {
    set({ timeLimit: num });
  },

  // Action to set timeLeft
  setTimeLeft: (time) => {
    set({ timeLeft: time });
  },

  // Action to set timerActive
  setTimerActive: (bool) => {
    set({ timerActive: bool });
  },

  // Action to reset timer
  resetTimer: () => {
    const timeLimit = get().timeLimit;
    set({ timeLeft: timeLimit, timerActive: false });
  },
}));

export default useTimedStore;
