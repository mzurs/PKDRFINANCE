import Link from "next/link";
import React, { useState } from "react";
import { web3authAtom } from "../../state/jotai";
import { useAtomValue } from "jotai";
function Sidebar() {
  const [isOpen, setOpen] = useState(true);
if(!useAtomValue(web3authAtom)){
  return <div></div>
}else{
  return !isOpen  ? (
    <div  title="Open SideBar">
      
      <button
        className="text-gray-900 hover:bg-grey-900 " 
        onClick={() => setOpen(!isOpen)}
      ><span className="sr-only">Toggle sidebar</span>
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg></button>
    </div>
  ) : (
    <div className="flex flex-row h-auto">
      <nav className="bg-gray-900 w-20  justify-between flex flex-col border-2 border-black">
        <div className="mt-10 mb-10">
          <div className="mt-10">
            <a href="#">
              <img
                src="https://randomuser.me/api/portraits/women/76.jpg"
                className="rounded-full w-10 h-10 mb-3 mx-auto"
              />
            </a>
          </div>
          <div className="mt-10">
            <ul>
              
              <li className="mb-6">
                <a href="#">
                  <span>
                    <svg
                      className="fill-current h-5 w-5 mx-auto text-gray-300 hover:text-green-500"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                          014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                          8-4z"
                      ></path>
                    </svg>
                  </span>
                </a>
              </li>
              <li className="mb-6">
                <a href="#">
                  <span>
                    <svg
                      className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500 "
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14 3V3.28988C16.8915 4.15043 19 6.82898 19 10V17H20V19H4V17H5V10C5 6.82898 7.10851 4.15043 10 3.28988V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3ZM7 17H17V10C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10V17ZM14 21V20H10V21C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </a>
              </li>
              <li>
                <a title="Close SideBar"
                  onClick={() => {
                    setOpen(false);
                  }}
                  href="#"
                >
                  <span>
                    <svg
                      className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <Link href={"/about"}>about</Link> */}
        {/* <div className="mb-4">
          <a href="#">
            <span>
              <svg
                className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                  fill="currentColor"
                />
                <path
                  d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </a>
        </div> */}
      </nav>
      <div className="px-16 py-4 text-gray-700 bg-gray-200 h-screen w-screen"></div>
    </div>
 
 );

}}

export default Sidebar;
