import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { UserInfo } from "../../components/users/settingsLayout/type/userTypes";

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
const userInfoAtom = atomWithStorage<UserInfo | any>("userInfo", null, storage);

//simple auth for web3auth
const auth = atom<Web3AuthCore | null>(null);

// loading state for loading component
const loading = atom(false);

//authentication of JWT token for all Pages and component

const customAuthentication = atom<boolean>(false);

const isVerified = atomWithStorage("verified",null,storage);
const userRole = atom<string | null>(null);

export {
  web3authAtom,
  auth,
  privKeyAtom,
  userInfoAtom,
  web3authStateAtom,
  providerAtom,
  loading,
  customAuthentication,
  userRole,
  isVerified,
};
