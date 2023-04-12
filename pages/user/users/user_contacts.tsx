import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isVerified, web3authAtom } from "../../../state/jotai";
import { useRouter } from "next/router";
import { GoPerson } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { BsPlusCircleFill } from "react-icons/bs";
import { UserInfo } from "../../../components/users/settingsLayout/type/userTypes";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../state/jotai";
import type {
  ListContactsParams,
  ListContactsResponse,
} from "../../../src/API";
import { json } from "stream/consumers";

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
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [contacts, setContacts] = useState<string[]>([]);
  useEffect(() => {
    //   if (!auth) {
    //     router.push("/");
    //   }
    list_contacts();
    setDisplay(false);
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
          // Comment as '__typename' is not in resoponse
          // switch (listContacts.__typename) {
          //   case 'ListContactsResult':
          //     const contacts = listContacts.contacts;
          //     console.log('Contacts:', contacts);
          //     break;
          //   case 'UserNotExists':
          //     const message = listContacts.message;
          //     console.log('Message:', message);
          //     break;
          //   case 'Error':
          //     const errorMessage = listContacts.errorMessage;
          //     console.log('Error:', errorMessage);
          //     break;
          //   default:
          //     console.log('Unknown data type:', listContacts.__typename);
          //     break;
          // }
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
      headers.append(
        "x-custom-header",
        JSON.stringify(contacts)
      );
      // ["Zohaib","Sarfaraz","mzohaib10092001@gmail.com"]
      
      const response = await fetch(`/api/user/search_user?searchTerm=${searchTerm}`, {
        method: "POST",
        headers: headers,
        body: "",
      });

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
      <div className=" text-gray-600 body-font w-[100vw] mx-auto h-[100vh] overflow-x-hidden">
        <div className="w-[50%] px-2 mx-auto pt-24 pb-4">
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
                  const highlightedUsername = highlightText(
                    result,
                    searchTerm
                  );

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
          <div
            className="absolute bottom-8 right-8 hover:shadow-lg rounded-full hover:cursor-pointer"
            title="Add Contacts"
            onClick={list_contacts}
          >
            <BsPlusCircleFill className=" text-5xl" />
          </div>
        </div>
      </div>
    </>
  );
}

export default contacts;
