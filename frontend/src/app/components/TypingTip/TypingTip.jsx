"use client";
import useTipStore from "@/app/stores/useTipStore";
import { useEffect } from "react";
import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";
import Animation from "../Animation";

const TypingTip = ({ isCycling }) => {
  const displayTip = useTipStore((state) => state.displayTip);
  const initialize = useTipStore((state) => state.initialize);
  const cycleTip = useTipStore((state) => state.cycleTip);
  const mode = useWordsStore((state) => state.mode);
  const tips = useTipStore((state) => state.tips);

  useEffect(() => {
    initialize();
  }, []);

  if (isCycling) {
    useEffect(() => {
      const cycleInterval = setInterval(() => cycleTip(), 30000);
      return () => {
        clearInterval(cycleInterval);
      };
    }, []);
  }

  return (
    // Only show tips when the mode is on PRACTICE
    <Animation id="typingtips" visible={mode == gameModes.PRACTICE}>
      <div className="flex flex-col text-center text-xl opacity-95 w-200">
        <div> Tip: </div>
        <div> {displayTip}</div>
      </div>
    </Animation>
  );
};

export default TypingTip;
