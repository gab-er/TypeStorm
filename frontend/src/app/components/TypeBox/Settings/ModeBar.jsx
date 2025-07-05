import ModeButton from "./ModeButton";
import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";

const ModeBar = ({ inputRef }) => {
  const changeMode = (str) => {
    useWordsStore.getState().setMode(str); // Change the mode inside the store
    // Refocus the input box
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    // bg-gray-800
    <div className="gap-2 flex items-center rounded-xl text-xl pl-2 justify-between">
      <p> Modes: </p>
      <ModeButton desc={"Standard"} changeMode={() => changeMode(gameModes.STANDARD)} />
      <ModeButton desc={"Timed"} changeMode={() => changeMode(gameModes.TIMED)} />
      <ModeButton desc={"Practice"} changeMode={() => changeMode(gameModes.PRACTICE)} />
    </div>
  );
};

export default ModeBar;
