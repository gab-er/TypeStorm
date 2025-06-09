"use client";
import InputBox from "./InputBox";
import { useEffect, useState } from "react";
import { shuffleWords, wordsData } from "@/lib/words";
import useWordsStore from "@/app/stores/useWordsStore";

// The InputBox contains two things: An invisible input box and a box to display the given words

const TypeBox = () => {
  const [shuffledWordsData, setShuffledWordsData] = useState([]);

  // This offset is to keep track of the correct word position after the lines update
  // Keep track of how many first lines have been typed
  const [wordsTypedOffset, setWordsTypedOffset] = useState(0);

  // Shuffle the wordsData on first component mount
  useEffect(() => {
    setShuffledWordsData(shuffleWords(wordsData));
  }, []);

  // If the number of lines typed reaches a threshold, append a shuffled word array to the wordsData to make it infinite
  useEffect(() => {
    if (wordsTypedOffset > wordsData.length - 50) {
      setShuffledWordsData((prev) => [...prev, ...shuffleWords(wordsData)]);
    }
  }, [wordsTypedOffset]);

  return (
    <div>
      <InputBox
        wordsData={shuffledWordsData}
        wordsTypedOffset={wordsTypedOffset}
        setWordsTypedOffset={setWordsTypedOffset}
      />
    </div>
  );
};

export default TypeBox;
