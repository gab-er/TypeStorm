"use client";

import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const NotLoggedIn = () => {
  const [showNotLoggedIn, setShowNotLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotLoggedIn(true), 1000);

    return () => clearTimeout(timer); // clean up on unmount
  }, []);

  return (
    <>
      {showNotLoggedIn && (
        <div className="flex flex-col justify-center p-20 gap-4 items-center">
          <LockClosedIcon className="size-50 p-4" />
          <p className="text-white-700 text-3xl text-center">
            You do not have access to this page if you are not signed in
          </p>
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 text-3xl text-center "
          >
            Click here to sign in
          </Link>
        </div>
      )}
    </>
  );
};

export default NotLoggedIn;
