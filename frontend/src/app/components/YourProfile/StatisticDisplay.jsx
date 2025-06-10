import useStatStore from "../../stores/useStatStore";
import Loading from '@/app/loading';

const StatisticDisplay = () => {
    const display = useStatStore((state) => state.displayedStat);
    const isLoading = useStatStore((state) => state.isLoading)
    if (isLoading){
        return <Loading/>;
    } 
    const {averageWpm, bestWpm, averageAccuracy, bestAccuracy, gamesPlayed, gamemode} = display[0]
    return (
        <div className="relative flex flex-col  h-full w-7/10 mx-auto overflow-scroll text-white-700 shadow-md rounded-xl bg-gray-800 justify-center justify-items-center columns-3">
            <table className="w-full border-separate border-spacing-4"> 
                <thead>
                    <tr>
                        <th  className="p-2 "></th>
                        <th  className="text-center p-2 underline min-w-[200px]">{gamemode}</th>
                        <th  className="p-2 "></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center p-2 font-bold">Games Played:</td>
                        <td className="text-center p-2 ">{gamesPlayed}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr >
                        <th className="text-center p-2 min-w-[100px] ">Metric</th>
                        <th className="text-center p-2 min-w-[100px] ">Average</th>
                        <th className="text-center p-2 min-w-[100px] ">Personal Best</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center p-2">WPM</td>
                        <td className="text-center p-2">{averageWpm ?? '-'}</td>
                        <td className="text-center p-2">{bestWpm ?? '-'}</td>
                    </tr>
                    <tr>
                        <td className="text-center p-2">Accuracy</td>
                        <td className="text-center p-2">{averageAccuracy ?? '-'}</td>
                        <td className="text-center p-2">{bestAccuracy ?? '-'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )}

export default StatisticDisplay