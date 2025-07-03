"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import challenges from "@/lib/challenges";

const ChallengeList = () => {
  const fetchData = () => {};
  return (
    <InfiniteScroll
      dataLength={challenges.length} //This is important field to render the next data
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {challenges.map((num, index) => {
        return (
          <div className="flex flex-col w-1/2 border" key={index}>
            <Link href={`/challenges/${index}`}>
              Challenge {index}
            </Link>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};

export default ChallengeList;
