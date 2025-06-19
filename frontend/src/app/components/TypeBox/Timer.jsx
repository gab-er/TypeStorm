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

  return (
    <div>
      <CountdownCircleTimer
        key={startedTyping} // Resets whenever "startedTyping" changes
        isPlaying={timerActive}
        duration={timeLimit}
        colors={["#99a1af"]}
        trailColor={"#1E1F25"}
        // colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          return { shouldRepeat: false, delay: 2 };
        }}
        size={130}
      >
        {({ remainingTime }) => <div className="text-3xl"> {remainingTime}s </div>}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
