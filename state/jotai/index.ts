import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = { ...createJSONStorage(() => localStorage), delayInit: true };
const web3authAtom = atomWithStorage("web3auth", null, storage);
const web3authStateAtom = atom<Web3AuthCore | null>(null);
const providerAtom=atom<SafeEventEmitterProvider|null|unknown>(null)
const privKeyAtom = atomWithStorage("privKey", null, storage);
const userInfoAtom = atomWithStorage("userInfo", null, storage);
const auth = atom<Web3AuthCore | null>(null);

export { web3authAtom, auth, privKeyAtom, userInfoAtom, web3authStateAtom,providerAtom };
