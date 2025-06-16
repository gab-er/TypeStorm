const GameDisplay = ({games}) => {
  return (
    <div className="relative flex flex-col  h-full w-7/10 mx-auto overflow-scroll text-white-700 shadow-md rounded-xl bg-gray-800 justify-center justify-items-center">
                <table className="w-full border-separate border-spacing-4">
                    <thead>
                        {/*Create headers for each column*/}
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
                        {/*Create a row in the table for each games in the store*/}
                        {games.map((game) => (
                            <tr key = {game.id}>
                                {/*Display Gamemode of Game*/}
                                <td className="text-center p-2">{game.gamemode}</td> 

                                {/*Display Score achieved in game*/}
                                <td className="text-center p-2">-</td> 

                                {/*Display WPM achieved in game*/}
                                <td className="text-center p-2">{game.wpm}</td> 

                                {/*Display Accuracy achieved in game*/}
                                <td className="text-center p-2">{Math.round(game.accuracy*100)}%</td> 

                                {/*Display amount of Errors in game*/}
                                <td className="text-center p-2">{game.errors}</td> 
                                
                                {/*Display when the game is played*/}
                                <td className="text-center p-2">{game.playedOn.slice(0,10)} {game.playedOn.slice(11,19)}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
  )
}

export default GameDisplay