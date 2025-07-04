import challenges from "@/lib/challenges";
import ChallengeWrapper from "@/app/components/Challenge/ChallengeWrapper";

export default async function ChallengeID({ params }) {
  const { id } = await params;
  const challengeText = challenges[id].text;
  const challengeDescription = challenges[id].description;

  // This wrapper will set the mode of the game, and allows this page to continue being a server component
  return (
    <>
      <div className="relative">
        <div className="absolute w-full flex justify-center mt-10 text-xl">
          {challengeDescription}
        </div>
      </div>
      <ChallengeWrapper words={challengeText} />
    </>
  );
}
