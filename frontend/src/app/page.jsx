import TypeBox from "./components/TypeBox/TypeBox";
import TypingTip from "./components/TypingTip/TypingTip";

export const metadata = {
  title: "TypeStorm",
};

export default async function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute w-full flex justify-center mt-5">
          <TypingTip isCycling={true} />
        </div>
      </div>
      <div className="flex mt-45 justify-center">
        <TypeBox />
      </div>
    </>
  );
}
