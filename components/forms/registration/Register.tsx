// import React from "react";

// function Register() {
//   const formData = {
//     ADDRESS: "v1",
//     CITY: "a1",
//     COUNTRY: "a1",
//     DOB: "a1",
//     ETH_ADDRESS: "0xfB7dbE4c3d3841409B48F7ae92A7fb7Cbb02f11B",
//     FATHER_OR_HUSBAND_NAME: "a1",
//     FULL_NAME: "a1",
//     cnic: "v1",
//     id: "v1",
//     POSTAL_CODE: "v1",
//     PHONE_NUMBER: "v1",
//   };

//   const handleSubmit = async () => {
//     // event.preventDefault();
//     await fetch("/api/mutation/createUser", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Do something with the data
//         console.log(`RESPONSE: ${JSON.stringify(data)}`);
//       });
//   };

//   return (
//     <div>
//       Register Form
//       <button onClick={handleSubmit}>Click</button>
//     </div>
//   );
// }

// export default Register;
import * as jwt from "jsonwebtoken";
import { keccak256 } from "js-sha3";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { web3authAtom } from "../../../state/jotai";
import { useAtom } from "jotai";
import { Web3AuthCore } from "@web3auth/core";

const Register = () => {
  const [data, setData] = useState<{
    ADDRESS: string;
    CITY: string;
    COUNTRY: string;
    DOB: string;
    ETH_ADDRESS: string;
    FATHER_OR_HUSBAND_NAME: string;
    FULL_NAME: string;
    cnic: string;
    id: string;
    POSTAL_CODE: string;
    PHONE_NUMBER: string;
  }>({
    ADDRESS: "",
    CITY: "",
    COUNTRY: "",
    DOB: "",
    ETH_ADDRESS: "",
    FATHER_OR_HUSBAND_NAME: "",
    FULL_NAME: "",
    cnic: "",
    id: "",
    POSTAL_CODE: "",
    PHONE_NUMBER: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(true);
  const [web3auth] = useAtom(web3authAtom);


    const getUserInfo = async () => {
      // console.log(`IdToken: ${JSON.stringify(web3auth?.idToken)}`)
      const decoded: any = await jwt.decode((web3auth as unknown as any).idToken);
      console.log("🚀 ~ file: Register.tsx:83 ~ getUserInfo ~ decoded", decoded)
      // console.log(`Decoded : `,JSON.stringify(decoded.email))
      // console.log("🚀 ~ file: Register.tsx:83 ~ getUserInfo ~ decoded", decoded.wallets[0].public_key)
      setData({ ...data, id: JSON.stringify(decoded.email) });
      const hash = keccak256(Buffer.from(decoded.wallets[0].public_key, "hex"));
      const publicAddress = "0x" + hash.slice(-40);
      console.log("🚀 ~ file: Register.tsx:88 ~ getUserInfo ~ publicAddress", publicAddress)
      setData({ ...data, ETH_ADDRESS: publicAddress })
      // console.log(`Address: ${JSON.stringify(decoded.email)}`);
    };
  
  // useEffect(()=>{
    // console.log(JSON.stringify(data))
  // })
  const handleSubmit = async () => {
    handleCloseModal();
  
    await getUserInfo()
  console.log(`Data: ${JSON.stringify(data)}`)
    await fetch("/api/mutation/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        console.log(`RESPONSE: ${JSON.stringify(data)}`);
      });
  };
  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      {/* <button className="bg-blue-500 p-2 text-white rounded-lg" onClick={handleOpenModal}>Open Form</button> */}
      <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
        <center className="  w-3/4 mx-auto">
          <div className="bg-black p-4 text-white text-lg text-center w-3/4 mx-auto font-medium">
            {" "}
            Registeration Form{" "}
          </div>
          <div className="bg-white p-4 w-3/4 mx-auto">
            {currentPage === 1 && (
              <>
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.FULL_NAME)}
                    // onChange={(e) => setFirstName(e.target.value)}
                    onChange={(e) =>
                      setData({ ...data, FULL_NAME: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    cnic{" "}
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.cnic)}
                    onChange={(e) => setData({ ...data, cnic: e.target.value })}
                  />
                </div>{" "}
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    Address{" "}
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.ADDRESS)}
                    onChange={(e) =>
                      setData({ ...data, ADDRESS: e.target.value })
                    }
                  />
                </div>
                <button
                  onClick={handleNextClick}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Next
                  </span>
                </button>{" "}
              </>
            )}
            {currentPage === 2 && (
              <>
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    Postal Code{" "}
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.POSTAL_CODE)}
                    onChange={(e) =>
                      setData({ ...data, POSTAL_CODE: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    Phone Number{" "}
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.PHONE_NUMBER)}
                    onChange={(e) =>
                      setData({ ...data, PHONE_NUMBER: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    Father/Husband Name{" "}
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.FATHER_OR_HUSBAND_NAME)}
                    onChange={(e) =>
                      setData({
                        ...data,
                        FATHER_OR_HUSBAND_NAME: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  onClick={handlePrevClick}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Go Back
                  </span>
                </button>
                <button
                  onClick={handleNextClick}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Next{" "}
                  </span>
                </button>
              </>
            )}
            {currentPage === 3 && (
              <>
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    City{" "}
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.CITY)}
                    onChange={(e) => setData({ ...data, CITY: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    Country{" "}
                  </label>
                  <input
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.COUNTRY)}
                    onChange={(e) =>
                      setData({ ...data, COUNTRY: e.target.value })
                    }
                  />
                </div>{" "}
                <div className="mb-4">
                  <label className="block border-black font-medium mb-2">
                    DateOfBirth{" "}
                  </label>
                  <input
                    placeholder="mm-dd-yy"
                    className="border border-black p-2 w-full"
                    type="text"
                    value={String(data.DOB)}
                    onChange={(e) => setData({ ...data, DOB: e.target.value })}
                  />
                </div>
                <button
                  onClick={handlePrevClick}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Go Back{" "}
                  </span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Submit{" "}
                  </span>
                </button>
              </>
            )}
          </div>
        </center>
      </Modal>
    </>
  );
};

export default Register;
