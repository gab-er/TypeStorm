"use client";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoginButton from "./LoginButton";
import ProfileIcon from "./ProfileIcon";
import Logo from "./Logo";
import useAuthStore from "../../stores/useAuthStore";
import WelcomeBack from "./WelcomeBack";
import { useState, useEffect } from "react";
import DelayedLoadingDefault from "./DelayedLoadingDefault";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "home", href: "/" },
  { name: "challenges", href: "/challenges" },
  { name: "leaderboards", href: "/leaderboard" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [loginDisplay, setLoginDisplay] = useState(null);
  const pathName = usePathname();

  // This hook will set the login display to the WelcomeBack component if logged in, or the login button if not logged in. It will react to changes in the isLoggedIn state.
  useEffect(() => {
    if (isLoggedIn) {
      setLoginDisplay(<WelcomeBack />);
    } else {
      setLoginDisplay(<LoginButton />);
    }
  }, [isLoggedIn]);

  return (
    // bg-blue-600
    // bg-[#263a5ed9]
    // bg-[#161821]
    <Disclosure as="nav" className="bg-[#161821] select-none pt-4 flex">
      <div className="mx-auto w-full max-w-420 px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button -> Creates a menu dropdown on small screens */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          {/* Team Logo */}
            <Link href="/" className="">
              {/* 120 120 */}
              <Logo width="180" height="120" />
            </Link>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center"></div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  // Check if the current path is the correct one
                  const isActive =
                    item.href == "/"
                      ? pathName == "/" // Home page
                      : pathName.includes(item.href); // Eg. /challenges/1 highlights the challenges button
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-white",
                        "rounded-md px-2 text-xl cursor-default"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Sign in button / Profile Icon*/}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mx-10">
            {/* If loading, it shows the loading effect. Else, it shows one of the login displays*/}
            {(!isLoading && loginDisplay) || <DelayedLoadingDefault />}

            {/* If logged in -> Profile dropdown is shown */}
            {isLoggedIn && <ProfileIcon isLoggedIn={isLoggedIn} />}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
