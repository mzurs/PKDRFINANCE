import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart() {

  useEffect(() => {
    get_transaction();
  }, []);

  const get_transaction = async () => {
    try {
      await fetch(
        "http://localhost:3000/api/admin/query/getAllTransactionList",
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Capital",
      },
    },
  };

    const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "T-Cap",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
