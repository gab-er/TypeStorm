import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from 'react'
import useStatStore from "../../stores/useStatStore";
import useAuthStore from '../../stores/useAuthStore';


const Profile = () => {
    const statistics = useStatStore((state) => state.stats);
    const isLoading = useStatStore((state) => state.isLoading)
    const username = useAuthStore((state)=> state.username)
    if (isLoading) {return(<p>Loading...</p>)}
    let totalWPM=0, totalAccuracy=0, totalGames = 0;
    for (const stat of statistics) {
        const {averageWpm, averageAccuracy, gamesPlayed} = stat
        totalGames += gamesPlayed
        totalWPM += gamesPlayed*averageWpm
        totalAccuracy += gamesPlayed*averageAccuracy
    }
    const WPM = Math.round(totalWPM/totalGames)
    const Accuracy = (totalAccuracy/totalGames).toFixed(2)
    return(
        
        <>
            <h1 className='text-white-700 text-3xl relative flex mx-auto p-4  h-auto  w-7/10 '>Profile</h1>
            <div className='relative flex mx-auto p-4 justify-center h-100px  w-7/10 bg-gray-800 rounded-xl'>
                <div className='flex items-center w-1/4 justify-center gap-2'>
                    <UserIcon className="size-15 items-center"/>
                    <div className='text-white-700 text-3xl p-4 w-1/4 text-center'> {username} </div>
                </div>
                <div className='text-white-700 text-xl p-4 w-1/4 text-center'> {WPM} WPM </div>
                <div className='text-white-700 text-xl p-4 w-1/4 text-center'> {Accuracy*100}% Accuracy </div>
                <div className='text-white-700 text-xl p-4 w-1/4 text-center'> {totalGames} {totalGames == 1? "Game":"Games"} Played </div>
            </div>
        </>
    )

}

export default Profile