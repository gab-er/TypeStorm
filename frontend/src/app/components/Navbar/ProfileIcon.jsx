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
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

const ProfileIcon = () => {
  const router = useRouter();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="cursor-pointer relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {/* User Icon */}
          <UserIcon className="size-6" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem className="cursor-pointer block px-4 py-2">
          <Link className="w-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 data-focus:outline-hidden" href = "yourprofile">
            Your Profile
          </Link>
        </MenuItem>
        <MenuItem className="cursor-pointer">
          <button className="block w-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 data-focus:outline-hidden">
            Settings
          </button>
        </MenuItem>
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileIcon;
