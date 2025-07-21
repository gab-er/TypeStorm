"use client";

import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import useWordsStore from "@/app/stores/useWordsStore";

const ColorModeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const inputRef = useWordsStore((state) => state.inputRef);

  const handleClick = (theme) => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus(); // Focus the input box so user can continue typing after pressing the button
    }
  };

  return (
    <>
      <button
        tabIndex="-1"
        onClick={() => handleClick(resolvedTheme)}
        className="bg-white-200 text-2xl"
      >
        {resolvedTheme == "light" && (
          // Show the opposite icon
          <FontAwesomeIcon
            icon={faMoon}
            className="text-primary hover:text-hover w-6"
          />
        )}
        {resolvedTheme == "dark" && (
          // Show the opposite icon
          <FontAwesomeIcon
            icon={faSun}
            className="text-primary hover:text-hover w-6"
          />
        )}
      </button>
    </>
  );
};

export default ColorModeButton;
