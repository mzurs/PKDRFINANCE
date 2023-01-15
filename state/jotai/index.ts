import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

//storage object for local storage
const storage = { ...createJSONStorage(() => localStorage), delayInit: true };

// id Token
const web3authAtom = atomWithStorage("web3auth", null, storage);

// web3auth initialized state
const web3authStateAtom = atom<Web3AuthCore | null>(null);

//proider initialzed state
const providerAtom = atom<SafeEventEmitterProvider | null | unknown>(null);

// privateKey
const privKeyAtom = atomWithStorage("privKey", null, storage);

//user info
const userInfoAtom = atomWithStorage("userInfo", null, storage);

//simple auth for web3auth
const auth = atom<Web3AuthCore | null>(null);

// loading state for loading component
const loading = atom(true);

export {
  web3authAtom,
  auth,
  privKeyAtom,
  userInfoAtom,
  web3authStateAtom,
  providerAtom,
  loading,
};
