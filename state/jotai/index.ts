import { atom, useAtom } from "jotai";
import {
  atomWithStorage,
  createJSONStorage,
} from "jotai/utils";

const storage = createJSONStorage(() => localStorage);
const count = atomWithStorage("count", 0, storage);

export { count };