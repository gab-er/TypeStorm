"use client";
import useWordsStore from "../../stores/useWordsStore";
import { useState, useEffect } from "react";
import {
  usePostStatsStandard,
  usePostStatsStandardGame,
  usePostStatsTimed,
  usePostStatsTimedGame,
} from "../../../lib/postStats";
import StatInfo from "./StatInfo";
import WordHistory from "./WordHistory";
import ConfettiExplosion from "react-confetti-explosion";
import Instruction from "../TypeBox/Instruction";
import gameModes from "@/lib/gamemodes";

const StatsBox = ({
  gameCompleted,
  resetGame,
  allTypedWords,
  wordsToType,
  numWords,
  startedTyping,
}) => {
  const [sentData, setSentData] = useState(false);
  const [isNewPb, setIsNewPb] = useState(false);
  const [pbWpm, setPbWpm] = useState(false);
  const [aaWpm, setAaWpm] = useState(false);
  const [pbAccuracy, setPbAccuracy] = useState(false);
  const [aaAccuracy, setAaAccuracy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pbScore, setPbScore] = useState(false);
  const [aaScore, setAaScore] = useState(false);
  const [frozenStats, setFrozenStats] = useState({
    netWPM: 0,
    grossWPM: 0,
    accuracy: 0,
    score: 0,
    errors: 0,
    elapsedTime: 0,
  });
  const [obtainedStats, setObtainedStats] = useState(false);

  const [res, setRes] = useState({
    pbWpm: false,
    aaWpm: false,
    pbAccuracy: false,
    aaAccuracy: false,
    pbScore: false,
    aaScore: false,
  });

  const headerDescriptions = {
    netwpm:
      "Measure of accurate typing speed: total correct characters divided by 5 and normalised to 60s",
    score: "Score calculated",
    rawwpm:
      "Measure of total typing speed: total characters typed divided by 5 and normalised to 60s",
    errors: "Total errors made while typing",
    accuracy: "Percentage of correct characters typed",
    time: "Time taken to type all words",
  };

  useEffect(() => {
    if (gameCompleted) {
      // Obtain stats
      const storeAccuracy = useWordsStore.getState().getAccuracy();
      const storeErrors = useWordsStore.getState().errors;
      const storeElapsedTime = useWordsStore.getState().getElapsedTime(); // Get time for standard mode
      const storeGrossWPM = useWordsStore.getState().getGrossWPM();
      const storeNetWPM = useWordsStore.getState().getNetWPM();
      const storeScore = useWordsStore.getState().getScore();

      if (!obtainedStats) {
        setFrozenStats({
          netWPM: storeNetWPM,
          grossWPM: storeGrossWPM,
          accuracy: storeAccuracy,
          score: storeScore,
          errors: storeErrors,
          elapsedTime: storeElapsedTime,
        });
        setObtainedStats(true);
      }

      // Reset game on space press
      const handleKeyDown = (event) => {
        if (gameCompleted && event.key == "Enter") {
          event.preventDefault();
          event.stopPropagation(); // Prevents this from getting inputted into the next game
          resetGame(numWords);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [gameCompleted]);

  // Update if there were any new PBs or Above Averages
  useEffect(() => {
    if (res) {
      setPbWpm(res.pbWpm);
      setAaWpm(res.aaWpm);
      setPbAccuracy(res.pbAccuracy);
      setAaAccuracy(res.aaAccuracy);
      setPbScore(res.pbScore);
      setAaScore(res.aaScore);
    }
  }, [res]);

  // Update to show confetti if there were new PBs
  useEffect(() => {
    if (pbWpm || pbAccuracy || pbScore) {
      setIsNewPb(true);
    }
  }, [pbWpm, pbAccuracy, pbScore]);

  const mode = useWordsStore((state) => state.mode);

  // Mutation to post stats to the STANDARD API
  const postStatsStandard = usePostStatsStandard();
  const postStatsStandardGame = usePostStatsStandardGame();
  const postStatsTimed = usePostStatsTimed();
  const postStatsTimedGame = usePostStatsTimedGame();

  // Send stats once a game is completed
  useEffect(() => {
    if (obtainedStats && !sentData) {
      // Send stats to statistics route
      const postStatsData = async () => {
        try {
          const stats = {
            wpm: frozenStats.netWPM,
            accuracy: frozenStats.accuracy,
            score: frozenStats.score,
          };
          // console.log("submitting standard data; ", stats);
          const response =
            mode == gameModes.STANDARD // MODE : STANDARD
              ? await postStatsStandard.mutateAsync(stats)
              : mode == gameModes.TIMED // MODE : TIMED
              ? await postStatsTimed.mutateAsync(stats)
              : null;
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
            wpm: frozenStats.netWPM,
            accuracy: frozenStats.accuracy,
            errors: frozenStats.errors,
            score: frozenStats.score,
          };
          const response =
            mode == gameModes.STANDARD // MODE : STANDARD
              ? await postStatsStandardGame.mutateAsync(stats)
              : mode == gameModes.TIMED // MODE : TIMED
              ? await postStatsTimedGame.mutateAsync(stats)
              : null;
        } catch (error) {
          console.log(error);
          setIsLoading(false); // User is not logged in, show the stats obtained
        }
      };
      postGameData();
      setSentData(true);
    }
  }, [obtainedStats]);

  return (
    // (!isLoading && (
    <div className="flex flex-col items-center  ">
      {isNewPb && <ConfettiExplosion particleCount={150} duration={3000} />}
      {/* Stats */}
      <div className="flex flex-col w-[600px] h-[325px] text-2xl">
        {/* Mode */}
        <div className="flex justify-center text-gray-400">
          Mode:
          <div className="text-yellow-400 ml-2"> {mode.toUpperCase()} </div>
        </div>
        {/* Row 1 */}
        <div className="flex justify-between h-1/2">
          <StatInfo
            header={"Net WPM"}
            stat={frozenStats.netWPM}
            pbWpm={pbWpm}
            aaWpm={aaWpm}
            headerDesc={headerDescriptions.netwpm}
            startedTyping={startedTyping}
          />
          <StatInfo
            header={"Score"}
            stat={frozenStats.score}
            pbScore={pbScore}
            aaScore={aaScore}
            headerDesc={headerDescriptions.score}
            startedTyping={startedTyping}
          />
          <StatInfo
            header={"Accuracy"}
            stat={`${(frozenStats.accuracy * 100).toFixed(0)}%`}
            pbAccuracy={pbAccuracy}
            aaAccuracy={aaAccuracy}
            headerDesc={headerDescriptions.accuracy}
            startedTyping={startedTyping}
          />
        </div>
        {/* Row 2 */}
        <div className="flex justify-center h-1/2">
          <StatInfo
            header={"Raw WPM"}
            stat={frozenStats.grossWPM}
            headerDesc={headerDescriptions.rawwpm}
            startedTyping={startedTyping}
          />
          <StatInfo
            header={"Errors"}
            stat={frozenStats.errors}
            headerDesc={headerDescriptions.errors}
            startedTyping={startedTyping}
          />
          <StatInfo
            header={"Time"}
            stat={`${frozenStats.elapsedTime}s`}
            headerDesc={headerDescriptions.time}
            startedTyping={startedTyping}
          />
        </div>
      </div>
      {/* Word History */}
      <div className="mt-4">
        <WordHistory allTypedWords={allTypedWords} wordsToType={wordsToType} />
      </div>
      {/* Enter to start game  */}
      <div className="mt-6">
        <Instruction button={"enter"} desc={"start new game"} />
      </div>
    </div>
    // )) || <DelayedLoadingDefault />
  );
};

export default StatsBox;
