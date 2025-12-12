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
  startedTyping,
}) => {
  const [textColor, setTextColor] = useState("text-selected");
  const [emoji, setEmoji] = useState("");
  const [achievement, setAchievement] = useState(null);
  const [hasNewPb, setHasNewPb] = useState(false);

  useEffect(() => {
    if (header.toLowerCase() == "errors" && stat > 0) {
      setTextColor("text-red-400");
    }

    if (header.toLowerCase() == "current ranking" && stat == "#1") {
      setTextColor("text-[var(--caretcolor)]");
    } else if (header == "Ranking" && stat == "#2") {
      setTextColor("text-slate-400");
    } else if (header == "Ranking" && stat == "#3") {
      setTextColor("text-yellow-700");
    }

    // Set displays for new PB
    if (pbWpm || pbAccuracy || pbScore) {
      setTextColor("text-[var(--caretcolor)]");
      setEmoji("🎉");
      setAchievement("(New Personal Best!)".toLowerCase());
      setHasNewPb(true);
    } else if (aaWpm || aaAccuracy || aaScore) {
      setTextColor("text-above-average");
      setAchievement("(Above Your Average!)".toLowerCase());
    }
  }, [stat, pbWpm, pbAccuracy, pbScore, aaWpm, aaAccuracy, aaScore]);

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center cursor-default">
      <div className="top-0 text-sm text-secondary mt-[1.5em] w-full h-[20px] flex justify-center">
        <Animation
          id="achievement"
          visible={achievement}
          animationDuration={0.7}
        >
          {achievement}
        </Animation>
      </div>
      <div className="text-secondary w-full flex justify-center">
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
          <div className="flex justify-center items-top text-2xl">
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

      <div className={`text-4xl ${textColor} cursor-default`}>
        {!startedTyping ? "-" : String(stat)}
      </div>
    </div>
  );
};

export default StatInfo;
