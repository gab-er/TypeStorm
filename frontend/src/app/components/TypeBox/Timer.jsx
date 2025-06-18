import useTimedStore from "@/app/stores/useTimedStore";
import { useEffect } from "react";
import { Progress } from "@material-tailwind/react";

const Timer = () => {
  // Obtain the store functions and states
  const timeLeft = useTimedStore((state) => state.timeLeft);
  const setTimeLeft = useTimedStore((state) => state.setTimeLeft);
  const timerActive = useTimedStore((state) => state.timerActive);
  const setTimerActive = useTimedStore((state) => state.setTimerActive);

  useEffect(() => {
    // If timer is not active, don't do anything
    if (!timerActive) {
      return;
    }
    console.log("started the timed timer");

    const interval = setInterval(() => {
      const timeLeft = useTimedStore.getState().timeLeft;
      if (timeLeft <= 1) {
        setTimeLeft(timeLeft - 1);
        clearInterval(interval);
        setTimerActive(false);
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  return <div className="text-xl"> {timeLeft} </div>;
};

export default Timer;
