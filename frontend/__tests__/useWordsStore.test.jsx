import { render, screen } from "@testing-library/react";
import { expect, test, it, describe, afterEach, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import useWordsStore from "../src/app/stores/useWordsStore";

describe("useWordsStore", () => {
  // Reset the store to its initial state before each test
  beforeEach(() => {
    useWordsStore.setState({
      lettersCorrectlyTyped: 10,
      lettersTyped: 10,
      errors: 0,
      startTime: null,
      endTime: null,
    });
  });

  it("should correctly increment, decrement and reset lettersCorrectlyTyped", async () => {
    // Default Value
    const initialValue = useWordsStore.getState().lettersCorrectlyTyped;
    expect(initialValue).toEqual(10);

    // Increment by the letters correctly typed by 1
    useWordsStore.getState().increaseLettersCorrectlyTyped();

    // Value after incrementing
    const afterValue = useWordsStore.getState().lettersCorrectlyTyped;
    expect(afterValue).toEqual(11);

    // Decrement by the letters correctly typed by 1
    useWordsStore.getState().decreaseLettersCorrectlyTyped();

    // Value after decrementing
    const decreasedValue = useWordsStore.getState().lettersCorrectlyTyped;
    expect(decreasedValue).toEqual(10);

    // Reset value back to 0
    useWordsStore.getState().resetLettersCorrectlyTyped();
    const resetValue = useWordsStore.getState().lettersCorrectlyTyped;
    expect(resetValue).toEqual(0);
  });

  it("should correctly increment, decrement and reset lettersTyped", async () => {
    // Default Value
    const initialValue = useWordsStore.getState().lettersTyped;
    expect(initialValue).toEqual(10);

    // Increment by the letters correctly typed by 1
    useWordsStore.getState().increaseLettersTyped();

    // Value after incrementing
    const afterValue = useWordsStore.getState().lettersTyped;
    expect(afterValue).toEqual(11);

    // Decrement by the letters correctly typed by 1
    useWordsStore.getState().decreaseLettersTyped();

    // Value after decrementing
    const decreasedValue = useWordsStore.getState().lettersTyped;
    expect(decreasedValue).toEqual(10);

    // Reset value back to 0
    useWordsStore.getState().resetLettersTyped();
    const resetValue = useWordsStore.getState().lettersTyped;
    expect(resetValue).toEqual(0);
  });

  it("calculates accuracy correctly", () => {
    const store = useWordsStore.getState();
    store.increaseErrors(); // 1
    expect(store.getAccuracy()).toBeCloseTo(10 / 11);
  });

  it('correctly calculates gross and net WPM', () => {
    const store = useWordsStore.getState()

    // Mock timers 
    const fakeStart = Date.now()
    const fakeEnd = fakeStart + 30_000 // 30 seconds later

    useWordsStore.setState({
      lettersCorrectlyTyped: 50,
      lettersTyped: 60,
      errors: 10,
      startTime: fakeStart,
      endTime: fakeEnd
    })

    expect(store.getGrossWPM()).toBe(24) // ((60 letters) / 5 / 30s) * 60 = 24
    expect(store.getNetWPM()).toBe(20)   // ((50 letters) / 5 / 30s) * 60 = 20
  })

});
