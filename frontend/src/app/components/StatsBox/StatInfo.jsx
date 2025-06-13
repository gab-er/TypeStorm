import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";

const StatInfo = ({
  header,
  stat,
  pbWpm,
  aaWpm,
  pbAccuracy,
  aaAccuracy,
  headerDesc,
  statDesc,
}) => {
  // Checking if it is the error stat -> shows red if there are > 0 errors
  let textColor =
    header === "Errors" && stat > 0 ? "text-red-400" : "text-blue-400";
  let emoji = "";
  let achievement = "";

  // Set displays for new PB
  if (pbWpm) {
    textColor = "text-yellow-400";
    emoji = "🎉";
    achievement = "(New Personal Best!)";
  } else if (aaWpm) {
    textColor = "text-green-400";
    achievement = "(Above Your Average!)";
  }

  if (pbAccuracy) {
    textColor = "text-yellow-400";
    emoji = "🎉";
    achievement = "(New Personal Best!)";
  } else if (aaAccuracy) {
    textColor = "text-green-400";
    achievement = "(Above Your Average!)";
  }

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center">
      <div className="absolute top-0 text-sm text-gray-400 mt-[1.5em]">
        {achievement}
      </div>
      <div className="text-gray-400">
        <Tooltip
          title={<Typography fontSize="1rem">{headerDesc}</Typography>}
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          {emoji} <strong> {header} </strong> {emoji}
        </Tooltip>
      </div>

      <div className={`text-4xl ${textColor} cursor-pointer`}>
        <Tooltip
          title={<Typography> {statDesc}</Typography>}
          placement="bottom"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          {stat}
        </Tooltip>
      </div>
    </div>
  );
};

export default StatInfo;
