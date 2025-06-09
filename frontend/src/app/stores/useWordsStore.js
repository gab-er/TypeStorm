import { create } from "zustand";

const useWordsStore = create((set, get) => ({
  lettersCorrectlyTyped: 0,
  lettersTyped: 0,
  errors: 0,

  // Action to get gross WPM (need to add duration)
  grossWPM: () => get().lettersTyped,

  // Action to increment lettersCorrectlyTyped
  increaseLettersCorrectlyTyped: () => {
    console.log("New correct count: ", get().lettersCorrectlyTyped);
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
    console.log("New total count: ", get().lettersTyped);
    console.log("--------------------------");
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
