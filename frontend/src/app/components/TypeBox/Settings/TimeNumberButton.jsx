import { Button, IconButton } from "@mui/material";
import useTimedStore from "@/app/stores/useTimedStore";
import { useState, useEffect } from "react";

const TimeNumberButton = ({ num, changeTime }) => {
  const timeLimit = useTimedStore((state) => state.timeLimit);
  const [color, setColor] = useState("text-gray-500");

  useEffect(() => {
    if (num === timeLimit) {
      // The current button chosen will become highlighted
      setColor("text-white");
    } else {
      setColor("text-gray-500");
    }
  }, [timeLimit]);

  return (
    <div className={`rounded-xl`}>
      <button onClick={changeTime}>
        <div className={`${color} text-xl hover:text-white`}> {num} </div>
      </button>
    </div>
  );
};

export default TimeNumberButton;
