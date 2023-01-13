import type { NextPage } from "next";
import { privKeyAtom } from "../state/jotai";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
// const Loading = dynamic(() => import('../components/loading/Loading'), {
// ssr: false,
// })

const Home: NextPage = () => {
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
const privKeyValue=useAtomValue(privKeyAtom)
  useEffect(()=>{
    if(privKeyValue){
      setPrivKey(privKeyValue)
    }
  })
  return <div>{privKey? JSON.stringify(privKey):""}</div>;
};
export default Home;
