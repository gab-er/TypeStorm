import ChallengeList from "../components/Challenge/ChallengeList";

export const metadata = {
  title: "Challenges",
};

const challenge = () => {
  return (
    <div className="">
      <div className="flex justify-center mt-10 text-2xl cursor-default">
        {" "}
        Pick a challenge{" "}
      </div>
      <div className="flex justify-center">
        <ChallengeList />
      </div>
    </div>
  );
};

export default challenge;
