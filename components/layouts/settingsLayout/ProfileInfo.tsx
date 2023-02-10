import React from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../state/jotai";
import { UserInfo } from "../../../Types/userTypes";

const ProfileInfo = () => {
  const info: UserInfo = useAtomValue(userInfoAtom);
  return (
    <div>
      <div className="pl-4">
        <h1 className="md:text-2xl text-xl font-medium md:pt-10 pt-8">
          Profile Information
        </h1>
        <p className="text-gray-500 text-justify pt-3 pl-3">
          This information will be displayed publicly so be carefull about what
          you share.
        </p>
      </div>
      <div>
        <div className="md:px-4 ml-4 p-0 sm:py-8 mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <div className="overflow-hidden">
            <div className="border-t-2 border-gray-200">
              <dl>
                <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-md font-sm md:text-lg text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                    {info?.name}
                  </dd>
                </div>
                <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-md font-sm md:text-lg text-gray-500">
                    Email
                  </dt>
                  <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                    {info?.email}
                  </dd>
                </div>
                <div className="border-b-2 border-gray-200 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-md font-sm md:text-lg text-gray-500">
                    Profile Photo
                  </dt>
                  <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                    Photo
                  </dd>
                </div>
                <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-md font-sm md:text-lg text-gray-500">
                    Account Number
                  </dt>
                  <dd className="mt-1 text-md md:text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                    14674503895621
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

export default ProfileInfo;
