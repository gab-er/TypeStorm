"use client";
import { useState, useEffect, useRef } from "react";
import Animation from "../../Animation";
import { wordsData } from "@/lib/words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faClock,
  faCheck,
  faCross,
} from "@fortawesome/free-solid-svg-icons";
import useWordsStore from "@/app/stores/useWordsStore";
import gameModes from "@/lib/gamemodes";
import useTimedStore from "@/app/stores/useTimedStore";
import { ToastContainer, toast, Bounce } from "react-toastify";

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
  const containerRef = useRef(null); // Ref for the container (button + input)
  const mode = useWordsStore((state) => state.mode);
  const timeLimit = useTimedStore((state) => state.timeLimit);

  const defaultStandardNumbers = [10, 25, 50, 75, 100]; // The default options in the standard settings bar
  const defaultTimedNumbers = [10, 20, 30, 45, 60]; // The default options in the timed settings bar

  const notifySuccess = () => {
    toast.success(
      <div className="flex items-center mr-2">Updated word count</div>
    );
  };

  const notifyError = () => toast.error("Please input a number");

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Auto focus the input field
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue && !isNaN(inputValue) && mode == gameModes.STANDARD) {
      setNumWords(Math.min(wordsData.length, Number(inputValue))); // Prevent it from exceeding the total words data count
      // notifySuccess();
      // SuccessToast();
    } else if (inputValue && !isNaN(inputValue) && mode == gameModes.TIMED) {
      changeTime(Number(inputValue)); // Must convert the value to a number as the input field submits a string
      // notifySuccess();
    } else {
      notifyError();
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex select-none">
        <button
          className={`${color} hover:text-white select-none focus:outline-none focus:ring-0 focus:border-transparent`}
          onClick={() => setIsOpen(true)}
        >
          {/* Custom Icon */}
          {mode == gameModes.STANDARD && <FontAwesomeIcon icon={faHashtag} />}
          {mode == gameModes.TIMED && <FontAwesomeIcon icon={faClock} />}
        </button>
        {/* <Dialog
        static
        open={isOpen}
        onClose={() => setIsOpen(false)}
        // mt-68 ml-121
        className="fixed focus:outline-none focus:ring-0 focus:border-transparent border flex justify-center"
      > */}
        <div
          ref={containerRef}
          className="focus:outline-none focus:ring-0 focus:border-transparent ml-2"
        >
          <Animation visible={isOpen}>
            <div className="flex justify-center select-none">
              <form onSubmit={handleSubmit} className="flex justify-center">
                <input
                  ref={customInputRef}
                  value={inputValue}
                  className="bg-gray-500 focus:outline-none focus:ring-0 focus:border-transparent w-29 rounded-lg px-2 h-6 text-white text-[16px]"
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="custom value"
                ></input>
                <button type="submit" hidden /> {/* Hidden submit button */}
              </form>
            </div>
          </Animation>
        </div>
      </div>
      <div className="absolute"></div>
    </>
  );
};

export default CustomButton;
