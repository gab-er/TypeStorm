"use client";
import useWordsStore from "../../stores/useWordsStore";
import { useState, useEffect } from "react";
import {
  usePostStatsStandard,
  usePostStatsStandardGame,
} from "@/lib/postStats";
import StatInfo from "./StatInfo";
import WordHistory from "./WordHistory";

const StatsBox = ({
  gameCompleted,
  setGameCompleted,
  resetGame,
  allTypedWords,
  wordsToType,
}) => {
  const [sentData, setSentData] = useState(false);

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
    <div className="flex flex-col items-center">
      {/* Stats */}
      <div className="flex flex-col w-[600px] h-[300px] text-2xl">
        {/* Row 1 */}
        <div className="flex justify-between h-1/2">
          <StatInfo title={"Net WPM"} stat={netWPM} />
          <StatInfo title={"Raw WPM"} stat={grossWPM} />
        </div>
        {/* Row 2 */}
        <div className="flex justify-center h-1/2">
          <StatInfo title={"Errors"} stat={errors} />
          {/* className={`${accuracyColor}`} */}
          <StatInfo
            title={"Accuracy"}
            stat={`${(accuracy * 100).toFixed(1)}%`}
          />
          <StatInfo title={"Time"} stat={`${elapsedTime}s`} />
        </div>
      </div>
      {/* Word History */}
      <div className="mt-4">
        <WordHistory allTypedWords={allTypedWords} wordsToType={wordsToType} />
      </div>
      {/* Space to start game  */}
      <p className="flex justify-center items-center text-gray-300 text-xl mt-4">
        <kbd className="ml-2 mr-2 px-2 py-1 text-lg font-semibold text-gray-800 bg-gray-900 border-gray-200  dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 rounded-xl">
          space
        </kbd>
        - start new game
      </p>
    </div>
  );
};

export default StatsBox;
