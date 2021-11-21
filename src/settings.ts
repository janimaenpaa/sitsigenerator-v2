import { Settings } from "./types";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const settings: Settings = {
  timer: { minutes: 0, seconds: 10 },
  punishments: [
    { id: 1, description: "Punishment 1 " + LOREM_IPSUM, timesUsed: 0 },
    { id: 2, description: "Punishment 2 " + LOREM_IPSUM, timesUsed: 0 },
    { id: 3, description: "Punishment 3 " + LOREM_IPSUM, timesUsed: 0 },
    { id: 4, description: "Punishment 4 " + LOREM_IPSUM, timesUsed: 0 },
    { id: 5, description: "Punishment 5 " + LOREM_IPSUM, timesUsed: 0 },
  ],
  tables: 6,
};

export default settings;
