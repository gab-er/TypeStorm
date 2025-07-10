import useStatStore from "../../stores/useStatStore";
import { Button, IconButton } from "@mui/material";

const StatisticButtons = () => {
  // get gamemode and setgamemode from gamestore
  const gamemode = useStatStore((state) => state.gamemode);
  const setGamemode = useStatStore((state) => state.setGamemode);
  const unselectedStyle = "text-gray-500 hover:text-white";
  const selectedStyle = "text-white ";

  return (
    <div className="flex mx-auto p-4  h-auto  w-7/10 min-w-100">
      <div className="select-none gap-2 w-100 flex rounded-xl text-xl pl-2 text-gray-500 justify-center items-center">
        <span> modes | </span>
        {/*Buttons set gamemode on click*/}
        <button
          variant="contained"
          size="medium"
          color="primary"
          className={gamemode == "STANDARD" ? selectedStyle : unselectedStyle}
          onClick={() => {
            setGamemode("STANDARD");
          }}
        >
          {" "}
          standard{" "}
        </button>
        <button
          className={gamemode == "TIMED" ? selectedStyle : unselectedStyle}
          onClick={() => {
            setGamemode("TIMED");
          }}
        >
          {" "}
          timed{" "}
        </button>
        <button
          className={gamemode == "CHALLENGE" ? selectedStyle : unselectedStyle}
          onClick={() => {
            setGamemode("CHALLENGE");
          }}
        >
          {" "}
          challenge{" "}
        </button>
      </div>
    </div>
  );
};

export default StatisticButtons;
