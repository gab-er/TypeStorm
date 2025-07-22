import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import LogoutButton from "./LogoutButton";
import useAuthStore from "@/app/stores/useAuthStore";
import ProfilePic from "./ProfilePic";
import Link from "next/link";

const ProfileIcon = () => {
  const userData = useAuthStore((state) => state.userData);
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full text-xl hover:text-hover hover:ring-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {/* User Icon */}
          <ProfilePic
            profilePic={userData.profilePic}
            className="size-6 rounded-full text-selected"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute translate-x-[-60px] items-center justify-start mt-2 w-36 rounded-xl transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem className="cursor-default block px-4 py-2 hover:text-hover rounded-md">
          <Link
            className="flex justify-center w-full px-3 py-1.5 text-xl text-primary data-focus:outline-hidden"
            href="/yourprofile"
          >
            profile
          </Link>
        </MenuItem>
        <MenuItem className="cursor-default hover:text-hover">
          <Link
            className="flex justify-center w-full px-3 py-1.5 text-xl text-primary data-focus:outline-hidden"
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
