import useAuthStore from "@/app/stores/useAuthStore";
import url from "./apiUrl";

export const cookieValidation = async () => {
  const login = useAuthStore.getState().login;
  const setIsLoading = useAuthStore.getState().setIsLoading;

  try {
    const res = await fetch(`${url}/user`, {
      method: "GET",
      credentials: "include",
    });
    // If no valid cookie => not logged in
    if (res.status == 401 || !res.ok) {
      // do nothing
      // console.log("status code: ", res.status);
      // console.log("res: ", res);
      // console.log("message: ", res.message);
    } else {
      const data = await res.json();
      const username = data.username;
      login(username, data); // Login => store the logged in state in the useAuthStore
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
