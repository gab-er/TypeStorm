"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ColorModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="text-primary background-primary"
    >
      <option value="system" className="text-primary">
        System
      </option>
      <option value="dark" className="text-primary">
        Dark
      </option>
      <option value="light" className="text-primary">
        Light
      </option>
    </select>
  );
};

export default ColorModeToggle;
