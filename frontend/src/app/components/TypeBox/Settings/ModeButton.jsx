import { Button, IconButton } from "@mui/material";
import useWordsStore from "@/app/stores/useWordsStore";

const ModeButton = ({ desc, changeMode }) => {
  let selected = "text-gray-500";
  const mode = useWordsStore((state) => state.mode);

  if (desc.toLowerCase() === mode.toLowerCase()) {
    // The current button chosen will become highlighted
    selected = "text-white";
  }

  return (
    <div className={` ${selected} rounded-xl`}>
      <button
        variant="contained"
        size="medium"
        color="primary"
        onClick={changeMode}
      >
        <div className={`text-xl ${selected} hover:text-white`}> {desc} </div>
      </button>
    </div>
  );
};

export default ModeButton;
