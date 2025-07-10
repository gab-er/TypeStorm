import challenges from "@/lib/challenges";
import ChallengeWrapper from "@/app/components/Challenge/ChallengeWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default async function ChallengeID({ params }) {
  const { id } = await params;
  const challengeText = challenges[id].text;
  const challengeDescription = challenges[id].description;

  return (
    <>
      <div className="relative flex justify-start items-center">
        <Link href="/challenges">
          <div className="absolute flex mt-2 text-gray-600 hover:text-white cursor-default ml-55 items-center gap-2 text-xl">
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </div>
        </Link>
      </div>
      <div className="relative">
        <div className="cursor-default absolute w-full flex justify-center mt-10 text-xl translate-x-[-40px]">
          {challengeDescription}
        </div>
      </div>
      {/* // This wrapper will set the mode of the game, and allows this page to continue being a server component */}
      <ChallengeWrapper words={challengeText} challengeId={id} />
    </>
  );
}
