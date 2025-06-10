"use client";
import InputBox from "./InputBox";
import { useEffect, useState } from "react";
import { shuffleWords, wordsData } from "@/lib/words";
import useWordsStore from "@/app/stores/useWordsStore";
import StatsBox from "../StatsBox";

// The InputBox contains two things: An invisible input box and a box to display the given words

const TypeBox = () => {
  const WORDS_TO_TYPE = 50;

  // States that need to be kept track of 
  const [wordsTypedOffset, setWordsTypedOffset] = useState(0); // Keep track of how many first lines have been typed, This offset is to keep track of the correct word position after the lines update
  const [numWords, setNumWords] = useState(WORDS_TO_TYPE); // Number of words in total to type for one game
  const [shuffledWordsData, setShuffledWordsData] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0); // State to keep track of what is the current line
  const [typedWordsCount, setTypedWordsCount] = useState(0);
  const [typedText, setTypedText] = useState(""); // State to keep track of what is being typed in the input box
  const [startedTyping, setStartedTyping] = useState(false);

  // Words Store Reset Functions
  const resetErrors = useWordsStore((state) => state.resetErrors);
  const resetLettersCorrectlyTyped = useWordsStore(
    (state) => state.resetLettersCorrectlyTyped
  );
  const resetLettersTyped = useWordsStore((state) => state.resetLettersTyped);
  const startTimer = useWordsStore((state) => state.startTimer);
  const endTimer = useWordsStore((state) => state.endTimer);
  const resetTimers = useWordsStore((state) => state.resetTimers);

  // Shuffle the wordsData on first component mount
  useEffect(() => {
    setShuffledWordsData(shuffleWords(wordsData));
  }, []);

  // Events that will start/stop the timer
  useEffect(() => {
    // Start timer
    if (startedTyping && !gameCompleted) {
      startTimer();
      console.log("started timer");
    }
  }, [startedTyping, gameCompleted]);

  useEffect(() => {
    // Stop timer
    if (gameCompleted) {
      endTimer();
      console.log("ended timer");
    }
  }, [gameCompleted]);

  // Function to reset the game
  const resetGame = () => {
    // Reset letters typed counts
    resetLettersCorrectlyTyped();
    resetLettersTyped();
    resetErrors();
    setTypedWordsCount(0);

    // Reset the displayed words back to the start
    setCurrentLineIndex(0);
    setWordsTypedOffset(0);

    // Reset typed text
    setTypedText("");

    // Reset game completion status
    setGameCompleted(false);

    // Shuffle words again
    setShuffledWordsData(shuffleWords(wordsData));

    // Reset timers
    setStartedTyping(false);
    resetTimers();
  };

  // If the number of lines typed reaches a threshold, append a shuffled word array to the wordsData to make it infinite
  // useEffect(() => {
  //   if (wordsTypedOffset > wordsData.length - 50) {
  //     setShuffledWordsData((prev) => [...prev, ...shuffleWords(wordsData)]);
  //   }
  // }, [wordsTypedOffset]);

  return (
    <div>
      {(gameCompleted && (
        <StatsBox
          gameCompleted={gameCompleted}
          setGameCompleted={setGameCompleted}
          resetGame={resetGame}
        />
      )) || (
        <InputBox
          wordsData={shuffledWordsData.slice(0, numWords)}
          wordsTypedOffset={wordsTypedOffset}
          setWordsTypedOffset={setWordsTypedOffset}
          numWords={numWords}
          gameCompleted={gameCompleted}
          setGameCompleted={setGameCompleted}
          currentLineIndex={currentLineIndex}
          setCurrentLineIndex={setCurrentLineIndex}
          typedWordsCount={typedWordsCount}
          setTypedWordsCount={setTypedWordsCount}
          typedText={typedText}
          setTypedText={setTypedText}
          setStartedTyping={setStartedTyping}
          startedTyping={startedTyping}
        />
      )}
    </div>
  );
};

export default TypeBox;
