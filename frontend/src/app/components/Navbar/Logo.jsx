"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = ({ width, height }) => {
  const { theme, setTheme } = useTheme();
  const [logoUrl, setLogoUrl] = useState(
    `/images/TypeStormLogoWhiteYellow.png`
  );

  useEffect(() => {
    if (theme) {
      if (theme.toLowerCase() == "dark") {
        setLogoUrl(`/images/TypeStormLogoWhiteYellow.png`);
      } else if (theme.toLowerCase() == "light") {
        setLogoUrl(`/images/TypeStormLogoBlackDarkBlue.png`);
      }
    }
  }, [theme]);
  return (
    <Image
      src={`${logoUrl}`}
      alt="TypeStorm"
      width={width}
      height={height}
      priority={true}
      className="select-none"
    ></Image>
  );
};

export default Logo;
