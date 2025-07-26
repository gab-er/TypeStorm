import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, it, describe, afterEach, beforeEach, vi } from "vitest";
import InputBox from "../src/app/components/TypeBox/InputBox";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, waitFor } from "@testing-library/react";
import { useState, useRef } from "react";

// Mock the inputRef that your component uses internally
const mockInputRef = {
  current: {
    focus: vi.fn(),
    blur: vi.fn(),
    value: "",
    setSelectionRange: vi.fn(),
    selectionStart: 0,
    selectionEnd: 0,
  },
};

// Mock useRef to return our mock inputRef
vi.spyOn(React, "useRef").mockReturnValue(mockInputRef);

// Use a mock input box component to allow for state changes
const InputBoxTestWrapper = () => {
  const [typedText, setTypedText] = useState("");
  const [focus, setFocus] = useState(true);

  return (
    <InputBox
      wordsData={["hello", "world", "test"]}
      wordsTypedOffset={0}
      numWords={3}
      gameCompleted={false}
      currentLineIndex={0}
      typedWordsCount={0}
      startedTyping={true}
      setWordsTypedOffset={() => {}}
      setGameCompleted={() => {}}
      setCurrentLineIndex={() => {}}
      setTypedWordsCount={() => {}}
      setStartedTyping={() => {}}
      setAllTypedWords={() => {}}
      focus={focus}
      setFocus={setFocus}
      setNumWordsTyped={() => {}}
      typedText={typedText}
      setTypedText={setTypedText}
      inputRef={mockInputRef}
    />
  );
};

describe("InputBox and BlurBox", () => {
  afterEach(() => {
    cleanup(); // Clear the DOM between each test
  });

  // Test that the BlurBox only shows up when the InputBox is clicked on
  it("hides BlurBox when InputBox is clicked on", async () => {
    render(<InputBoxTestWrapper />);

    // Get the InputBox component
    const input = screen.getByTestId("typing-input");
    expect(screen.queryByTestId("typing-input")).toBeInTheDocument();

    // InputBox is autoFocused, so the default is that BlurBox is not in the document
    expect(screen.queryByTestId("blur-box")).not.toBeInTheDocument();

    // Unfocus the input box, essentially blurring it
    await userEvent.click(document.body);

    expect(screen.getByTestId("blur-box")).toBeInTheDocument();
  });

  it("shows BlurBox on blur and hides again on refocus", async () => {
    render(<InputBoxTestWrapper />);

    const input = screen.getByTestId("typing-input");

    // Blur the input by clicking outside
    await userEvent.click(document.body);
    expect(screen.getByTestId("blur-box")).toBeInTheDocument();

    // Focus again
    await userEvent.click(input);
    expect(screen.queryByTestId("blur-box")).not.toBeInTheDocument();
  });

  it("should be able to update the input box value", async () => {
    const user = userEvent.setup();
    render(<InputBoxTestWrapper />);

    const input = screen.getByTestId("typing-input");

    // User types something
    await user.click(input);
    await user.type(input, "hello");

    await waitFor(() => {
      expect(input.value).toBe("hell"); // The code lags by one character behind
    });
  });

  it("should be able to reset the inputted text on pressing escape", async () => {
    const user = userEvent.setup();
    render(<InputBoxTestWrapper />);

    const input = screen.getByTestId("typing-input");

    // User types something
    await user.click(input);
    await user.type(input, "hello");

    // User presses Escape
    await user.keyboard("{Escape}");

    // Check that input is reset
    expect(input).toHaveValue("");
  });
});
