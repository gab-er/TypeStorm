import useChallengeStore from "@/app/stores/useChallengeStore";
import ProfilePic from "../Navbar/ProfilePic";

const LeaderboardDisplay = () => {
  const userData = useChallengeStore((state) => state.userData);
  const leaderboard = useChallengeStore((state) => state.leaderboard);
  return (
    <div>
      {userData ? (
        <div>
          <h1 className="text-selected text-2xl relative flex mx-auto p-4  h-auto  w-7/10">
            personal rank
          </h1>
          <div className="relative flex flex-col  h-full w-7/10 mx-auto overflow-scroll text-white-700 shadow-md rounded-xl bg-gray-800 justify-center justify-items-center">
            <table className="w-full border-separate border-spacing-4">
              <thead>
                {/*Create headers for each column*/}
                <tr>
                  <th className="min-w-[100px]">Ranking</th>
                  <th className="min-w-[100px]">Score</th>
                  <th className="min-w-[100px]">WPM</th>
                  <th className="min-w-[100px]">Accuracy</th>
                  <th className="min-w-[100px]">Errors</th>
                  <th className="min-w-[100px]">Played on</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/*Display Ranking of User*/}
                  <td className="text-center p-2">{userData.ranking}</td>
                  {/*Display Score achieved in attempt*/}
                  <td className="text-center p-2">{userData.data.score}</td>
                  {/*Display WPM achieved in attempt*/}
                  <td className="text-center p-2">{userData.data.wpm}</td>
                  {/*Display Accuracy achieved in attempt*/}
                  <td className="text-center p-2">
                    {Math.round(userData.data.accuracy * 100)}%
                  </td>
                  {/*Display amount of Errors in attemt*/}
                  <td className="text-center p-2">{userData.data.errors}</td>

                  {/*Display when the attempt was played*/}
                  <td className="text-center p-2">
                    {userData.data.playedOn.slice(0, 10)}{" "}
                    {userData.data.playedOn.slice(11, 19)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
      <h1 className="text-selected text-2xl relative flex mx-auto p-4  h-auto  w-7/10">
        leaderboard
      </h1>
      <div className="relative flex flex-col  h-full w-7/10 mx-auto overflow-scroll text-white-700 shadow-md rounded-xl bg-gray-800 justify-center justify-items-center p-4">
        <table className="w-full border-separate border-spacing-4">
          <thead>
            {/*Create headers for each column*/}
            <tr>
              <th className="min-w-[100px]">Ranking</th>
              <th className="min-w-[100px]">User</th>
              <th className="min-w-[100px]">Score</th>
              <th className="min-w-[100px]">WPM</th>
              <th className="min-w-[100px]">Accuracy</th>
              <th className="min-w-[100px]">Errors</th>
              <th className="min-w-[100px]">Played On</th>
            </tr>
          </thead>
          <tbody>
            {/*Create a row in the table for each games in the store*/}
            {leaderboard.map((game) => (
              <tr key={game.id}>
                {/*Display Ranking*/}
                <td className="text-center p-2">
                  {leaderboard.indexOf(game) + 1}
                </td>
                {/*Display User of attempt*/}
                <td className="text-center p-2">
                  <div className="flex justify-center gap-3">
                    <ProfilePic
                      className="size-6 rounded-full"
                      profilePic={game.user.profilePic}
                    />
                    {game.user.username}
                  </div>
                </td>
                {/*Display Score achieved in game*/}
                <td className="text-center p-2">{game.score}</td>

                {/*Display WPM achieved in game*/}
                <td className="text-center p-2">{game.wpm}</td>

                {/*Display Accuracy achieved in game*/}
                <td className="text-center p-2">
                  {Math.round(game.accuracy * 100)}%
                </td>

                {/*Display amount of Errors in game*/}
                <td className="text-center p-2">{game.errors}</td>

                {/*Display when the game is played*/}
                <td className="text-center p-2">
                  {game.playedOn.slice(0, 10)} {game.playedOn.slice(11, 19)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardDisplay;
