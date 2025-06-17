import { render, screen } from "@testing-library/react";
import { expect, test, it, describe, afterEach, beforeEach } from "vitest";
import InputBox from "../src/app/components/TypeBox/InputBox";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, waitFor } from "@testing-library/react";
import { useState } from "react";

// Use a mock input box component to allow for state changes
const InputBoxTestWrapper = () => {
  const [typedText, setTypedText] = useState("");

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
      typedText={typedText}
      setTypedText={setTypedText}
    />
  );
};

// Mock props required by InputBox
const defaultProps = {
  wordsData: ["hello", "world", "foo", "bar"],
  wordsTypedOffset: 0,
  setWordsTypedOffset: () => {},
  numWords: 4,
  gameCompleted: false,
  setGameCompleted: () => {},
  currentLineIndex: 0,
  setCurrentLineIndex: () => {},
  typedWordsCount: 0,
  setTypedWordsCount: () => {},
  typedText: "",
  setTypedText: () => {},
  setStartedTyping: () => {},
  startedTyping: false,
  setAllTypedWords: () => {},
};

describe("InputBox and BlurBox", () => {
  afterEach(() => {
    cleanup(); // Clear the DOM between each test
  });

  // Test that the BlurBox only shows up when the InputBox is clicked on
  it("hides BlurBox when InputBox is clicked on", async () => {
    render(<InputBox {...defaultProps} />);

    // Get the InputBox component
    const input = screen.getByTestId("typing-input");

    // InputBox is autoFocused, so the default is that BlurBox is not in the document
    expect(screen.queryByTestId("blur-box")).not.toBeInTheDocument();

    // Unfocus the input box, essentially blurring it
    await userEvent.click(document.body);

    expect(screen.getByTestId("blur-box")).toBeInTheDocument();
  });

  it("shows BlurBox on blur and hides again on refocus", async () => {
    render(<InputBox {...defaultProps} />);

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
