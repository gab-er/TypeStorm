import useAuthStore from "../stores/useAuthStore";

const WelcomeBack = () => {
  const username = useAuthStore((state) => state.username);

  return <h1> Welcome back, {username} </h1>;
};

export default WelcomeBack;
