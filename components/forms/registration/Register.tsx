import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  web3authAtom,
  loading,
  customAuthentication,
  isVerified,
  userRole,
  privKeyAtom,
  userInfoAtom,
  web3authStateAtom,
  providerAtom,
} from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Loading from "../../loading/Loading";
import PushNotification from "../../PushNotification";
import router, { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
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
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);
  const [auth, setAuth] = useAtom(web3authAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(true);
  const [web3auth] = useAtom(web3authAtom);
  const [verified, setVerified] = useAtom(isVerified);

  const [loadingState, setlLoadingState] = useAtom(loading);
  const handleSubmit = async () => {
    // const idToken = (web3auth as any).idToken;
    const formData = {
      data,
      // idToken,
    };

    handleCloseModal();
    setlLoadingState(true);
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([
        (web3auth as unknown as any).idToken,
        (userInfo as unknown as any).oAuthIdToken,
      ])
    );
    await fetch("/api/mutation/createUser", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(`RESPONSE: ${JSON.stringify(data)}`);
        setlLoadingState(false);
        // router.push("/user/users/");
        if (data) {
          console.log(`data: ${data}`);
          // try {
          //   await web3authState?.logout();
          //   // setProvider(null);
          //   setAuth(null);
          //   setPrivKey(null);
          //   setUserInfo(null);
          //   Cookies.remove("web3auth");
          //   Cookies.remove("pub_key");
          //   Cookies.remove("idToken");
          //   Cookies.remove("oAuthIdToken");
          //   window.location.href =
          //     "https://pkdr-finance-test.auth.us-west-2.amazoncognito.com/logout?client_id=3tihr2r882rhmgvfmkdh56vdqe&logout_uri=http://localhost:3000&redirect_uri=http://localhost:3000";
          // } catch (error: any) {
          //   console.log(
          //     `Error while signing out from Header Component: \n ERROR MESSAGE: ${error.message}`
          //   );
          // }
        }
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

  if (loadingState == true) {
    // return <PushNotification/>
    return <Loading state={true} />;
  } else {
    return (
      <>
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
                      onChange={(e) =>
                        setData({ ...data, cnic: e.target.value })
                      }
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
                      onChange={(e) =>
                        setData({ ...data, CITY: e.target.value })
                      }
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
                      onChange={(e) =>
                        setData({ ...data, DOB: e.target.value })
                      }
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
  }
};

export default Register;
