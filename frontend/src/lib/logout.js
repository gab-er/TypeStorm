import useAuthStore from "../app/stores/useAuthStore";
import url from "./apiUrl";
import { toast } from "react-toastify";

const logout = async (router) => {
  const logout = useAuthStore.getState().logout;

  try {
    const res = await fetch(`${url}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("error");
    }

    logout();

    router.push("/");
    toast.info("Signed out");
  } catch (error) {
    console.log(error);
  }
};

export default logout;
