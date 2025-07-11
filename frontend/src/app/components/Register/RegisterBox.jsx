import React from "react";
import Head from "next/head";
import PasswordStrengthBar from "react-password-strength-bar";
import Loading from "@/app/loading";

const RegisterBox = ({
  minPasswordLength,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  inputPassword,
  usernameError,
  passwordError,
  confirmPasswordError,
  loading,
}) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
            Register for a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-white-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="new-password"
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  className="w-full rounded-md bg-gray-400 px-3 py-1.5 placeholder:text-black placeholder:text-lg focus:outline-2 focus:outline-white text-black h-10 text-lg [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
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
                  className="block text-xl font-medium text-white-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="w-full rounded-md bg-gray-400 px-3 py-1.5 placeholder:text-black placeholder:text-lg focus:outline-2 focus:outline-white text-black h-10 text-lg [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                />
                {/* Password strength meter */}
                <PasswordStrengthBar
                  password={inputPassword}
                  minLength={minPasswordLength}
                  onChangeScore={(score, feedback) => {}}
                />
                {/* Error message pops up if there is an error */}
                {passwordError && (
                  <p className="text-red-400"> Error: {passwordError} </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xl font-medium text-white-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                  className="w-full rounded-md bg-gray-400 px-3 py-1.5 placeholder:text-black placeholder:text-lg focus:outline-2 focus:outline-white text-black h-10 text-lg [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
                />
                {/* Error message pops up if there is an error */}
                {confirmPasswordError && (
                  <p className="text-red-400">Error: {confirmPasswordError}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-lg font-semibold text-white shadow-xs hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-default"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterBox;
