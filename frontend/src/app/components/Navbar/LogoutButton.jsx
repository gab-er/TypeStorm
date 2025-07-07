import { useRouter } from "next/navigation";
import logout from "../../../lib/logout";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer text-center block w-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 data-focus:outline-hidden"
      onClick={() => logout(router)}
    >
      Sign out
    </button>
  );
};

export default LogoutButton;
