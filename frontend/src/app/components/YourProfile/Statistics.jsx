import React from 'react'
import StatisticButtons from './StatisticButtons';
import StatisticDisplay from './StatisticDisplay';

const Statistics = () => {
  return (
        <>
                <h1 className='text-white-700 text-3xl relative flex mx-auto p-4  h-auto  w-7/10 '>Statistics</h1>
                <StatisticButtons/>
                <StatisticDisplay/>
        </>
    )
}

export default Statistics