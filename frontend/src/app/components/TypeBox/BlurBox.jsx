import React from "react";
import Image from "next/image";

const BlurBox = () => {
  return (
    <div className="select-none flex justify-center items-center text-center cursor-default w-[1000px] h-[200px] text-xl">
      <Image
        src={`/cursor.svg`}
        alt="TypeStorm"
        width={40}
        height={40}
        priority={true}
        className="select-none"
      ></Image>
      Click here to continue typing...
    </div>
  );
};

export default BlurBox;
