import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Listbox,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import FetchChallenge from "./FetchChallenge";
import challenges from "@/lib/challenges";
import useChallengeStore from "@/app/stores/useChallengeStore";

const LeaderboardMenu = () => {
  const level = useChallengeStore((state) => state.level);
  const selectedStyle =
    "w-full px-3 py-1.5 text-m text-white data-focus:outline-hidden";
  const unselectedStyle =
    "w-full px-3 py-1.5 text-m text-gray-500 hover:text-white data-focus:outline-hidden";
  return (
    <Menu as="div" className="relative ml-3 flex justify-center m-15">
      <div>
        <MenuButton className="cursor-pointer relative flex bg-#161821 text-l hover:ring-2  rounded-md w-70 justify-evenly">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <div className="flex flex-col justify-center items-center">
            <div className="text-white p-1">{challenges[level].title}</div>
            <ChevronDownIcon className="size-5 fill-white/60 p-1" />
          </div>
        </MenuButton>
      </div>
      <MenuItems
        transition
        anchor="bottom"
        className="z-10 mt-2 w-70 !max-h-18 !overflow-y-auto origin-top-right rounded-md bg-(#161821) py-1  ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {challenges.map((challenge) => (
          <MenuItem
            className="cursor-pointer block px-4 py-2"
            key={challenges.indexOf(challenge)}
          >
            <Button
              className={
                challenges.indexOf(challenge) == level
                  ? selectedStyle
                  : unselectedStyle
              }
              onClick={() => {
                FetchChallenge(challenges.indexOf(challenge));
              }}
              disabled={challenges.indexOf(challenge) == level}
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
