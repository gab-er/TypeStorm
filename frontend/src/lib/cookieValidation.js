import useAuthStore from "@/app/stores/useAuthStore";
import url from "./apiUrl";

export const cookieValidation = async () => {
  const login = useAuthStore.getState().login;
  const setIsLoading = useAuthStore.getState().setIsLoading

  try {
    console.log("about to fetch logged in status")
    console.log(url);
    const res = await fetch(`${url}/user`, {
      method: "GET",
      credentials: "include",
    });
    console.log("fetched logged in status");
    // If no valid cookie => not logged in
    if (res.status == 401 || !res.ok) {
      // do nothing
      console.log("res not ok");
    } else {
      const data = await res.json();
      const username = data.username;
      login(username); // Login => store the logged in state in the useAuthStore 
    } 
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false); 
  }
};
