import useTimedStore from "@/app/stores/useTimedStore";
import { useEffect } from "react";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Timer = ({ startedTyping }) => {
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
    // text-[#7c86ff]
    <div className="text-3xl select-none flex gap-2 text-selected">
      <FontAwesomeIcon icon={faHourglassEnd} className="text-[var(--caretcolor)] " /> {timeLeft}
    </div>
  );
};

export default Timer;
