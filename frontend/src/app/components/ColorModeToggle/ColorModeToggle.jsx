"use client";

import { useState, useEffect } from "react";
import ColorModeButton from "./ColorModeButton";

const ColorModeToggle = () => {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ColorModeButton />;
};

export default ColorModeToggle;
