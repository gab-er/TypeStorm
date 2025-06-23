import useStatStore from "../../stores/useStatStore";

const StatisticButtons = () => {
  // get gamemode and setgamemode from gamestore
  const gamemode = useStatStore((state) => state.gamemode); 
  const setGamemode = useStatStore((state) => state.setGamemode); 
  const unselectedStyle = "text-white bg-gray-800 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-8 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 min-w-26";
  const selectedStyle = "text-white bg-indigo-600  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-8 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 min-w-26";

  return (
    <div className='relative flex mx-auto p-4 justify-center  w-7/10 border-separate'>
        <div className='p-1 w-15'></div>
        <div className='p-2'>
          {/*Buttons set gamemode on click*/}
          <button className= {gamemode == "STANDARD"? selectedStyle:unselectedStyle} onClick={()=>{setGamemode("STANDARD")}}>  Standard  </button>
          <button className={gamemode == "TIMED"? selectedStyle:unselectedStyle} onClick={()=>{setGamemode("TIMED")}}> Timed </button>
        </div>
        <div className='p-2'></div>
    </div>
  )
}

export default StatisticButtons