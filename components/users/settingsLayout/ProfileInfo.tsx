import React, { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { userInfoAtom, web3authAtom } from "../../../state/jotai";
import { UserInfo } from "./type/userTypes";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

export const notify = (message: string, type: string) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case "warn":
      toast.warn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;

    default:
      break;
  }
};

const ProfileInfo = () => {
  const info: UserInfo = useAtomValue(userInfoAtom);
  const [name, setName] = useState<string>(info?.name);
  const [dis, setDis] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([info.idToken, info.oAuthIdToken, name])
    );
    await fetch("/api/mutation/setUserName", {
      method: "POST",
      headers: headers,
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data) {
          let msg = data.data.setUserName;
          setLoader(false);
          if (msg.toLowerCase().includes("username created")) {
            notify(msg+" You can now perform transaction 🎉", "success");
          } else {
            notify(msg, "error");
          }
        }
      });
  };

  return (
    <>
      <div className={`${loader?"opacity-40":""} -z-10`}>
        <div className="pl-4">
          <h1 className="md:text-2xl text-xl font-medium md:pt-10 pt-8">
            Profile Information
          </h1>
          <p className="text-gray-500 text-justify text-lg pt-3 pl-3">
            This information will be displayed publicly so be carefull about
            what you share.
          </p>
        </div>
        <div>
          <div className="md:px-4 ml-4 p-0 sm:py-8 mt-4 pt-4 sm:mt-0 sm:text-left">
            <div className="overflow-hidden">
              <div className="border-t-2 border-gray-200">
                <dl>
                  <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-md font-sm md:text-lg text-gray-500">
                      Full name
                    </dt>
                    <dd
                      className={`mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0`}
                    >
                      <input
                        type="text"
                        value={name}
                        disabled={dis ? false : true}
                        onChange={handleInputChange}
                        className={`${
                          !dis ? "outline-none" : "border border-black"
                        }`}
                      />
                      <button
                        className={`${
                          dis ? "hidden" : ""
                        } float-right py-0.5 px-2 mr-2 rounded-lg text-[#009ac9] hover:underline`}
                        onClick={() => {
                          dis ? setDis(false) : setDis(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className={`${
                          !dis ? "hidden" : ""
                        } float-right py-0.5 px-2 mr-5 rounded-lg text-[#009ac9] hover:underline hover:text-[#037da2]`}
                        onClick={() => {
                          setLoader(true);
                          handleSubmit();
                          dis ? setDis(false) : setDis(true);
                        }}
                      >
                        Save
                      </button>
                    </dd>
                  </div>
                  <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-md font-sm md:text-lg text-gray-500">
                      Email
                    </dt>
                    <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                      {info?.email}
                      <button className="float-right py-0.5 px-2 mr-2 rounded-lg text-[#009ac9] hover:underline">
                        Update
                      </button>
                    </dd>
                  </div>
                  <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-md font-sm md:text-lg text-gray-500">
                      Profile Photo
                    </dt>
                    <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                      Photo
                      <button className="float-right py-0.5 px-2 mr-2 rounded-lg text-[#009ac9] hover:underline">
                        Update
                      </button>
                    </dd>
                  </div>
                  <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-md font-sm md:text-lg text-gray-500">
                      Account Number
                    </dt>
                    <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                      14674503895621
                      <button className="float-right py-0.5 px-2 mr-2 rounded-lg text-[#009ac9] hover:underline">
                        Update
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
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
        <div className="absolute w-[5vw] bg-transparent dark:bg-gray-700 flex items-center justify-center">
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
};

export default ProfileInfo;
