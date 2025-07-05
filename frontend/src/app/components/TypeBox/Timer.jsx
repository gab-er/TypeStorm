import useTimedStore from "@/app/stores/useTimedStore";
import { useEffect } from "react";
import { Progress } from "@material-tailwind/react";
import { CircularProgress } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({ startedTyping }) => {
  // Obtain the store functions and states
  const timeLeft = useTimedStore((state) => state.timeLeft);
  const setTimeLeft = useTimedStore((state) => state.setTimeLeft);
  const timerActive = useTimedStore((state) => state.timerActive);
  const setTimerActive = useTimedStore((state) => state.setTimerActive);
  const timeLimit = useTimedStore((state) => state.timeLimit);
  const gray = "#1E1F25";
  const indigo = "#7c86ff";

  useEffect(() => {
    // If timer is not active, don't do anything
    if (!timerActive) {
      return;
    }

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

  return (
    <div>
      <CountdownCircleTimer
        key={startedTyping} // Timer resets whenever "startedTyping" changes
        isPlaying={timerActive}
        duration={timeLimit}
        colors={[indigo]}
        trailColor={"#161821"} // background color
        size={130}
      >
        {({ remainingTime }) => (
          <div className="text-3xl"> {remainingTime}s </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
