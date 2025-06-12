"use client";
import useWordsStore from "../../stores/useWordsStore";
import { useState, useEffect } from "react";
import {
  usePostStatsStandard,
  usePostStatsStandardGame,
} from "@/lib/postStats";
import StatInfo from "./StatInfo";
import WordHistory from "./WordHistory";
import ConfettiExplosion from "react-confetti-explosion";
import DelayedLoadingDefault from "../Navbar/DelayedLoadingDefault";

const StatsBox = ({ gameCompleted, resetGame, allTypedWords, wordsToType }) => {
  const [sentData, setSentData] = useState(false);
  const [isNewPb, setIsNewPb] = useState(false);
  const [pbWpm, setPbWpm] = useState(false);
  const [aaWpm, setAaWpm] = useState(false);
  const [pbAccuracy, setPbAccuracy] = useState(false);
  const [aaAccuracy, setAaAccuracy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [res, setRes] = useState({
    pbWpm: false,
    aaWpm: false,
    pbAccuracy: false,
    aaAccuracy: false,
  });

  // Update if there were any new PBs or Above Averages
  useEffect(() => {
    if (res) {
      setPbWpm(res.pbWpm);
      setAaWpm(res.aaWpm);
      setPbAccuracy(res.pbAccuracy);
      setAaAccuracy(res.aaAccuracy);
    }
  }, [res]);

  // Update to show confetti if there were new PBs
  useEffect(() => {
    if (pbWpm || pbAccuracy) {
      setIsNewPb(true);
    }
  }, [pbWpm, pbAccuracy]);

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
          setIsLoading(false);
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
    // {(!isLoading && loginDisplay) || (
    //           <DelayedLoadingDefault/>
    //         )}
    (!isLoading && (
      <div className="flex flex-col items-center">
        {isNewPb && <ConfettiExplosion particleCount={150} duration={3000} />}
        {/* Stats */}
        <div className="flex flex-col w-[600px] h-[300px] text-2xl">
          {/* Row 1 */}
          <div className="flex justify-between h-1/2">
            <StatInfo
              title={"Net WPM"}
              stat={netWPM}
              pbWpm={pbWpm}
              aaWpm={aaWpm}
            />
            <StatInfo title={"Raw WPM"} stat={grossWPM} />
          </div>
          {/* Row 2 */}
          <div className="flex justify-center h-1/2">
            <StatInfo title={"Errors"} stat={errors} />
            {/* className={`${accuracyColor}`} */}
            <StatInfo
              title={"Accuracy"}
              stat={`${(accuracy * 100).toFixed(0)}%`}
              pbAccuracy={pbAccuracy}
              aaAccuracy={aaAccuracy}
            />
            <StatInfo title={"Time"} stat={`${elapsedTime}s`} />
          </div>
        </div>
        {/* Word History */}
        <div className="mt-4">
          <WordHistory
            allTypedWords={allTypedWords}
            wordsToType={wordsToType}
          />
        </div>
        {/* Space to start game  */}
        <p className="flex justify-center items-center text-gray-300 text-xl mt-6">
          <kbd className="ml-2 mr-2 px-2 py-0.5 text-lg font-semibold text-gray-600 bg-gray-900 border-gray-200  dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 rounded-xl">
            space
          </kbd>
          - start new game
        </p>
      </div>
    )) || <DelayedLoadingDefault />
  );
};

export default StatsBox;
