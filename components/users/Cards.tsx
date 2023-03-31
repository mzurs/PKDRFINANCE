import React from "react";

const Cards = (props: any) => {
  return (
    <div>
      <div className="h-[54vh] m-2 border-2 shadow-lg rounded-lg">
        <div className="px-8 py-4 font-bold">
          <div className="text-2xl pb-3">{props.title}</div>
          <div className="text-lg pl-9">{props.sub}</div>
        </div>
        <div className="text-[7rem] font-medium flex items-center justify-center h-[30vh]">{props.money}</div>
        <div>
          <button className="mt-12 bg-blue-700 text-blue-100 text-lg font-medium mb-2 mx-6 px-3 py-2 rounded-xl float-right">
            {props.btn_txt}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
