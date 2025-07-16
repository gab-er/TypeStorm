"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const CapsLockWarning = () => {
  const [capsLock, setCapsLock] = useState(false);

  const handleCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCapsLock);

    return () => {
      window.removeEventListener("keydown", handleCapsLock);
    };
  }, []);
  return (
    capsLock && (
      <div className="flex justify-center items-center align-middle">
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            style={{ color: "#FFD43B" }}
            bounce
          />
          <div className="flex text-selected opacity-90 select-none"> Caps Lock is on!</div>
        </div>
      </div>
    )
  );
};

export default CapsLockWarning;
