import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  username: "",

  // Action to log in
  login: (username, token) =>
    set(() => ({
      username: username,
      isLoggedIn: true,
      token: token,
    })),

  // Action to log out
  logout: () =>
    set(() => ({
      isLoggedIn: false,
      token: null,
    })),
}));

export default useAuthStore;
