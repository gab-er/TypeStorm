import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  username: "",
  userData: {},
  isLoading: true,

  // Action to log in
  login: (username, userData) =>
    set(() => ({
      username: username,
      userData: userData,
      isLoggedIn: true,
      isLoading: false,
    })),

  // Action to log out
  logout: () =>
    set(() => ({
      username: "",
      userData: {},
      isLoggedIn: false,
      isLoading: false,
    })),

  setUserData: (userData) =>
    set(() => ({
      userData: userData,
    })),

  setIsLoading: (bool) =>
    set(() => ({
      isLoading: bool,
    })),
}));

export default useAuthStore;
