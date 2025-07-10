import Link from "next/link";
import Loading from "../../loading";

const LoginBox = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  usernameError,
  passwordError,
  loading,
}) => {
  if (loading) {
    return <Loading />
  }
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-600">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-lg/6 font-medium text-gray-600"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-white-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-white-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-black"
                />
              </div>
              {/* Error message pops up if there is an error */}
              {usernameError && (
                <p className="text-red-400"> Error: {usernameError} </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg/6 font-medium text-gray-600"
                >
                  Password
                </label>
                <div className="text-sm">
                  {/* <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link> */}
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-white-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-white-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-black"
                />
              </div>
              {/* Error message pops up if there is an error */}
              {passwordError && (
                <p className="text-red-400"> Error: {passwordError} </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                // bg-indigo-600
                className="cursor-default flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-white-500">
            Not a member?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-500 hover:text-white cursor-default"
            >
              Register for an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginBox;
