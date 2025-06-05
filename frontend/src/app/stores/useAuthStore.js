import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  username: "",
  isLoading: true,

  // Action to log in
  login: (username) =>
    set(() => ({
      username: username,
      isLoggedIn: true,
      isLoading: false
    })),

  // Action to log out
  logout: () =>
    set(() => ({
      username: "",
      isLoggedIn: false,
      isLoading: false
    })),

  setIsLoading: (bool) => 
    set(() => ({
      isLoading: bool
    })),
}));

export default useAuthStore;
