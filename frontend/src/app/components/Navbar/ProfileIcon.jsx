import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import LogoutButton from "./LogoutButton";
import useAuthStore from "@/app/stores/useAuthStore";
import ProfilePic from "./ProfilePic";
import Link from "next/link";

const ProfileIcon = () => {
  const userData = useAuthStore((state) => state.userData);
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full text-xl hover:text-white hover:ring-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {/* User Icon */}
          <ProfilePic
            profilePic={userData.profilePic}
            className="size-6 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute translate-x-[-60px] items-center justify-start mt-2 w-36 rounded-xl transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem className="cursor-default block px-4 py-2 hover:text-white rounded-md">
          <Link
            className="flex justify-center w-full px-3 py-1.5 text-xl text-gray-600 data-focus:outline-hidden"
            href="/yourprofile"
          >
            profile
          </Link>
        </MenuItem>
        <MenuItem className="cursor-default hover:text-white">
          <Link
            className="flex justify-center w-full px-3 py-1.5 text-xl text-gray-600 data-focus:outline-hidden"
            href="/history"
          >
            history
          </Link>
        </MenuItem>
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileIcon;
