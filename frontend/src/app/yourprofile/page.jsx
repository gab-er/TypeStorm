"use client";

//Components
import Statistics from "../components/YourProfile/Statistics";
import Profile from "../components/YourProfile/Profile";
import RecentGames from "../components/YourProfile/RecentGames";
import Loading from "../loading";
import NotLoggedIn from "../components/Error/NotLoggedIn";

//Providers
import AuthProvider from "../components/Auth/AuthProvider";
import StatisticsProvider from "../components/YourProfile/StatisticProvider";
import GameProvider from "../components/YourProfile/GameProvider";

//Stores
import useAuthStore from "../stores/useAuthStore";
import useStatStore from "../stores/useStatStore";
import useGameStore from "../stores/useGameStore";

const YourProfile = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoadingAuth = useAuthStore((state) => state.isLoading);
  const isLoadingStat = useStatStore((state) => state.isLoading);
  const isLoadingGame = useGameStore((state) => state.isLoading);

  return (
    <>
      <AuthProvider>
        {isLoadingAuth ? (
          <Loading />
        ) : !isLoggedIn ? (
          <NotLoggedIn />
        ) : (
          <StatisticsProvider>
            <GameProvider>
              {isLoadingStat || isLoadingGame ? (
                <Loading />
              ) : (
                <>
                  <Profile />
                  <Statistics />
                  <RecentGames />
                </>
              )}
            </GameProvider>
          </StatisticsProvider>
        )}
      </AuthProvider>
    </>
  );
};

export default YourProfile;
