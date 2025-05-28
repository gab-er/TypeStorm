import { useRouter } from 'next/navigation'
import useAuthStore from '../stores/useAuthStore'

const LogoutButton = () => {
    const router = useRouter();
    const logout = () => {
        if (useAuthStore.getState().isLoggedIn) { // Not necessary but left in as a precaution
            useAuthStore.getState().logout();
            console.log("logged out");
            router.push('/');
        }
    }

  return (
    <button 
    className="cursor-pointer text-center block w-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 data-focus:outline-hidden"
    onClick={logout}>
        Sign out
    </button>
  )
}

export default LogoutButton