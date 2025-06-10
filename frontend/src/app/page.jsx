import TypeBox from "./components/TypeBox/TypeBox";
import StatsBox from "./components/StatsBox";

export const metadata = {
  title: "TypeStorm",
};

export default async function Home() {
  return (
    <>
      <TypeBox />
    </>
  );
}
