"use client";

import { useEffect } from "react";
import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";
import TypeBox from "@/app/components/TypeBox/TypeBox";

export default function ChallengeWrapper({ words }) {
  const setMode = useWordsStore((state) => state.setMode);

  useEffect(() => {
    // Sets mode to CHALLENGE on component mount 
    setMode(gameModes.CHALLENGE);

    // Sets mode to STANDARD on component unmount 
    return () => {
      setMode(gameModes.STANDARD);
    };
  }, []);

  return (
    <div className="flex mt-45 justify-center">
      <TypeBox words={words} />
    </div>
  );
}
