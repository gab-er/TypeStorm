import React from "react";
import Image from "next/image";

const BlurBox = () => {
  return (
    <div className="select-none flex justify-center items-center text-center cursor-default w-[1000px] h-[200px] text-xl">
      <Image
        src={`/cursor.svg`}
        alt="TypeStorm"
        width={36}
        height={36}
        priority={true}
        className="select-none"
      ></Image>
      click here to continue typing...
    </div>
  );
};

export default BlurBox;
