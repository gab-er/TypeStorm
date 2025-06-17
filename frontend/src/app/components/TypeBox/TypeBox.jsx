"use client";
import InputBox from "./InputBox";
import { useEffect, useState, useRef } from "react";
import { wordsData, generateRandomWords } from "@/lib/words";
import useWordsStore from "@/app/stores/useWordsStore";
import StatsBox from "../StatsBox/StatsBox";
import WordCounter from "./WordCounter";
import ErrorCounter from "./ErrorCounter";
import SettingsBar from "./SettingsBar";

// The InputBox contains two things: An invisible input box and a box to display the given words
const TypeBox = () => {
  // States that need to be kept track of
  // Keep track of how many first lines have been typed, This offset is to keep track of the correct word position after the lines update
  const [wordsTypedOffset, setWordsTypedOffset] = useState(0);
  const [numWords, setNumWords] = useState(25); // Number of words in total to type for one game
  const [wordsToType, setWordsToType] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0); // State to keep track of what is the current line
  const [typedWordsCount, setTypedWordsCount] = useState(0);
  const [typedText, setTypedText] = useState(""); // State to keep track of what is being typed in the input box
  const [allTypedWords, setAllTypedWords] = useState([]);
  const [startedTyping, setStartedTyping] = useState(false);
  const [focus, setFocus] = useState(true); // State to keep track of whether the input box is clicked on or not

  // Reference for the input box for focusing and blurring
  const inputRef = useRef(null);

  // Words Store states
  const errors = useWordsStore((state) => state.errors);

  // Words Store Reset Functions
  const resetErrors = useWordsStore((state) => state.resetErrors);
  const resetLettersCorrectlyTyped = useWordsStore(
    (state) => state.resetLettersCorrectlyTyped
  );
  const resetLettersTyped = useWordsStore((state) => state.resetLettersTyped);
  const startTimer = useWordsStore((state) => state.startTimer);
  const endTimer = useWordsStore((state) => state.endTimer);
  const resetTimers = useWordsStore((state) => state.resetTimers);

  // Words Store set states
  useEffect(() => {
    // If the number of words is changed, update it inside the store (For score calculation)
    useWordsStore.getState().setNumWords(numWords);
  }, [numWords]);

  // Randomize the wordsData on first component mount
  useEffect(() => {
    setWordsToType(generateRandomWords(wordsData, numWords));

    return () => {
      resetGame(); // Reset game on component unmount
    };
  }, []);

  // Randomize the words everytime the number of words changes
  useEffect(() => {
    resetGame(numWords);
  }, [numWords]);

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

      // Post stats
      console.log("ended timer");
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
    setTypedWordsCount(0);
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
  };

  // If the number of lines typed reaches a threshold, append a shuffled word array to the wordsData to make it infinite
  // useEffect(() => {
  //   if (wordsTypedOffset > wordsData.length - 50) {
  //     setShuffledWordsData((prev) => [...prev, ...shuffleWords(wordsData)]);
  //   }
  // }, [wordsTypedOffset]);

  return (
    (gameCompleted && (
      <div>
        <div className="translate-y-[-75px]">
          <StatsBox
            gameCompleted={gameCompleted}
            setGameCompleted={setGameCompleted}
            resetGame={resetGame}
            allTypedWords={allTypedWords}
            wordsToType={wordsToType}
            numWords={numWords}
          />
        </div>
      </div>
    )) || (
      <div className="relative">
        <div className="absolute translate-x-[-495px] translate-y-[-50px] w-[300px]">
          {startedTyping && (
            <div className="flex flex-col">
              <ErrorCounter errors={errors} />
              <WordCounter allTypedWords={allTypedWords} numWords={numWords} />
            </div>
          )}
        </div>
        <InputBox
          wordsData={wordsToType}
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
          allTypedWords={allTypedWords}
          setAllTypedWords={setAllTypedWords}
          focus={focus}
          setFocus={setFocus}
          inputRef={inputRef}
        />
        <div className="absolute translate-y-[225px] translate-x-[-495px]">
          <SettingsBar setNumWords={setNumWords} inputRef={inputRef} numWords={numWords} />
        </div>
      </div>
    )
  );
};

export default TypeBox;
