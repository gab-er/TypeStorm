import useWordsStore from "@/app/stores/useWordsStore";

const ModeButton = ({ desc, changeMode }) => {
  let selected = "text-secondary";
  const mode = useWordsStore((state) => state.mode);

  if (desc.toLowerCase() === mode.toLowerCase()) {
    // The current button chosen will become highlighted
    selected = "text-selected";
  }

  return (
    <button
      variant="contained"
      size="medium"
      color="primary"
      onClick={changeMode}
      className="rounded-xl"
    >
      <div className={`text-xl ${selected} hover:text-hover`}> {desc} </div>
    </button>
  );
};

export default ModeButton;
