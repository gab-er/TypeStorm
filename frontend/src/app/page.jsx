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
        <div className="absolute w-full translate-x-[460px] flex mt-5">
          <TypingTip isCycling={true} />
        </div>
      </div>
      {/* ml-185 */}
      <div className="mt-45 flex justify-center">
        <TypeBox />
      </div>
    </>
  );
}
