"use client";
import InputBox from "./InputBox";
import { useEffect, useState, useRef, useCallback } from "react";
import { wordsData, generateRandomWords } from "@/lib/words";
import useWordsStore from "@/app/stores/useWordsStore";
import useTimedStore from "@/app/stores/useTimedStore";
import StatsBox from "../StatsBox/StatsBox";
import WordCounter from "./WordCounter";
import ErrorCounter from "./ErrorCounter";
import StandardSettingsBar from "./Settings/StandardSettingsBar";
import Timer from "./Timer";
import ModeBar from "./Settings/ModeBar";
import TimedSettingsBar from "./Settings/TimedSettingsBar";
import gameModes from "@/lib/gamemodes";
import Instruction from "./Instruction";
import { motion, AnimatePresence } from "framer-motion";
import Animation from "../Animation";

// The InputBox contains two things: An invisible input box and a box to display the given words
const TypeBox = () => {
  // States that need to be kept track of
  // Keep track of how many first lines have been typed, This offset is to keep track of the correct word position after the lines update
  const [wordsTypedOffset, setWordsTypedOffset] = useState(0);
  const [numWords, setNumWords] = useState(25); // Number of words in total to type for one game
  const [wordsToType, setWordsToType] = useState([]); // Array of words that the user must type
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0); // State to keep track of what is the current line
  const [typedText, setTypedText] = useState(""); // State to keep track of what is being typed in the input box
  const [allTypedWords, setAllTypedWords] = useState([]);
  const [startedTyping, setStartedTyping] = useState(false);
  const [focus, setFocus] = useState(true); // State to keep track of whether the input box is clicked on or not
  const [numWordsTyped, setNumWordsTyped] = useState(0);
  const [showSettingsBar, setShowSettingsBar] = useState(true);

  // Reference for the input box for focusing and blurring
  const inputRef = useRef(null);

  // Timed store functions
  const setTimerActive = useTimedStore((state) => state.setTimerActive);
  const resetTimer = useTimedStore((state) => state.resetTimer);
  const timeLimit = useTimedStore((state) => state.timeLimit);

  // Words Store states
  const errors = useWordsStore((state) => state.errors);
  const mode = useWordsStore((state) => state.mode);

  // Words Store Reset Functions
  const resetErrors = useWordsStore((state) => state.resetErrors);
  const resetLettersCorrectlyTyped = useWordsStore(
    (state) => state.resetLettersCorrectlyTyped
  );
  const resetLettersTyped = useWordsStore((state) => state.resetLettersTyped);
  const startTimer = useWordsStore((state) => state.startTimer);
  const endTimer = useWordsStore((state) => state.endTimer);
  const resetTimers = useWordsStore((state) => state.resetTimers);

  // Randomize the wordsData on first component mount
  useEffect(() => {
    setWordsToType(generateRandomWords(wordsData, numWords));

    return () => {
      resetGame();
    };
  }, []);

  // Words Store set states
  useEffect(() => {
    // If the number of words is changed, update it inside the store (For score calculation)
    useWordsStore.getState().setNumWords(numWords); // Randomize the words everytime the number of words changes
    resetGame(numWords);
  }, [numWords]);

  useEffect(() => {
    if (mode == gameModes.STANDARD) {
      useWordsStore.getState().setNumWords(numWords); // Randomize the words everytime the number of words changes
      resetGame(numWords); // Reset game anytime a mode or time limit is changed
    } else {
      resetGame(200); // Reset game anytime a mode or time limit is changed
    }
  }, [numWords, timeLimit, mode]);

  // Infinite words
  useEffect(() => {
    // If the number of words typed is changed, update it inside the store (For score calculation)
    useWordsStore.getState().setNumWordsTyped(numWordsTyped);

    // Ignore standard mode from this point onwards
    if (mode == gameModes.STANDARD) {
      return;
    }

    // If the number of lines typed reaches a threshold, append more words to the array
    if (numWordsTyped > numWords - 50) {
      setWordsToType((prev) => [
        ...prev,
        ...generateRandomWords(wordsData, 200),
      ]);
    }
  }, [numWordsTyped]);

  // Events that will start/stop the timer (standard and timed mode)
  useEffect(() => {
    // Start timer to count elapsed time
    if (
      (mode == gameModes.STANDARD || mode == gameModes.PRACTICE) &&
      startedTyping &&
      !gameCompleted
    ) {
      startTimer();
    }

    if (mode === gameModes.TIMED && startedTyping && !gameCompleted) {
      setTimerActive(true);
    }

    if (startedTyping) {
      setShowSettingsBar(false);
    } else if (!startedTyping) {
      setShowSettingsBar(true);
    }
  }, [startedTyping, gameCompleted]);

  useEffect(() => {
    // Stop timer
    if (
      (mode == gameModes.STANDARD || mode == gameModes.PRACTICE) &&
      gameCompleted
    ) {
      endTimer();
    }
  }, [gameCompleted]);

  // Function to reset the game
  const resetGame = (numWords) => {
    // Set focus
    setFocus(true);

    // Reset letters typed counts
    resetLettersCorrectlyTyped();
    resetLettersTyped();
    resetErrors();
    setNumWordsTyped(0);
    setAllTypedWords([]);

    // Reset the displayed words back to the start
    setCurrentLineIndex(0);
    setWordsTypedOffset(0);

    // Reset typed text
    setTypedText("");

    // Reset game completion status
    setGameCompleted(false);

    // Randomize words again
    setWordsToType(generateRandomWords(wordsData, numWords));

    // Reset timers
    setStartedTyping(false);
    resetTimers();

    if (mode === gameModes.TIMED) {
      resetTimer(); // Timed mode timer
    }
  };

  return (
    (gameCompleted && (
      <Animation id="stats" visible={gameCompleted}>
        {/* StatsBox */}
        <div className={`translate-y-[-75px]`}>
          <StatsBox
            gameCompleted={gameCompleted}
            setGameCompleted={setGameCompleted}
            resetGame={resetGame}
            allTypedWords={allTypedWords}
            wordsToType={wordsToType}
            numWords={numWords}
          />
        </div>
      </Animation>
    )) || (
      <Animation id="typebox" visible={!gameCompleted}>
        <div className={`relative`}>
          {/* Timer */}
          {mode == gameModes.TIMED && (
            <Animation id="timer">
              <div
                className={`absolute flex translate-x-[-100px] translate-y-[-140px]`}
              >
                <Timer startedTyping={startedTyping} />
              </div>
            </Animation>
          )}
          <div
            className={`absolute translate-x-[-495px] translate-y-[-60px] w-[300px]`}
          >
            {/* Word & Error Counters */}
            <Animation id="counters" visible={startedTyping}>
              <div className="flex flex-col">
                <ErrorCounter errors={errors} />
                <WordCounter
                  allTypedWords={allTypedWords}
                  numWords={numWords}
                />
              </div>
            </Animation>
          </div>
          {/* InputBox*/}
          <InputBox
            wordsData={wordsToType}
            wordsTypedOffset={wordsTypedOffset}
            setWordsTypedOffset={setWordsTypedOffset}
            numWords={numWords}
            gameCompleted={gameCompleted}
            setGameCompleted={setGameCompleted}
            currentLineIndex={currentLineIndex}
            setCurrentLineIndex={setCurrentLineIndex}
            numWordsTyped={numWordsTyped}
            setNumWordsTyped={setNumWordsTyped}
            typedText={typedText}
            setTypedText={setTypedText}
            setStartedTyping={setStartedTyping}
            startedTyping={startedTyping}
            allTypedWords={allTypedWords}
            setAllTypedWords={setAllTypedWords}
            focus={focus}
            setFocus={setFocus}
            inputRef={inputRef}
          />
          {/* SettingsBars/Instructions */}
          <Animation id="settings" visible={showSettingsBar}>
            <div className="absolute translate-y-[225px] translate-x-[-495px] flex flex-col gap-5">
              <ModeBar inputRef={inputRef} />
              {mode == gameModes.STANDARD && (
                <StandardSettingsBar
                  setNumWords={setNumWords}
                  inputRef={inputRef}
                  numWords={numWords}
                />
              )}
              {mode == gameModes.TIMED && (
                <TimedSettingsBar inputRef={inputRef} />
              )}
              <div className="flex justify-left items-center">
                <Instruction button={"esc"} desc={"restart game"} />
              </div>
            </div>
          </Animation>
        </div>
      </Animation>
    )
  );
};

export default TypeBox;
