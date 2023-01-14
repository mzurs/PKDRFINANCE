import type { NextPage } from "next";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { loading, web3authAtom } from "../state/jotai";
import Loading from "../components/loading/Loading";
import Image from "next/image";
import Front from "../components/Front";
const Home: NextPage = () => {
  const [isLoading, setLoading] = useAtom(loading);
  const [auth, setAuth] = useAtom(web3authAtom);
  if (!auth) {
    return <Front />;
  } else {
    return <div></div>;
  }
};
export default Home;
