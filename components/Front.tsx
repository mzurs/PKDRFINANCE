import React from 'react'
import { web3authAtom } from '../state/jotai';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
function Front() {
    const auth=useAtomValue(web3authAtom);
    return (
      <>
      <div> PKDR FINANCE</div>
      </>
      
       );
}

export default Front