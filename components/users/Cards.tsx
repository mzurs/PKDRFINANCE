import React from "react";

const Cards = (props: any) => {
  return (
    <div>
      <div className="h-[27vh] m-2 border-2 shadow-lg">
        <div className="px-8 py-4 font-bold">
          <div className="text-2xl pb-3">{props.title}</div>
          <div className="text-lg">{props.sub}</div>
          <div className="text-[4rem]">
            {props.money}
          </div>
        </div>
        <div>
          <button className="bg-blue-700 text-blue-100 text-lg font-medium mb-2 mx-6 px-2 py-1 rounded-xl float-right">
            {props.btn_txt}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
