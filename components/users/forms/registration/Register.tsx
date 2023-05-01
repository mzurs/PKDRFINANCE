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
} from "../../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Loading from "../../../shared/loading/Loading";
import PushNotification from "../../../shared/PushNotification";
import router, { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
import { notify } from "../../settingsLayout/ProfileInfo";

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
  const [signOut, setSignOut] = useState<boolean>(false);
  const [loadingState, setlLoadingState] = useAtom(loading);


  // const approveHandler = async () => {
  //   const headers = new Headers();
  //   headers.append("content-type", "application/json");
  //   headers.append(
  //     "x-custom-header",
  //     JSON.stringify([
  //       (web3auth as unknown as any).idToken,
  //       (userInfo as unknown as any).oAuthIdToken,
  //       privKey!,
  //     ])
  //   );

  //   await fetch("/api/mutation/approve", {
  //     method: "POST",
  //     headers: headers,
  //   })
  //     .then((res) => res.json())
  //     .then(async (data) => {
  //       console.log("Approve Data: ", data);
  //       if (data.result) {
  //         setApprove(false);
  //       }
  //     });
  // };
  const handleSubmit = async () => {
    // const idToken = (web3auth as any).idToken;
    const formData = {
      data,
      // idToken,
    };

    handleCloseModal();
    setlLoadingState(false);
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([
        (web3auth as unknown as any).idToken,
        (userInfo as unknown as any).oAuthIdToken,
        privKey!,
      ])
    );
    await fetch("/api/mutation/createUser", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("🚀 ~ file: Register.tsx:80 ~ handleSubmit ~ data:", data.data.createUser.errorMessage);
        if (data.result) {
          // setApprove(true);
          notify("User Created Successfully!!!", "success");
        } else {
          notify(data.data.createUser.errorMessage, "error");
        }
        // console.log(data); --------------------------------error hadling logic and change of states-----------------------
        setSignOut(true);
      });
  };

  const logout = async () => {
    if (!web3authState) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      await web3authState.logout();
      setProviderAtomState(null);
      setAuth(null);
      setPrivKey(null);
      setUserInfo(null);
      setVerified(false);
      Cookies.remove("web3auth");
      Cookies.remove("pub_key");
      Cookies.remove("idToken");
      Cookies.remove("oAuthIdToken");
      window.location.href =
        "https://pkdr-finance-test.auth.us-west-2.amazoncognito.com/logout?client_id=3tihr2r882rhmgvfmkdh56vdqe&logout_uri=https://pkdrfinance.vercel.app&redirect_uri=https://pkdrfinance.vercel.app hover:font-xl";
      localStorage.clear();
    } catch (error: any) {
      console.log(
        `Error while signing out from Registerw Component: \n ERROR MESSAGE: ${error.message}`
      );
    }
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
  } else if (signOut == true) {
    return (
      <div className="flex pt-[20.6rem] w-[100vw] overflow-x-hidden">
        <div className="max-w-100 mx-auto bg-white">
          {" "}
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={logout}
          >
            Sign Out{" "}
          </button>
        </div>
      </div>
    );
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
                      <i>Full Name</i>
                    </label>
                    <input
                      required
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
                      <i>CNIC</i>{" "}
                    </label>
                    <input
                      required
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
                      <i>Address</i>{" "}
                    </label>
                    <input
                      required
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
                      <i> Next</i>
                    </span>
                  </button>{" "}
                </>
              )}
              {currentPage === 2 && (
                <>
                  <div className="mb-4">
                    <label className="block border-black font-medium mb-2">
                      <i>Postal Code</i>{" "}
                    </label>
                    <input
                      required
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
                      <i>Phone Number</i>{" "}
                    </label>
                    <input
                      required
                      className="border border-black p-2 w-full"
                      type="number"
                      value={String(data.PHONE_NUMBER)}
                      onChange={(e) =>
                        setData({ ...data, PHONE_NUMBER: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block border-black font-medium mb-2">
                      <i> Father(or Husband Name)</i>{" "}
                    </label>
                    <input
                      required
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
                      <i> Go Back</i>
                    </span>
                  </button>
                  <button
                    onClick={handleNextClick}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <i>Next</i>{" "}
                    </span>
                  </button>
                </>
              )}
              {currentPage === 3 && (
                <>
                  <div className="mb-4">
                    <label className="block border-black font-medium mb-2">
                      <i> City</i>{" "}
                    </label>
                    <input
                      required
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
                      <i> Country</i>{" "}
                    </label>
                    <input
                      required
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
                      <i> DateOfBirth</i>{" "}
                    </label>
                    <input
                      required
                      placeholder="mm-dd-yy"
                      className="border border-black p-2 w-full"
                      type="date"
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
                      <i>Go Back</i>{" "}
                    </span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <i>
                        <b>Submit</b>
                      </i>{" "}
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
