import React from 'react'
import StatisticsProvider from './StatisticProvider';
import StatisticButtons from './StatisticButtons';
import StatisticDisplay from './StatisticDisplay';
import FetchStatistics from './FetchStatistics';
import useStatStore from '@/app/stores/useStatStore';

const Statistics = () => {
  
  const isLoading = useStatStore((state) => state.isLoading)
  return (
        <>
            <StatisticsProvider>
                <h1 className='text-white-700 text-3xl relative flex mx-auto p-4  h-auto  w-7/10 '>Statistics</h1>
                <StatisticButtons/>
                <StatisticDisplay/>
            </StatisticsProvider>
        </>
    )
}

export default Statistics