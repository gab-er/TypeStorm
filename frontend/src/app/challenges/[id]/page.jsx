import challenges from "@/lib/challenges";
import ChallengeWrapper from "@/app/components/Challenge/ChallengeWrapper";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  if (challenges[id]) {
    const challengeTitle = challenges[id].title;
    const challengeDescription = challenges[id].description;
    return {
      title: `${challengeTitle}`,
      description: `${challengeDescription}`,
    };
  }
}

export async function generateStaticParams() {
  // Pregenerate the static parameters that this page will take in -> better for SEO
  // Must return an array of objects, where each object has an attribute that corresponds to the url [id]
  return challenges.map((_, index) => ({
    id: index.toString(),
  }));
}

export default async function ChallengeID({ params }) {
  const { id } = await params;

  if (!challenges[id]) {
    notFound();
  } else {
    const challengeText = challenges[id].text;
    const challengeDescription = challenges[id].description;

    return (
      <>
        <div className="relative flex justify-start items-center">
          <Link href="/challenges">
            <div className="absolute flex mt-2 text-primary cursor-default items-center gap-2 text-xl justify-center w-full translate-x-[-40px]">
              <div className="hover:text-hover ">
                <FontAwesomeIcon icon={faArrowLeft} size="xl" />
              </div>
            </div>
          </Link>
        </div>
        <div className="relative">
          <div className="cursor-default absolute w-full flex justify-center mt-10 text-xl translate-x-[-40px] text-selected">
            {challengeDescription}
          </div>
        </div>
        {/* // This wrapper will set the mode of the game, and allows this page to continue being a server component */}
        <ChallengeWrapper words={challengeText} challengeId={id} />
      </>
    );
  }
}
