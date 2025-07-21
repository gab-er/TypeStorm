import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="cursor-default text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      login
    </Link>
  );
};

export default LoginButton;
