import ModeButton from "./ModeButton";
import useWordsStore from "@/app/stores/useWordsStore";

const ModeBar = ({ inputRef }) => {
  const changeMode = (str) => {
    useWordsStore.getState().setMode(str); // Change the mode inside the store
    // Refocus the input box
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="gap-2 flex items-center rounded-xl text-xl bg-gray-700 pl-2">
      <p> Modes: </p>
      <ModeButton
        desc={"Standard"}
        changeMode={() => changeMode("standard")}
      />
      <ModeButton
        desc={"Timed"}
        changeMode={() => changeMode("timed")}
      />
      <ModeButton
        desc={"Practice"}
        changeMode={() => changeMode("practice")}
      />

    </div>
  );
};

export default ModeBar;
