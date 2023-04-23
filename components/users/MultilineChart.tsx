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
  elements,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useAtom, useAtomValue } from "jotai";
import { userInfoAtom, userName } from "../../state/jotai";
import { notify } from "./settingsLayout/ProfileInfo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MultilineChart = () => {

  const info = useAtomValue(userInfoAtom);
  const [username, setUserName] = useAtom(userName);
  const [transactions, setTransactions] = useState<any[] | null>(null);
  const [dateList, setDateList] = useState<Set<string> | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [creditAmount, setCreditAmount] = useState<number[]>([]);
  const [debitAmount, setDebitAmount] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  let Amounts:number[]=[];

  const SetDateList = (tx: any[]) => {
    let dates: any[] = [];
    
    tx.forEach((element) => {
      dates.push(
        element.map((record: any) => {
          let date = new Date(record.TimeStamp);
          Amounts.push(record.Amount);
          let d =  date.getDate().toString() + "/" + date.getMonth().toString();
          return d;
        })
      );
    });
    dates=dates[0].concat(dates[1]);
    
    const uniqueDates = new Set(dates);
    setDateList(uniqueDates);
    setLabels(Array.from(dates));
    console.log("🚀 ~ file: MultilineChart.tsx:56 ~ SetDateList ~ labels:", labels)
    
  };

  const setAmount=(credit:any, debit:any)=>{
    if(credit!=null){
      setCreditAmount(credit.flatMap((record:any)=>record.Amount))
    }
    if(debit!=null){
      setDebitAmount(debit.flatMap((record:any)=>record.Amount))
    }
  }

  useEffect(() => {
    get_transaction();
  }, []);

  useEffect(() => {
    if (transactions != null) {
      SetDateList(transactions);
      setLoader(false);
    }
  }, [transactions]);

  const get_transaction = async () => {
    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([info.idToken, info.oAuthIdToken])
      );
      await fetch(
        "http://localhost:3000/api/user/query/getChartList/getTotalList",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ username: username }),
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          setTransactions(data);
          setAmount(data[0],data[1]);
        });
    } catch (error) {
      notify("Error Occurred: while fetching transactions details", "error");
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
        text: "Transactions Graph",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Credit",
        data: creditAmount,
        borderColor: "rgb(22,163,74)",
        backgroundColor: "rgb(22, 163, 74, 0.5)",
      },
      {
        label: "Debit",
        data: debitAmount,
        borderColor: "rgb(153, 27, 27)",
        backgroundColor: "rgba(153, 27, 27, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
export default MultilineChart;
