import React from "react";
import { web3authAtom } from "../state/jotai";
import { useAtomValue } from "jotai";

function Front() {
  const auth = useAtomValue(web3authAtom);
  return (
    <div className="h-[100vh] flex items-center justify-center text-4xl">
      Front Component
    </div>
  );
}

export default Front;
