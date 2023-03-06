import React from "react";
import { userInfoAtom, web3authAtom, loading } from "../../../state/jotai";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Loading from "../../../components/shared/loading/Loading";
import { UserInfo } from '../../../components/users/settingsLayout/Types/userTypes'
function profile() {
  const [auth, setAuth] = useAtom(web3authAtom);
  const info:UserInfo = useAtomValue(userInfoAtom);
  <Loading state={true} />;

  if (auth) {
    if (info) {
      return (
        // relative container
        <div className="flex justify-center w-full h-full items-center">
          <section className="text-gray-600 body-font py-10 w-full">
            <div className="px-12 md:py-16 mx-auto flex flex-col">
              <div className="lg:w-full mx-auto">
                <div className="rounded-2xl md:h-12 h-14 overflow-hidden mb-6">
                  {/* <img
                    alt="content"
                    className="object-cover object-center h-full w-full "
                    src="https://th.bing.com/th/id/R.477a439e64ecec7f2ac1758f3c62df71?rik=WGxoAUjMGwB7rA&pid=ImgRaw&r=0"
                  /> */}
                  
                </div>
                <div className="flex flex-col sm:flex-row md:items-center sm:mt-1">
                  <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                      <h2 className="font-medium title-font mt-4 text-gray-900 text-xl">
                        {info?.name}
                      </h2>
                      <div className="w-12 h-1 bg-[#009ac9] rounded mt-2 mb-4"></div>
                      <p className="text-lg">
                        Raclette knausgaard hella meggs normcore williamsburg
                        enamel pin sartorial venmo tbh hot chicken gentrify
                        portland.
                      </p>
                    </div>
                  </div>
                  <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left w-auto">
                  <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl font-medium leading-6 text-gray-900">
                          Personal Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-md text-gray-500">
                          Personal details and account information.
                        </p>
                      </div>
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-500">
                              Full name
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                              {info.name}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-500">
                              Account ID
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                              14674503895621
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-500">
                              Email address
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                              {info.email}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-lg font-medium text-gray-500">
                              Salary expectation
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                              $120,000
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                            <dt className="text-lg font-medium text-gray-500">
                              About
                            </dt>
                            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                              Fugiat ipsum ipsum deserunt culpa aute sint do
                              nostrud anim incididunt cillum culpa consequat.
                              Excepteur qui ipsum aliquip consequat sint. Sit id
                              mollit nulla mollit nostrud in ea officia
                              proident. Irure nostrud pariatur mollit ad
                              adipisicing reprehenderit deserunt qui eu.
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  } else {
    return <div>Login</div>;
  }
}

export default profile;
