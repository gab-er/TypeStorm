import React from "react";

const ChallengeBox = ({ index, challenge }) => {
  return (
    <div className="cursor-default flex justify-left items-center h-10 text-xl rounded-sm pl-2 pr-2 hover:text-hover text-primary w-150 justify-center">
      {challenge.title}
    </div>
  );
};

export default ChallengeBox;
