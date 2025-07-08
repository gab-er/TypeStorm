import TypeBox from "./components/TypeBox/TypeBox";
import TypingTip from "./components/TypingTip/TypingTip";

export const metadata = {
  title: "TypeStorm",
  description: "Improve your typing skills with our website!",
};

export default async function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute w-200 translate-x-[460px] flex mt-5">
          <TypingTip isCycling={true} />
        </div>
      </div>
      <div className="mt-45 flex justify-center">
        <TypeBox />
      </div>
    </>
  );
}
