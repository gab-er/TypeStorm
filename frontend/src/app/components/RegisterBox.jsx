import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import Head from "next/head";
import PasswordStrengthBar from "react-password-strength-bar";

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
}) => {
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
          <form
            action="#"
            method="POST"
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-lg/6 font-medium text-white-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
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
                  className="block text-lg/6 font-medium text-white-900"
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
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-white-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-white-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-black"
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
                  className="block text-lg/6 font-medium text-white-900"
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-white-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-white-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-black"
                />
                {/* Error message pops up if there is an error */}
                {confirmPasswordError && (
                  <p className="text-red-400">
                    {" "}
                    Error: {confirmPasswordError}{" "}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
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
