"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import challenges from "@/lib/challenges";
import ChallengeBox from "./ChallengeBox";
import { useState } from "react";

const ChallengeList = () => {
  const [end, setEnd] = useState(20); // Start with 20 items
  const [currentChallenges, setCurrentChallenges] = useState(
    challenges.slice(0, 20)
  );

  const fetchData = () => {
    // simulate loading delay
    // setTimeout(() => {
    const newEnd = end + 20;
    setCurrentChallenges(challenges.slice(0, newEnd));
    setEnd(newEnd);
    // }, 500); // 0.5s delay
  };

  return (
    <InfiniteScroll
      dataLength={currentChallenges.length} //This is important field to render the next data
      next={fetchData} // This function wil be called once the end of the current scroll is reached. It should update the data
      hasMore={end < challenges.length} // Determines if the end of the infinite scroll has been reached
      loader={<div className="flex justify-center"> Loading... </div>}
      endMessage={<div className="flex justify-center text-xl mt-1"> End </div>}
    >
      {currentChallenges.map((challenge, index) => {
        return (
          <div className="flex flex-col justify-center mt-2 " key={index}>
            <Link href={`/challenges/${index}`}>
              <ChallengeBox index={index} challenge={challenge} />
            </Link>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};

export default ChallengeList;
