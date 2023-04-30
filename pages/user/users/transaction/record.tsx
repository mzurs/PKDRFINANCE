import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { userInfoAtom } from "../../../../state/jotai";

const record = () => {
  const router = useRouter();
  const data: any = router.query;
  const info:any = useAtomValue(userInfoAtom);

  return (
    <>
      <div className="dark:bg-slate-900">
        <div className="h-[20vh] pt-4 dark:bg-slate-900">
          <HiOutlineArrowLeft className="h-[20vh] ml-5 text-white hover:text-[#017699] text-4xl cursor-pointer" onClick={()=>router.back()}/>
        </div>
        <div className="flex justify-center h-[70vh] dark:bg-slate-900">
          <div className="flex flex-col w-[35vw] mx-auto pt-12">
            {data.type === "credit" ? (
              <BsArrowDown className="mb-6 p-2 mx-auto border-4 font-extrabold border-green-600 rounded-full text-green-600 text-[85px]" />
            ) : (
              <BsArrowUp className="mb-6 p-2 mx-auto border-4 font-extrabold border-red-800 rounded-full text-red-800 text-[85px]" />
            )}
            <div className="mx-auto justify-center items-center font-medium text-[#017699] text-3xl flex flex-col">
              <div>{data.id}</div>
              <div>{info?.email}</div>
            </div>
            <div className=" text-white text-2xl px-8 pt-6 text-center">
              {data.type === "credit" ? (
                <>
                  Funds have been recieved From{" "}
                  <span className="text-[#017699] font-sm">{data.From}</span> To{" "}
                  <span className="text-[#017699] font-sm">{data.id}</span>{" "}
                  through Digital Banking at
                  <span className="text-[#017699] font-sm">
                    &nbsp;
                    {data.time}
                    &nbsp;
                  </span>
                </>
              ) : (
                <>
                  Funds have been transfered From{" "}
                  <span className="text-[#017699] font-sm">{data.id}</span> To{" "}
                  <span className="text-[#017699] font-sm">{data.To}</span>{" "}
                  through PKDR Funds Transfer at
                  <span className="text-[#017699] font-sm">
                    &nbsp;
                    {data.time}
                    &nbsp;
                  </span>
                </>
              )}
              on
              <span className="text-[#017699] font-sm">
                &nbsp;
                {data.date}
                &nbsp;
              </span>
              .
            </div>
            <div className="mx-auto text-2xl text-white font-medium py-3">
              {data.type==="credit"?"Credit":"Debit"} Amount
            </div>
            <div className="w-full border-t-2 border-gray-200"></div>
            <div className="mx-auto text-6xl text-[#017699] font-semibold py-3 text-center">
              Rs&nbsp;{data.Amount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default record;
