import React from "react";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";
// import { count } from '../../jotai'
import Link from "next/link";
function Header() {
  const countval = 0; //useAtomValue(count)
  console.log(`count :${countval}`);
  return (
    <header className=" fixed top-0 left-0 z-50 w-full h-16 bg-gray-900 text-white p-4 border-2 border-black">
      
      <div className="container mx-auto flex items-center">
      <div>
          {" "}
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Vercel Logo"
            width={30}
            height={5}
          />
        </div>
        <Link href="/" className="font-medium text-xl italic  ">
          PKDR Finance
        </Link>
       
        <nav className="ml-auto">
   
          <Link
            href="/login"
            className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700"
          >
            {countval ? "Signin" : "Sign Out"}
          </Link>
          
        </nav>
      </div>
      
    </header>
    
  );
}

export default Header;
