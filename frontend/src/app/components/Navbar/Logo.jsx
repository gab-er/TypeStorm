"use client";

import NextImage from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = ({ width, height }) => {
  const { theme, setTheme } = useTheme();
  const [logoUrl, setLogoUrl] = useState(
    `/images/TypeStormLogoWhiteYellow.png`
  );

  useEffect(() => {
    // preload both logo images
    const preloadImages = [
      "/images/TypeStormLogoWhiteYellow.png",
      "/images/TypeStormLogoBlackDarkBlue.png",
    ];

    // get the browser to cache both images
    // avoids the lag on very first toggle
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
    <NextImage
      src={`${logoUrl}`}
      alt="TypeStorm"
      width={width}
      height={height}
      priority={true}
      className="select-none"
    ></NextImage>
  );
};

export default Logo;
