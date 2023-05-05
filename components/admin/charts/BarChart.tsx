import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {
  const [creditList, setCreditList] = useState<any[]>([]);
  const [debitList, setDebitList] = useState<any[]>([]);
  const [dateList, setDateList] = useState<Set<string> | null>(null);
  const [labels, setLabels] = useState<string[]|any[]>([]);

  useEffect(() => {
    get_transaction_by_date();
  }, []);

  useEffect(() => {
    try {
      if (creditList.length >= debitList.length) {
        setDateList(new Set(Object.keys(creditList)));
      } else {
        setDateList(new Set(Object.keys(debitList)));
      }
    } catch (err) {
      console.error(err);
    }
  }, [creditList, debitList]);

  useEffect(() => {
    let dates:string[]=[];
    try {
      dateList?.forEach((dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.toLocaleString(
          "default",
          { month: "short" }
        )}`;
        dates.push(formattedDate)
      });
      setLabels(dates);
    } catch (error) {
      console.log(error);
    }
  }, [dateList]);

  const get_transaction_by_date = async () => {
    try {
      await fetch("/api/admin/query/debit_credit_List_By_Date", {
        method: "POST",
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data) {
            if (data.length === 2) {
              Object.keys(data[0]).forEach((transact_date: string) => {
                if (!Object.keys(data[1]).includes(transact_date)) {
                  data[1][transact_date] = 0;
                }
              });

              Object.keys(data[1]).forEach((transact_date: string) => {
                if (!Object.keys(data[0]).includes(transact_date)) {
                  data[0][transact_date] = 0;
                }
              });

              setCreditList(data[0]);
              setDebitList(data[1]);
            } else if (data[0] == "credit") {
              setCreditList(data[0]);
              setDebitList([]);
            } else {
              setDebitList(data[0]);
              setCreditList([]);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Credit / Debit Bar Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total Credit",
        data: Object.values(creditList),
        backgroundColor: "#659157",
      },
      {
        label: "Total Debit",
        data: Object.values(debitList),
        backgroundColor: "#A1C084",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
