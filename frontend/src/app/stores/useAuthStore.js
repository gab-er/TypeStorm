import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,

  // Action to log in
  login: (token) => set(() => ({
    isLoggedIn: true,
    token: token,
  })),

  // Action to log out
  logout: () => set(() => ({
    isLoggedIn: false,
    token: null,
  })),
}));

export default useAuthStore;