import React from 'react'
import Image from 'next/image'
import { useAtom,useAtomValue } from 'jotai'
import { count } from '../../state/jotai'

function Header() {
    const countval=useAtomValue(count)
    console.log(`count :${countval}`)
  return (
<header className="bg-gray-900 text-white p-4 border-4 border-indigo-500/100">
  <div className="container mx-auto flex items-center">
    <a href="#" className="font-medium text-xl">PKDR Finance</a>
    <Image src="/favicon.ico" alt="Vercel Logo" width={30} height={5} />
    <nav className="ml-auto">
      <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700">Home</a>
      <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700">About</a>
      <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700">Contact</a>
      <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700">{!count?"Signin":"Sign Out"}</a>
    </nav>
  </div>
</header>
  )
}

export default Header