import Word from "./Word";
import { useRef } from "react";
import { motion } from "framer-motion";
import Caret from "./Caret";

const DisplayBox = ({
  currentLetter,
  typedWords,
  focus,
  WORDS_PER_LINE,
  visibleLines,
  updateCaretRef,
  caretPos,
  startedTyping,
}) => {
  // Ref for the whole DisplayBox container
  const displayBoxRef = useRef();

  // Global ID for the caret to keep track of what position to be in
  // Just counting the number of letters up to that point
  const globalIdRef = useRef(0);
  globalIdRef.current = 0;
  const blur = focus ? "" : "blur-xs";

  // Create a Word component from each word
  return (
    <>
      <div
        className="relative w-[1000px] h-[200px] flex flex-col"
        ref={displayBoxRef}
      >
        {/* Caret - Blinks if the user has not started typing*/}
        {focus && (
          <motion.div
            className={`absolute translate-x-[-3px] ${blur}`}
            // initial={false} // Uncomment to remove the spring from the top left on render 
            animate={{
              x: caretPos.x,
              y: caretPos.y,
              opacity: startedTyping ? 1 : [1, 0, 1],
            }}
            transition={{
              x: { type: "spring", stiffness: 600, damping: 50 },
              y: { type: "spring", stiffness: 600, damping: 50 },
              opacity: startedTyping // Blink if not started typing
                ? { duration: 0 }
                : { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Caret startedTyping={startedTyping} />
          </motion.div>
        )}

        {visibleLines.map((line, i) => (
          // Each individual line
          <div key={i} className="flex justify-left h-1/3 items-center ml-2">
            {line.map((word, index) => (
              <Word
                key={index}
                word={word}
                typedWord={typedWords[index + WORDS_PER_LINE * i]}
                globalIdRef={globalIdRef}
                currentLetter={currentLetter}
                focus={focus}
                updateCaretRef={updateCaretRef}
                displayBoxRef={displayBoxRef}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayBox;
