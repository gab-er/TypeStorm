import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";

const WordHistory = ({ allTypedWords, wordsToType }) => {
  // AllTypedWords is an array of the words typed

  // Compare this against the original correct words wordstoType
  // Note the correct words has an extra space at the end
  const allTypedLetters = allTypedWords.join("").split("").flat(); // Array of all letters typed
  const allCorrectLetters = wordsToType
    .slice(0, allTypedWords.length)
    .join("")
    .split("")
    .flat(); // Array of all correct letters to type

  return (
    <div className="flex flex-col flex-wrap w-[1200px] items-center text-2xl text-gray-400">
      <Tooltip
        title={
          <Typography>
            {" "}
            Hover over the letters to see what you typed!{" "}
          </Typography>
        }
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
        <strong> {`Word History - ${allTypedWords.length} words`.toLowerCase()} </strong>
      </Tooltip>
      <div>
        {allCorrectLetters.map((letter, index) => {
          let color = "text-white";
          if (allCorrectLetters[index] !== allTypedLetters[index]) {
            color = "text-red-400";
          }
          return (
            <span key={index} className={`${color} cursor-pointer`}>
              <Tooltip
                title={<Typography> {allTypedLetters[index]} </Typography>}
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
                {letter}
              </Tooltip>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordHistory;
