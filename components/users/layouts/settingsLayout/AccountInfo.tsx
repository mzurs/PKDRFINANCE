import React from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../../state/jotai";
import { UserInfo } from "../../../../Types/userTypes";

const AccountInfo = () => {
  const info: UserInfo = useAtomValue(userInfoAtom);
  return (
    <div>
      <div className="pl-4">
        <h1 className="md:text-2xl text-lg font-medium md:pt-10 pt-8">
          Account Information
        </h1>
        <p className="text-gray-500 text-justify pt-3 pl-3 text-lg">
          The information that you provided here will be private and safe.
        </p>
      </div>
      <div>
        <div className="md:px-4 ml-4 p-0 sm:py-8 mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <div className="overflow-hidden">
            <div className="border-t-2 border-gray-200">
              <dl>
                <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-md font-sm md:text-lg text-gray-500">
                    Account Title
                  </dt>
                  <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                    {info?.name}
                    <button className="float-right py-0.5 px-2 mr-2 rounded-lg text-[#009ac9] hover:underline">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-md font-sm md:text-lg text-gray-500">
                    Account email
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
                    Account Number
                  </dt>
                  <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                    14674503895621
                    <button className="float-right py-0.5 px-2 mr-2 rounded-lg text-[#009ac9] hover:underline">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
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
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
