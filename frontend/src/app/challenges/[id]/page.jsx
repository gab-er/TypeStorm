import challenges from "@/lib/challenges";
import ChallengeWrapper from "@/app/components/Challenge/ChallengeWrapper";

export default async function ChallengeID({ params }) {
  const { id } = await params;

  // This wrapper will set the mode of the game, and allows this page to continue being a server component
  return <ChallengeWrapper words={challenges[id]} />;
}
