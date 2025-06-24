import { render, screen } from "@testing-library/react";
import { expect, test, it, describe } from "vitest";
import { splitWordsWithSpaces, countLetters } from "../src/lib/words";

describe("Words", () => {

  // Testing the words utility function - splitWordsWithSpaces 
  // Should correctly split a string into an array of word strings, each with a " " appended to the end if it exists
  test("splitWordsWithSpaces splits on spaces correctly", () => {
    expect(splitWordsWithSpaces("hello world foo bar ")).toEqual(["hello ", "world ", "foo ", "bar "]);
  });

  // Testing the words utility function - countLetters
  // Should correctly count the number of letters in an array of strings, including spaces
  test("countLetters correctly counts the number of letters in a sentence", () => {
    expect(countLetters(["This ", "sentence ", "has ", "28 ", "letters"])).toEqual(28)
  })
});
