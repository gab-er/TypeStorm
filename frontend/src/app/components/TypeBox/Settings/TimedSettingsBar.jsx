import useTimedStore from "@/app/stores/useTimedStore";
import TimeNumberButton from "./TimeNumberButton";
import CustomButton from "./CustomButton";

const TimedSettingsBar = ({ setFocus, inputRef }) => {
  const setTimeLimit = useTimedStore((state) => state.setTimeLimit);

  const changeTime = (num) => {
    setTimeLimit(num);
    // Refocus the input box
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    // bg-gray-800
    <div className="select-none gap-2 flex items-center rounded-xl pl-2 text-xl text-gray-500">
      <p> times | </p>
      <TimeNumberButton num={10} changeTime={() => changeTime(10)} />
      <TimeNumberButton num={20} changeTime={() => changeTime(20)} />
      <TimeNumberButton num={30} changeTime={() => changeTime(30)} />
      <TimeNumberButton num={45} changeTime={() => changeTime(45)} />
      <TimeNumberButton num={60} changeTime={() => changeTime(60)} />
      <CustomButton
        setFocus={setFocus}
        inputRef={inputRef}
        changeTime={changeTime}
      />
    </div>
  );
};

export default TimedSettingsBar;
