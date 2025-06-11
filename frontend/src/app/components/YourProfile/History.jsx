import GameProvider from "./GameProvider";
import useGameStore from "@/app/stores/useGameStore";
import Loading from "@/app/loading";
import Link from "next/link";

const History = () => {
    const games = useGameStore((state)=>state.games)
    const isLoading = useGameStore((state)=>state.isLoading)
    if (isLoading) return (<Loading/>)
    return(
        <>
            <h1 className='text-white-700 text-3xl relative flex mx-auto p-4  h-auto  w-7/10 '>History</h1>
            <div className="relative flex flex-col  h-full w-7/10 mx-auto overflow-scroll text-white-700 shadow-md rounded-xl bg-gray-800 justify-center justify-items-center">
                <table className="w-full border-separate border-spacing-4">
                    <thead>
                        <tr>
                            <th className="min-w-[100px]">Gamemode</th>
                            <th className="min-w-[100px]">Score</th>
                            <th className="min-w-[100px]">WPM</th>
                            <th className="min-w-[100px]">Accuracy</th>
                            <th className="min-w-[100px]">Errors</th>
                            <th className="min-w-[100px]">Played On</th>
                
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game) => (
                            <tr key = {game.id}>
                                <td className="text-center p-2">{game.gamemode}</td>
                                <td className="text-center p-2">-</td>
                                <td className="text-center p-2">{game.wpm}</td>
                                <td className="text-center p-2">{game.accuracy*100}%</td>
                                <td className="text-center p-2">{game.errors}</td>
                                <td className="text-center p-2">{game.playedOn.slice(0,10)} {game.playedOn.slice(11,19)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-center p-4">
                <Link
                  href=""
                  className="font-semibold text-indigo-600 hover:text-indigo-500 "
                >
                  Full History
                </Link>
            </div>
            <div className="p-2"></div>

        </>
        
    )
}

export default History