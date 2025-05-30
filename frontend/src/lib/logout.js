import { useRouter } from "next/navigation";
import useAuthStore from "../stores/useAuthStore";

const logout = () => {
  const router = useRouter();
  if (useAuthStore.getState().isLoggedIn) {
    // Not necessary but left in as a precaution
    useAuthStore.getState().logout();
    console.log("logged out");
    router.push("/");
  }
};

export default logout;
