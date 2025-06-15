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
import StartNewGame from "./StartNewGame";

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

  const headerDescriptions = {
    netwpm:
      "Measure of accurate typing speed: total correct characters divided by 5 and normalised to 60s",
    rawwpm:
      "Measure of total typing speed: total characters typed divided by 5 and normalised to 60s",
    errors: "Total errors made while typing",
    accuracy: "Percentage of correct characters typed",
    time: "Time taken to type all words",
  };

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
        event.stopPropagation(); // Prevents this from getting inputted into the next game
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
          setRes(response); // Set the response to the received response (to check for achievements)
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false); // User is not logged in, show the stats obtained
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
        } catch (error) {
          console.log(error);
          setIsLoading(false); // User is not logged in, show the stats obtained
        }
      };
      postGameData();
      setSentData(true);
    }
  }, [gameCompleted]);

  return (
    (!isLoading && (
      <div className="flex flex-col items-center">
        {isNewPb && <ConfettiExplosion particleCount={150} duration={3000} />}
        {/* Stats */}
        <div className="flex flex-col w-[600px] h-[300px] text-2xl">
          {/* Row 1 */}
          <div className="flex justify-between h-1/2">
            <StatInfo
              header={"Net WPM"}
              stat={netWPM}
              pbWpm={pbWpm}
              aaWpm={aaWpm}
              headerDesc={headerDescriptions.netwpm}
            />
            <StatInfo
              header={"Raw WPM"}
              stat={grossWPM}
              headerDesc={headerDescriptions.rawwpm}
            />
          </div>
          {/* Row 2 */}
          <div className="flex justify-center h-1/2">
            <StatInfo
              header={"Errors"}
              stat={errors}
              headerDesc={headerDescriptions.errors}
            />
            <StatInfo
              header={"Accuracy"}
              stat={`${(accuracy * 100).toFixed(0)}%`}
              pbAccuracy={pbAccuracy}
              aaAccuracy={aaAccuracy}
              headerDesc={headerDescriptions.accuracy}
            />
            <StatInfo
              header={"Time"}
              stat={`${elapsedTime}s`}
              headerDesc={headerDescriptions.time}
            />
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
        <StartNewGame />
      </div>
    )) || <DelayedLoadingDefault />
  );
};

export default StatsBox;
