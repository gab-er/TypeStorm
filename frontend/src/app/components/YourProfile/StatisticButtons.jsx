import React from 'react';
import useStatStore from "../../stores/useStatStore";


const setGamemode = useStatStore.getState().setGamemode;
const StatisticButtons = () => {
  const gamemode = useStatStore((state) => state.gamemode);
  const isLoading = useStatStore((state) => state.isLoading);
  if (isLoading) {
    return <></>
  }
  
  const unselectedStyle = "text-white bg-gray-800 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";
  const selectedStyle = "text-white bg-indigo-600  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";

  return (
    <div className='relative flex mx-auto p-4 justify-center h-auto  w-7/10'>
        <div className='p-14'></div>
        <div className='p-2'>
          <button className= {gamemode == "SPRINT"? selectedStyle:unselectedStyle} onClick={()=>{setGamemode("SPRINT")}}>  Sprint  </button>
          <button className={gamemode == "STANDARD"? selectedStyle:unselectedStyle} onClick={()=>{setGamemode("STANDARD")}}>Standard</button>
          <button className={gamemode == "MARATHON"? selectedStyle:unselectedStyle} onClick={()=>{setGamemode("MARATHON")}}>Marathon</button>
        </div>
        <div className='p-2'></div>
    </div>
  )
}

export default StatisticButtons