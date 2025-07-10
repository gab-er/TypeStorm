import React from "react";
import StatisticButtons from "./StatisticButtons";
import StatisticDisplay from "./StatisticDisplay";

const Statistics = () => {
  return (
    <>
      <h1 className="text-white-700 text-2xl relative flex mx-auto p-4  h-auto  w-7/10 ">
        statistics
      </h1>
      <StatisticDisplay />
      <StatisticButtons />
    </>
  );
};

export default Statistics;
