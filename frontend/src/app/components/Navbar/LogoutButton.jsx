import { useRouter } from "next/navigation";
import logout from "../../../lib/logout";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      className="cursor-default text-center block w-full px-3 py-1.5 text-gray-600 hover:text-white data-focus:outline-hidden text-xl"
      onClick={() => logout(router)}
    >
      sign out
    </button>
  );
};

export default LogoutButton;
