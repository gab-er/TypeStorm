"use client";
import useWordsStore from "../stores/useWordsStore";
import { useState, useEffect } from "react";
import {
  usePostStatsStandard,
  usePostStatsStandardGame,
} from "@/lib/postStats";

const StatsBox = ({ gameCompleted, setGameCompleted, resetGame }) => {
  const [sentData, setSentData] = useState(false)

  const [res, setRes] = useState({
    pbWpm: false,
    aaWpm: false,
    pbAccuracy: false,
    aaAccuracy: false,
  });
  const pbWPM = res.pbWpm;
  const aaWPM = res.aaWpm;
  const pbAccuracy = res.pbAccuracy;
  const aaAccuracy = res.aaAccuracy;

  // Adjust colors of stats depending on result
  let wpmColor = pbWPM
    ? "text-yellow-500"
    : aaWPM
    ? "text-green-500"
    : "text-white-500";

  let accuracyColor = pbAccuracy
    ? "text-yellow-500"
    : aaAccuracy
    ? "text-green-500"
    : "text-white-500";

  const lettersCorrectlyTyped = useWordsStore(
    (state) => state.lettersCorrectlyTyped
  );
  const lettersTyped = useWordsStore((state) => state.lettersTyped);
  const accuracy = useWordsStore((state) => state.getAccuracy());
  const errors = useWordsStore((state) => state.errors);
  const elapsedTime = useWordsStore((state) => state.getElapsedTime)().toFixed(
    2
  );
  const grossWPM = useWordsStore((state) => state.getGrossWPM)();
  const netWPM = useWordsStore((state) => state.getNetWPM)();

  // Mutation to post stats to the STANDARD API
  const postStatsStandard = usePostStatsStandard();

  const postStatsStandardGame = usePostStatsStandardGame();

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

  // Send stats once a game is completed
  useEffect(() => {
    if (gameCompleted && !sentData) {
      // Send stats to statistics route
      const postStatsData = async () => {
        try {
          const stats = {
            wpm: netWPM,
            accuracy: accuracy,
          };
          console.log("submitting data; ", stats);
          const response = await postStatsStandard.mutateAsync(stats);
          setRes(response);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      postStatsData();

      // Send stats to game route
      const postGameData = async () => {
        try {
          const stats = {
            wpm: netWPM,
            accuracy: accuracy,
            errors: errors,
          };
          const response = await postStatsStandardGame.mutateAsync(stats);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      postGameData();
      setSentData(true);
    }
  }, [gameCompleted]);

  return (
    <div className="flex justify-center relative">
      <div className="text-start opacity-50 cursor-default w-[1000px] h-[300px] absolute text-white pb-40 pl-2.5 text-2xl border">
        <p> Total Letters Typed: {lettersTyped} </p>
        <p> Letters Correctly Typed : {lettersCorrectlyTyped} </p>
        <p> Errors: {errors} </p>
        <p className={`${accuracyColor}`}> Accuracy: {(accuracy * 100).toFixed(1)}% </p>
        <p> Time: {elapsedTime}s </p>
        <p> Gross WPM: {grossWPM} </p>
        <p className={`${wpmColor}`}> Net WPM: {netWPM} </p>
        <p> PRESS "SPACE" TO START ANOTHER GAME </p>
      </div>
    </div>
  );
};

export default StatsBox;
