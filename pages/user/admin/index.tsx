import Link from "next/link";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../../../components/admin/Dashboard";
import {
  userInfoAtom,
  web3authAtom,
  loading,
  userRole,
  isVerified,
} from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import * as cookie from "cookie";
import * as jose from "jose";
import { useRouter } from "next/router";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const users = [
  { name: "John", items_delievered: 52, miles: 100 },
  { name: "Jane", items_delievered: 22, miles: 200 },
  { name: "Mary", items_delievered: 12, miles: 300 },
  { name: "Mike", items_delievered: 62, miles: 300 },
  { name: "Suw", items_delievered: 72, miles: 50 },
];

function Home({ isAuthenticated }: any) {
  
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
  const router = useRouter();

  // const [isAuthenticated, setIsAuthenticated] = useAtom(customAuthentication);
  const [verified, setVerified] = useAtom(isVerified);
  const [role, setRole] = useAtom(userRole);
  const [auth, setAuth] = useAtom(web3authAtom);
  const info = useAtomValue(userInfoAtom);

  // useEffect(() => {
  //   if (isAuthenticated === false || role!="admin") {
  //     router.push("/");
  //   }
  // });

  const notify = () => toast("Error !");

  return (
    <div className=" w-screen h-screen bg-black  pt-20 overflow-x-hidden">
      <Dashboard users={users} />
    
    </div>
  );
}

export default Home;


// export async function getServerSideProps(context: any) {
//   const cookies = cookie.parse(context.req.headers.cookie || "");

//   const web3AuthCookie = cookies.idToken;
//   const pub_key_Cookie = cookies.pub_key;
//   if (!web3AuthCookie || !pub_key_Cookie) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   } else {
//     const { idToken }: any = JSON.parse(web3AuthCookie);
//     const pub_key = pub_key_Cookie;
//     const jwks = await jose.createRemoteJWKSet(
//       new URL("https://api.openlogin.com/jwks")
//     );
//     try {
//       const jwtDecoded: any = await jose.jwtVerify(idToken, jwks, {
//         algorithms: ["ES256"],
//       });

//       const wallet: any = JSON.stringify(
//         jwtDecoded.payload.wallets[0].public_key
//       );

//       if (wallet === pub_key) {
//         return {
//           props: {
//             isAuthenticated: true,
//           }, // will be passed to the page component as props
//         };
//       } else {
//         return {
//           redirect: {
//             destination: "/",
//             permanent: false,
//           },
//         };
//       }
//     } catch (error) {
//       console.log(
//         "🚀 ~ file: index.tsx:40 ~ getServerSideProps ~ error",
//         error
//       );
//       return {
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };
//     }
//   }
// }
