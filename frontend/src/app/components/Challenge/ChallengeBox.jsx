import React from "react";

const ChallengeBox = ({ index, challenge }) => {
  return (
    <div className="flex justify-left items-center h-10 text-xl bg-gray-800 rounded-sm pl-2 pr-2 hover:bg-gray-700 w-150">
      {challenge.title}
    </div>
  );
};

export default ChallengeBox;
