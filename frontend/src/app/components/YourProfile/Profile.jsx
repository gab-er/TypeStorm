import ProfilePic from "../Navbar/ProfilePic";
import useStatStore from "../../stores/useStatStore";
import useAuthStore from "../../stores/useAuthStore";

const Profile = () => {
  // Get stats for statstore, gets username and userdata from Authstore
  const statistics = useStatStore((state) => state.stats);
  const username = useAuthStore((state) => state.username);
  const userData = useAuthStore((state) => state.userData);
  const createdOn = userData.createdOn;

  // Calculating total average WPM, Accuracy and games played
  let totalWPM = 0,
    totalAccuracy = 0,
    totalGames = 0;
  // For each gamemode, add the average metic multiplied by games played
  for (const stat of statistics) {
    const { averageWpm, averageAccuracy, gamesPlayed } = stat;
    totalGames += gamesPlayed;
    totalWPM += gamesPlayed * averageWpm;
    totalAccuracy += gamesPlayed * averageAccuracy;
  }
  // Get Average Metrics by dividing by total games
  const WPM = Math.round(totalWPM / totalGames);
  const Accuracy = (totalAccuracy / totalGames).toFixed(2);
  return (
    <>
      <h1 className="text-white-700 text-2xl relative flex mx-auto p-4  h-auto  w-7/10 ">
        profile
      </h1>
      <div className="relative flex mx-auto p-4 justify-center h-100px  w-7/10 bg-gray-800 rounded-xl overflow-x-auto justify-items-center items-baseline">
        <div className="flex sticky left-0 flex-col items-center w-1/4 justify-center gap-2 min-w-[300px] pr-4">
          {/*Display User icon, username and account creation date*/}
          <div className="flex items-center gap-4">
            <ProfilePic
              profilePic={userData.profilePic}
              className="size-15 items-center rounded-full "
            />
            <div className="text-white-700 text-3xl p-2 text-center">
              {" "}
              {username}{" "}
            </div>
          </div>
          <div className="text-white-700 text-m ">
            {" "}
            Created On: {createdOn.slice(0, 10)}{" "}
          </div>
        </div>
        {/*Display the total average metrics*/}
        <div className="flex pl-[100px] w-3/4 justify-evenly justify-items-center items-center">
          <div className="text-white-700 text-2xl p-4 text-center min-w-[100px] flex-shrink-0 ">
            {" "}
            {isNaN(WPM) ? "- " : Math.round(WPM)} WPM{" "}
          </div>
          <div className="text-white-700 text-2xl p-4 text-center min-w-[100px] flex-shrink-0 ">
            {" "}
            {isNaN(Accuracy)
              ? "- "
              : Math.round(Accuracy * 100) + "%"} Accuracy{" "}
          </div>
          <div className="text-white-700 text-2xl p-4 text-center min-w-[100px] flex-shrink-0 ">
            {" "}
            {totalGames} {totalGames == 1 ? "Game" : "Games"} Played{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
