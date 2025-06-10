import { create } from "zustand";

const useWordsStore = create((set, get) => ({
  lettersCorrectlyTyped: 0,
  lettersTyped: 0,
  errors: 0,
  startTime: null,
  endTime: null,

  // Action to set start time
  startTimer: () => {
    set({ startTime: Date.now() });
  },

  // Action to set end time
  endTimer: () => {
    set({ endTime: Date.now() });
  },

  // Action to get elapsed time
  getElapsedTime: () => {
    const startTime = get().startTime;
    console.log("start time: ", startTime);
    const endTime = get().endTime;
    console.log("end time: ", endTime);
    const elapsedTime = startTime
      ? ((endTime || Date.now()) - startTime) / 1000
      : 0;
      console.log("elapsed time: ", elapsedTime);
    return elapsedTime;
  },

  // Action to reset timers
  resetTimers: () => {
    set({ startTime: null, endTime: null });
  },

  // Action to get accuracy
  getAccuracy: () => {
    const lettersCorrectlyTyped = get().lettersCorrectlyTyped;
    const errors = get().errors;
    const accuracy =
      (lettersCorrectlyTyped / (lettersCorrectlyTyped + errors)) * 100;
    return accuracy.toFixed(1);
  },

  // Action to get gross WPM (need to add duration)
  grossWPM: () => get().lettersTyped,

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
