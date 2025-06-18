import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";

const WordsTyped = ({ typedText, allTypedWords }) => {
  return (
    <div className="flex flex-col flex-wrap w-[1200px] items-center text-2xl text-gray-400">
      <Tooltip
        title={<Typography> Number of Words that you typed </Typography>}
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
        <strong>Words Typed - {allTypedWords.length} </strong>
      </Tooltip>
      <div className="text-white">{typedText}</div>
    </div>
  );
};

export default WordsTyped;
