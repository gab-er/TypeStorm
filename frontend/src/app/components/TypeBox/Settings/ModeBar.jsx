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
    <div className="select-none gap-2 w-100 flex rounded-xl text-xl pl-2 text-gray-500">
      <span> modes | </span>
      <ModeButton desc={"standard"} changeMode={() => changeMode(gameModes.STANDARD)} />
      <ModeButton desc={"timed"} changeMode={() => changeMode(gameModes.TIMED)} />
      <ModeButton desc={"practice"} changeMode={() => changeMode(gameModes.PRACTICE)} />
    </div>
  );
};

export default ModeBar;
