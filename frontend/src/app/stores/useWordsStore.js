import { create } from "zustand";
import calculateScore from "@/lib/score";
import useTimedStore from "./useTimedStore";
import gameModes from "@/lib/gamemodes";

const useWordsStore = create((set, get) => ({
  mode: gameModes.STANDARD, // gameModes.STANDARD
  lettersCorrectlyTyped: 0,
  lettersTyped: 0,
  errors: 0,
  startTime: null,
  endTime: null,
  numWords: 25,
  numWordsTyped: 0,

  // Action to set numWordsTyped
  setNumWordsTyped: (num) => {
    set({ numWordsTyped: num });
  },

  // Action to set mode
  setMode: (m) => {
    set({ mode: m });
  },

  // Action to set numWords
  setNumWords: (num) => {
    set({ numWords: num });
  },

  // Action to calculate score
  getScore: () => {
    const wpm = get().getNetWPM();
    const accuracy = get().getAccuracy();
    const errors = get().errors;
    const numWordsTyped = get().numWordsTyped;
    const score = calculateScore(wpm, accuracy, errors, numWordsTyped);
    return score;
  },

  // Action to set start time
  startTimer: () => {
    if (!get().startTime) {
      set({ startTime: Date.now(), endTime: null });
    }
  },

  // Action to set end time
  endTimer: () => {
    set({ endTime: Date.now() });
  },

  // Action to get elapsed time
  getElapsedTime: () => {
    const mode = get().mode;
    if (mode != gameModes.TIMED) {
      // If mode is standard or practice, calculate the time
      const startTime = get().startTime;
      const endTime = get().endTime;
      const elapsedTime = startTime
        ? ((endTime || Date.now()) - startTime) / 1000
        : 0;
      return Number(elapsedTime.toFixed(2));
    } else {
      // If mode is timed, obtain the time from useTimedStore
      return useTimedStore.getState().timeLimit;
    }
  },

  // Action to reset timers
  resetTimers: () => {
    set({ startTime: null, endTime: null });
  },

  // Action to get accuracy
  getAccuracy: () => {
    const lettersCorrectlyTyped = get().lettersCorrectlyTyped;
    const errors = get().errors;
    const accuracy = Number(
      (lettersCorrectlyTyped / (lettersCorrectlyTyped + errors)).toFixed(2)
    );

    if (isNaN(accuracy)) {
      return 0;
    } else {
      return accuracy;
    }
  },

  // Action to get gross WPM
  getGrossWPM: () => {
    const lettersTyped = get().lettersCorrectlyTyped + get().errors;
    const elapsedTime = get().getElapsedTime();
    const grossWPM = Math.floor((lettersTyped / 5 / elapsedTime) * 60);
    return grossWPM;
  },

  // Action to get net WPM
  getNetWPM: () => {
    const lettersCorrectlyTyped = get().lettersCorrectlyTyped;
    const elapsedTime = get().getElapsedTime();
    // const errors = get().errors;
    // const grossWPM = get().getGrossWPM();
    // const netWPM = Math.floor(grossWPM - (errors / elapsedTime * 60));
    const netWPM = Math.floor((lettersCorrectlyTyped / 5 / elapsedTime) * 60);
    return netWPM;
  },

  // Action to increment lettersCorrectlyTyped
  increaseLettersCorrectlyTyped: () => {
    set((state) => ({
      lettersCorrectlyTyped: state.lettersCorrectlyTyped + 1,
    }));
  },

  // Action to decrement lettersCorrectlyTyped
  decreaseLettersCorrectlyTyped: () =>
    set((state) => ({
      lettersCorrectlyTyped: state.lettersCorrectlyTyped - 1,
    })),

  // Action to reset lettersCorrectlyTyped
  resetLettersCorrectlyTyped: () => {
    set(() => ({
      lettersCorrectlyTyped: 0,
    }));
  },

  // Action to increment lettersTyped
  increaseLettersTyped: () => {
    set((state) => ({
      lettersTyped: state.lettersTyped + 1,
    }));
  },

  // Action to decrement lettersCorrectlyTyped
  decreaseLettersTyped: () =>
    set((state) => ({
      // Have letters typed be clamped at errors if there are errors -> prevents errors > letters typed
      lettersTyped: Math.max(state.lettersTyped - 1, state.errors),
    })),

  // Action to reset lettersCorrectlyTyped
  resetLettersTyped: () =>
    set(() => ({
      lettersTyped: 0,
    })),

  // Action to increment errors
  increaseErrors: () =>
    set((state) => ({
      errors: state.errors + 1,
    })),

  // Action to decrement errors
  decreaseErrors: () =>
    set((state) => ({
      errors: state.errors - 1,
    })),

  // Action to reset lettersCorrectlyTyped
  resetErrors: () =>
    set(() => ({
      errors: 0,
    })),
}));

export default useWordsStore;
