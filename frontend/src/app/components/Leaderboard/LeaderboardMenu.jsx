import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import FetchChallenge from "./FetchChallenge";
import challenges from "@/lib/challenges";
import useChallengeStore from "@/app/stores/useChallengeStore";

const LeaderboardMenu = () => {
  const level = useChallengeStore((state) => state.level);
  return (
    <Menu as="div" className="relative ml-3 flex justify-center p-4">
      <div>
        <MenuButton className="cursor-pointer relative flex bg-gray-800 text-l focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden p-2 rounded-md">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {challenges[level].title}
          <ChevronDownIcon className="size-5 fill-white/60" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        anchor="bottom"
        className="z-10 mt-2 w-40 !max-h-64 !overflow-y-auto origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {challenges.map((challenge) => (
          <MenuItem
            className="cursor-pointer block px-4 py-2"
            key={challenges.indexOf(challenge)}
          >
            <Button
              className="w-full px-3 py-1.5 text-l text-gray-700 hover:bg-gray-100 data-focus:outline-hidden"
              onClick={() => {
                FetchChallenge(challenges.indexOf(challenge));
              }}
            >
              {challenge.title}
            </Button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default LeaderboardMenu;
