import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Animation from "../Animation";

const StatInfo = ({
  header,
  stat,
  pbWpm,
  aaWpm,
  pbAccuracy,
  aaAccuracy,
  headerDesc,
  statDesc,
  pbScore,
  aaScore,
}) => {
  const [textColor, setTextColor] = useState("text-white");
  const [emoji, setEmoji] = useState("");
  const [achievement, setAchievement] = useState(null);
  const [hasNewPb, setHasNewPb] = useState(false);

  useEffect(() => {
    if (header == "Errors" && stat > 0) {
      setTextColor("text-red-400");
    }

    // Set displays for new PB
    if (pbWpm || pbAccuracy || pbScore) {
      setTextColor("text-yellow-400");
      setEmoji("🎉");
      setAchievement("(New Personal Best!)");
      setHasNewPb(true);
    } else if (aaWpm || aaAccuracy || aaScore) {
      setTextColor("text-green-400");
      setAchievement("(Above Your Average!)");
    }
  }, [stat, pbWpm, pbAccuracy, pbScore, aaWpm, aaAccuracy, aaScore]);

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center">
      <div className="absolute top-0 text-sm text-gray-400 mt-[1.5em] w-full h-[20px] flex justify-center">
        <Animation
          id="achievement"
          visible={achievement}
          animationDuration={0.7}
        >
          {achievement}
        </Animation>
      </div>
      <div className="text-gray-400 w-full flex justify-center">
        <Tooltip
          title={<Typography fontSize="1rem"> {headerDesc} </Typography>}
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
          <div className="flex justify-center items-top">
            <Animation
              id="emoji1"
              visible={hasNewPb}
              animationDuration={0.7}
              positioning="flex"
            >
              <div className=""> {emoji} </div>
            </Animation>
            <strong> {header} </strong>
            <Animation
              id="emoji2"
              visible={hasNewPb}
              animationDuration={0.7}
              positioning="flex"
            >
              <div className=""> {emoji} </div>
            </Animation>
          </div>
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
          {String(stat)}
        </Tooltip>
      </div>
    </div>
  );
};

export default StatInfo;
