"use client";
import useWordsStore from "../stores/useWordsStore";
import { useEffect } from "react";

const StatsBox = ({ gameCompleted, setGameCompleted, resetGame }) => {
  const lettersCorrectlyTyped = useWordsStore(
    (state) => state.lettersCorrectlyTyped
  );
  const lettersTyped = useWordsStore((state) => state.lettersTyped);
  const accuracy = useWordsStore((state) => state.getAccuracy()) || "-";
  const errors = useWordsStore((state) => state.errors);
  const elapsedTime = useWordsStore((state) => state.getElapsedTime)().toFixed(2);
  const grossWPM = useWordsStore(state => state.getGrossWPM)();
  const netWPM = useWordsStore(state => state.getNetWPM)();


  useEffect(() => {
    // Reset game on space press
    const handleKeyDown = (event) => {
      if (gameCompleted && event.key == " ") {
        event.preventDefault();
        event.stopPropagation();
        resetGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex justify-center relative">
      <div className="text-start opacity-50 cursor-default w-[1000px] h-[300px] absolute text-white pb-40 pl-2.5 text-2xl border">
        <p> Total Letters Typed: {lettersTyped} </p>
        <p> Letters Correctly Typed : {lettersCorrectlyTyped} </p>
        <p> Errors: {errors} </p>
        <p> Accuracy: {accuracy}% </p>
        <p> Time: {elapsedTime}s </p>
        <p> Gross WPM: {grossWPM} </p>
        <p> Net WPM: {netWPM} </p>
        <p> PRESS "SPACE" TO START ANOTHER GAME </p>
      </div>
    </div>
  );
};

export default StatsBox;
