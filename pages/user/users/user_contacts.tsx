import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isVerified, web3authAtom } from "../../../state/jotai";
import { useRouter } from "next/router";
import { GoPerson } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { Contact } from "../../api/user/search_user";

function contacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  // useEffect(() => {
  //   if (!auth) {
  //     router.push("/");
  //   }
  //   }
  // );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setDisplay(true);
    const response = await fetch(
      `/api/user/search_user?searchTerm=${searchTerm}`
    );
    const results: Contact[] = await response.json();
    setSearchResults(results);
    console.log(searchResults);
  };

  function highlightText(text: string, searchTerm: string) {
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearchTerm, 'gi');
    return text.replace(regex, (match) => `<span style="color: #009ac9; background-color:white;">${match}</span>`);
  }

  return (
    <>
      <div className=" text-gray-600 body-font w-[100vw] mx-auto h-[100vh] overflow-x-hidden">
        <div className="w-[50%] px-2 mx-auto pt-24 pb-4">
          <div className="mx-auto flex items-center justify-between lg:w-[82%] border-b pb-4 mb-10 border-gray-200">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Contacts"
              value={searchTerm}
              onChange={handleInputChange}
              className="focus:outline-none text-xl"
            />
            <button>
              <FiSearch
                className="hover:text-[#0389b1] text-3xl"
                title="Search"
                onClick={handleSearch}
              />
            </button>
          </div>
          {display
            ? searchResults.map((result) => {
                const highlightedUsername = highlightText(
                  result.username,
                  searchTerm
                );

                return (
                  <div
                    key={result.id}
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
                        <p className="text-lg">{result.email}</p>
                      </div>
                      <Link
                        className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                        href={{
                          pathname: "/user/users/transfer",
                          query: { name: result.username, email: result.email },
                        }}
                      >
                        Pay Now
                      </Link>
                    </div>
                  </div>
                );
              })
            : ""}
          {!display ? (
            <>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
              <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
                <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                  <div className="mx-4 float-left">
                    <h2 className="text-gray-900 text-xl title-font font-medium mb-1">
                      Zohaib
                    </h2>
                    <p className="text-lg">example@gmail.com</p>
                  </div>
                  <Link
                    className="text-lg p-2 text-[#009ac9] hover:underline hover:text-[#096897]"
                    href={{
                      pathname: "/user/users/transfer",
                      query: { name: "Zohaib", email: "example@gmail.com" },
                    }}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default contacts;
