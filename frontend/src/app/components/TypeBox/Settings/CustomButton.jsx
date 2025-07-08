"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect, useRef } from "react";
import Animation from "../../Animation";
import { wordsData } from "@/lib/words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";
import useTimedStore from "@/app/stores/useTimedStore";

const CustomButton = ({
  numWords,
  setNumWords,
  setFocus,
  inputRef,
  changeTime,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  let [inputValue, setInputValue] = useState("");
  let [color, setColor] = useState("text-gray-500");
  const customInputRef = useRef(null);
  const mode = useWordsStore((state) => state.mode);
  const timeLimit = useTimedStore((state) => state.timeLimit);

  const defaultStandardNumbers = [10, 25, 50, 75, 100]; // The default options in the standard settings bar
  const defaultTimedNumbers = [10, 20, 30, 45, 60]; // The default options in the timed settings bar

  // Standard mode highlight
  useEffect(() => {
    if (mode === gameModes.STANDARD) {
      const shouldHighlight = !defaultStandardNumbers.includes(numWords);
      setColor(shouldHighlight ? "text-white" : "text-gray-500");
    }
  }, [numWords, mode]);

  // Timed mode highlight
  useEffect(() => {
    if (mode === gameModes.TIMED) {
      const shouldHighlight = !defaultTimedNumbers.includes(timeLimit);
      setColor(shouldHighlight ? "text-white" : "text-gray-500");
    }
  }, [timeLimit, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue && !isNaN(inputValue) && mode == gameModes.STANDARD) {
      setNumWords(Math.min(wordsData.length, Number(inputValue))); // Prevent it from exceeding the total words data count
    }

    if (inputValue && !isNaN(inputValue) && mode == gameModes.TIMED) {
      changeTime(Number(inputValue)); // Must convert the value to a number as the input field submits a string
    }
    setIsOpen(false);
  };

  useEffect(() => {
    // Auto focus the input field
    if (isOpen) {
      const timer = setTimeout(() => {
        if (customInputRef.current) {
          customInputRef.current.focus();
        }
      }, 10); // Small delay to ensure Dialog is fully open -> Headless UI messes with the focus without this delay
      return () => clearTimeout(timer);
    }

    if (!isOpen) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
        setFocus(true);
      }, 10); // Small delay to ensure Dialog is fully closed -> Headless UI messes with the focus without this delay
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="select-none">
      <button
        className={`${color} hover:text-white select-none focus:outline-none focus:ring-0 focus:border-transparent`}
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faGear} />
      </button>
      <Dialog
        static
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex justify-center focus:outline-none focus:ring-0 focus:border-transparent"
      >
        <Animation visible={isOpen}>
          <div className="flex justify-center mt-69 w-100 mr-120 select-none">
            <form onSubmit={handleSubmit} className="flex justify-center">
              <input
                ref={customInputRef}
                value={inputValue}
                className="bg-gray-500 focus:outline-none focus:ring-0 focus:border-transparent w-34 rounded-lg px-2"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="custom number"
              ></input>
              <button type="submit" hidden /> {/* Hidden submit button */}
            </form>
          </div>
        </Animation>
      </Dialog>
    </div>
  );
};

export default CustomButton;
