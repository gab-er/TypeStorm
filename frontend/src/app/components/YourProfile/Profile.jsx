import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from 'react'
import useStatStore from "../../stores/useStatStore";
import useAuthStore from '../../stores/useAuthStore';
import Loading from '@/app/loading';


const Profile = () => {
    const statistics = useStatStore((state) => state.stats);
    const isLoading = useStatStore((state) => state.isLoading)
    const username = useAuthStore((state)=> state.username)
    const userData = useAuthStore((state)=>state.userData)
    const isLoadingAuth = useAuthStore((state)=>state.isLoading)
    if (isLoading || isLoadingAuth) {return(<Loading/>)}
    let totalWPM=0, totalAccuracy=0, totalGames = 0;
    for (const stat of statistics) {
        const {averageWpm, averageAccuracy, gamesPlayed} = stat
        totalGames += gamesPlayed
        totalWPM += gamesPlayed*averageWpm
        totalAccuracy += gamesPlayed*averageAccuracy
    }
    const createdOn = userData.createdOn
    const WPM = Math.round(totalWPM/totalGames)
    const Accuracy = (totalAccuracy/totalGames).toFixed(2)
    return(
        
        <>
            <h1 className='text-white-700 text-3xl relative flex mx-auto p-4  h-auto  w-7/10 '>Profile</h1>
            <div className='relative flex mx-auto p-4 justify-center h-100px  w-7/10 bg-gray-800 rounded-xl'>
                <div className='flex flex-col items-center w-1/4 justify-center gap-2'>
                    <div className="flex items-center gap-4">
                        <UserIcon className="size-15 items-center"/>
                        <div className='text-white-700 text-3xl p-4 text-center'> {username} </div>
                    </div>
                    <div className='text-white-700 text-xl p-4 '> Created On: {createdOn.slice(0,10)} </div>
                </div>
                <div className='text-white-700 text-xl p-4 w-1/4 text-center'> {isNaN(WPM)?"- ":WPM} WPM </div>
                <div className='text-white-700 text-xl p-4 w-1/4 text-center'> {isNaN(Accuracy)? '- ':Accuracy*100 + '%'} Accuracy </div>
                <div className='text-white-700 text-xl p-4 w-1/4 text-center'> {totalGames} {totalGames == 1? "Game":"Games"} Played </div>
            </div>
        </>
    )

}

export default Profile