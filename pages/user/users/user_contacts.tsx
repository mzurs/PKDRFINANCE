import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { BsPlusCircleFill } from "react-icons/bs";
import { UserInfo } from "../../../components/users/settingsLayout/type/userTypes";
import { useAtom, useAtomValue } from "jotai";
import { isVerified, userInfoAtom, web3authAtom } from "../../../state/jotai";
import { notify } from "../../../components/users/settingsLayout/ProfileInfo";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";

function contacts() {
  let info: UserInfo = {
    email: "",
    name: "",
    profileImage: "",
    aggregateVerifier: "",
    verifier: "",
    verifierId: "",
    typeOfLogin: "",
    dappShare: "",
    idToken: "",
    oAuthIdToken: "",
    oAuthAccessToken: "",
  };
  info = useAtomValue(userInfoAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [auth, setAuth] = useAtom(web3authAtom);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [contacts, setContacts] = useState<string[]>([]);
  const [contactName, setContactName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/");
    }
    if (!isVerified) {
      router.push("/user/users/");
    } else {
      setLoader(true);
      list_contacts();
      setDisplay(false);
    }
  }, []);

  const list_contacts = async () => {
    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([info.idToken, info.oAuthIdToken])
      );
      await fetch("/api/user/query/listContacts", {
        method: "POST",
        headers: headers,
        body: "",
      })
        .then((response) => response.json())
        .then(async (data) => {
          const listContacts = data.data.listContacts;

          if ("contacts" in listContacts) {
            setContacts(Object.values(listContacts.contacts));
            console.log(`List of contacts = ${listContacts.contacts}`);
          } else if ("message" in listContacts) {
            console.log(`Message = ${listContacts.message}`);
          } else {
            console.log(`Error Message = ${listContacts.errorMessage}`);
          }
        });
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const add_contacts = async () => {
    setLoader(true);
    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([info.idToken, info.oAuthIdToken, contactName])
      );
      await fetch("/api/user/mutation/addContacts", {
        method: "POST",
        headers: headers,
        body: "",
      })
        .then((response) => response.json())
        .then(async (data) => {
          const msg = data.data.addContacts;
          setContactName("");
          setLoader(false);
          if (msg.message.includes("List updated")) {
            notify(msg.message, "success");
            list_contacts();
          } else if (msg.message.includes("USERNAME Not Exists")) {
            notify(msg.message, "warn");
          } else {
            notify(msg.errorMessage, "error");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleSearch();
  };

  const handleSearch = async () => {
    if (searchTerm != "") {
      setDisplay(true);
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append("x-custom-header", JSON.stringify(contacts));

      const response = await fetch(
        `/api/user/search_user?searchTerm=${searchTerm}`,
        {
          method: "POST",
          headers: headers,
          body: "",
        }
      );

      const results: string[] = await response.json();
      setSearchResults(results);
      console.log(searchResults);
    } else {
      setDisplay(false);
    }
  };

  function highlightText(text: string, searchTerm: string) {
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearchTerm, "gi");
    return text.replace(
      regex,
      (match) =>
        `<span style="color: #009ac9; background-color:white;">${match}</span>`
    );
  }

  return (
    <>
      <div
        className={`${
          loader ? "opacity-40" : ""
        } text-gray-600 body-font w-[100vw] mx-auto h-[100vh] overflow-x-hidden -z-10`}
      >
        <div
          className={`${
            show ? "opacity-40" : ""
          } w-[50%]  px-2 mx-auto pt-24 pb-4`}
        >
          <div className="mx-auto flex items-center justify-between lg:w-[82%] border-b border-gray-200 md:mb-12">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Contacts"
              value={searchTerm}
              onChange={handleInputChange}
              className="w-11/12 focus:outline-2 focus:outline-[#0389b1] p-2 text-xl focus:bg-transparent"
            />
            <button className="w-1/12">
              <FiSearch
                className=" hover:text-[#0389b1] text-3xl mx-auto"
                title="Search"
                onClick={handleSearch}
              />
            </button>
          </div>
          <div>
            {display
              ? searchResults.map((result) => {
                  const highlightedUsername = highlightText(result, searchTerm);

                  return (
                    <div
                      key={result}
                      className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col"
                    >
                      <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                        <GoPerson className="text-3xl text-gray-100" />
                      </div>
                      <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                        <div className="mx-4 float-left">
                          <h2
                            className="text-gray-900 text-xl title-font font-medium mb-1"
                            dangerouslySetInnerHTML={{
                              __html: highlightedUsername,
                            }}
                          ></h2>
                          <p className="text-lg">example@gmail.com</p>
                        </div>
                        <Link
                          className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                          href={{
                            pathname: "/user/users/transfer",
                            query: {
                              name: result,
                              email: "example@example.com",
                            },
                          }}
                        >
                          Pay Now
                        </Link>
                      </div>
                    </div>
                  );
                })
              : ""}
            {!display
              ? contacts.map((result) => {
                  return (
                    <div
                      key={result}
                      className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col"
                    >
                      <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                        <GoPerson className="text-3xl text-gray-100" />
                      </div>
                      <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                        <div className="mx-4 float-left">
                          <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                            {result}
                          </h2>
                          <p className="text-lg">example@gmail.com</p>
                        </div>
                        <Link
                          className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                          href={{
                            pathname: "/user/users/transfer",
                            query: { name: result, email: "example@gmail.com" },
                          }}
                        >
                          Pay Now
                        </Link>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <button
            className="absolute bottom-8 right-8 hover:shadow-lg rounded-full hover:cursor-pointer"
            title="Add Contacts"
            onClick={() => {
              setShow(true);
            }}
          >
            <BsPlusCircleFill className=" text-5xl" />
          </button>
        </div>
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={`fixed flex items-center justify-center  top-0 left-0 right-0 z-50  w-[100vw] p-4 ${
            !show ? "hidden" : ""
          } overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="absolute w-[35vw] bg-white rounded-lg border-2 dark:bg-gray-700 shadow-md">
            <button
              type="button"
              className="absolute right-2.5 mt-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setShow(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add Contact
              </h3>
              <div>
                <label
                  htmlFor="contactname"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Enter Contact Name{" "}
                  <span className="text-red-800" title="required">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="contactname"
                  id="contact"
                  value={contactName}
                  className="bg-gray-50 border text-md border-gray-300 text-gray-900 rounded-lg focus:ring-[#0890b9] focus:border-[#0890b9] block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter Contact Name"
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <button
                className={`w-full mt-3 text-white ${
                  contactName == ""
                    ? "bg-[#8bbcca]"
                    : "bg-[#0890b9] hover:underline hover:bg-[#06799c]"
                }   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-[#0890b9] dark:hover:bg-[#087b9e] dark:focus:ring-[#0890b9]`}
                disabled={contactName == "" ? true : false}
                onClick={() => {
                  add_contacts();
                  setShow(false);
                }}
              >
                Add to your Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="loader"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed flex items-center justify-center  top-0 left-0 right-0 z-50  w-[100vw] p-4 ${
          !loader ? "hidden" : ""
        } overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="absolute w-[5vw] bg-transparent flex items-center justify-center">
          <ThreeDots
            height="120"
            width="120"
            radius="9"
            color="#028db7"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={loader}
          />
        </div>
      </div>
    </>
  );
}

export default contacts;
