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
  const [dateList, setDateList] = useState<string[] | null>(null);
  const [transactions, setTransactions] = useState<any[] | null>(null);
  const [Amount, setAmount] = useState<number[] | null>(null);
  let date = new Date();

  useEffect(() => {
    get_transaction();
  }, []);

  useEffect(() => {
    SetDateList();
  }, [transactions]);

  useEffect(() => {
    SetAmountList();
  }, [dateList]);

  const SetAmountList = () => {
    try {
      let Amounts: number[] = [];
      dateList?.forEach((date) => {
        let amount = 0;
        transactions?.forEach((record) => {
          let d = new Date(record.id);
          let parsedDate =
            d.getDate().toString() + "/" + d.getMonth().toString();
          if (parsedDate === date) {
            amount += record.Amount;
          }
        });
        Amounts?.push(amount);
      });
      setAmount(Amounts);
    } catch (err) {
      console.error(err);
    }
  };

  const SetDateList = () => {
    let dates: any[] = [];
    try {
      transactions?.forEach((element) => {
        let date = new Date(element.id);
        let d = date.getDate().toString() + "/" + date.getMonth().toString();
        dates.push(d);
      });

      let uniqueDates = new Set(dates);
      setDateList(Array.from(uniqueDates));
    } catch (err) {
      console.error(err);
    }
  };

  const get_transaction = async () => {
    try {
      await fetch("/api/admin/query/getBalanceList", {
        method: "POST",
      })
        .then((response) => response.json())
        .then(async (data) => {
          setTransactions(data);
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

  const data = {
    labels: dateList === null ? [] : dateList,
    datasets: [
      {
        label: `T-Cap ${date.getFullYear()}`,
        data: Amount,
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
