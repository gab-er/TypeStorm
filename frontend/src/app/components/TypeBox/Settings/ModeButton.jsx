import { Button, IconButton } from "@mui/material";
import useWordsStore from "@/app/stores/useWordsStore";

const ModeButton = ({ desc, changeMode }) => {
  let selected = "";
  const mode = useWordsStore((state) => state.mode);

  if (desc.toLowerCase() === mode.toLowerCase()) {
    // The current button chosen will become highlighted
    selected = "bg-gray-800";
  }

  return (
    <div className={` ${selected} rounded-xl`}>
      <IconButton
        variant="contained"
        size="medium"
        color="primary"
        onClick={changeMode}
      >
        <div className="text-xl text-white"> {desc} </div>
      </IconButton>
    </div>
  );
};

export default ModeButton;
