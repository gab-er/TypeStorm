import Link from "next/link";
import Image from "next/image";

const Logo = ({ width, height }) => {
  return (
    <Image
      src={`/images/TypeStormLogoLight.png`}
      alt="TypeStorm"
      width={width}
      height={height}
      priority={true}
    ></Image>
  );
};

export default Logo;
