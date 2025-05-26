import { useRouter } from 'next/navigation'
import useAuthStore from '../stores/useAuthStore'

const LogoutButton = () => {
    const router = useRouter();
    const logout = () => {
        if (useAuthStore.getState().isLoggedIn) { 
            useAuthStore.getState().logout();
            console.log("logged out");
            router.push('/');
        }
    }

  return (
    <button 
    className="cursor-pointer"
    onClick={logout}>
        Sign out
    </button>
  )
}

export default LogoutButton