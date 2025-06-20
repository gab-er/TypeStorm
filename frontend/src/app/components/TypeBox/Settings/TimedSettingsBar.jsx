import useTimedStore from "@/app/stores/useTimedStore";
import TimeNumberButton from "./TimeNumberButton";

const TimedSettingsBar = ({ inputRef }) => {
  const setTimeLimit = useTimedStore((state) => state.setTimeLimit);

  const changeTime = (num) => {
    setTimeLimit(num);
    // Refocus the input box
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="gap-2 flex items-center rounded-xl text-xl bg-gray-700 pl-2 justify-between">
      <p> Times: </p>
      <TimeNumberButton num={10} changeTime={() => changeTime(10)} />
      <TimeNumberButton num={20} changeTime={() => changeTime(20)} />
      <TimeNumberButton num={30} changeTime={() => changeTime(30)} />
      <TimeNumberButton num={45} changeTime={() => changeTime(45)} />
      <TimeNumberButton num={60} changeTime={() => changeTime(60)} />
    </div>
  );
};

export default TimedSettingsBar;
