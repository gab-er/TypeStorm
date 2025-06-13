"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoginButton from "./LoginButton";
import ProfileIcon from "./ProfileIcon";
import Logo from "./Logo";
import useAuthStore from "../../stores/useAuthStore";
import WelcomeBack from "./WelcomeBack";
import { useState, useEffect } from "react";
import DelayedLoadingDefault from "./DelayedLoadingDefault";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Timed", href: "#", current: false },
  { name: "Challenge", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [loginDisplay, setLoginDisplay] = useState(null);

  // This hook will set the login display to the WelcomeBack component if logged in, or the login button if not logged in. It will react to changes in the isLoggedIn state.
  useEffect(() => {
    if (isLoggedIn) {
      setLoginDisplay(<WelcomeBack />);
    } else {
      setLoginDisplay(<LoginButton />);
    }
  }, [isLoggedIn]);

  return (
    <Disclosure as="nav" className="bg-blue-600 select-none">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
          <Link href="/">
            <Logo width="120" height="120" />
          </Link>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center"></div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-white hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-medium font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Sign in button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mx-10 gap-1">
            {/* If loading, it shows the loading effect. Else, it shows one of the login displays*/}
            {(!isLoading && loginDisplay) || (
              <DelayedLoadingDefault/>
            )}

            {/* If logged in -> Profile dropdown is shown */}
            {isLoggedIn && <ProfileIcon isLoggedIn={isLoggedIn} />}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
