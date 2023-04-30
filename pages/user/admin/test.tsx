import React from "react";
import { BarChart } from "../../../components/admin/charts/BarChart";

const test = () => {
  return (
    <div className="bg-black h-[100vh] text-white">
      <div className="pt-24 ">
        Test
        <div className="h-[45vh] bg-[#151515] w-[49vw] shadow-md rounded-xl border-2 border-[#272626]">
          <BarChart/>
        </div>
      </div>
    </div>
  );
};

export default test;
