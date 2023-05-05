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
  const [creditList, setCreditList] = useState<any[]>([]);
  const [debitList, setDebitList] = useState<any[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  let Amounts: number[] = [];

  useEffect(() => {
    if (username == "") {
      setLoader(true);
      fetchUserName();
    }
  }, []);

  useEffect(() => {
    setLoader(true);
    get_transaction();
  }, [username]);

  async function fetchUserName(): Promise<boolean> {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([info.idToken, info.oAuthIdToken])
    );
    try {
      await fetch("/api/user/query/getUserAttrInfo", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ attr_name: "USERNAME" }),
      })
        .then((response) => response.json())
        .then(async (d) => {
          console.log("🚀 ~ file: transfer.tsx:100 ~ .then ~ d:", d);
          setUserName(d.data.getUserInfo.value);
          return d.data.getUserInfo.success;
        });
    } catch (error) {
      return false;
    }
    return false;
  }

  const setLabelsList = () => {
    add_dateproperty();
    if (dateList != null) {
      dateList.forEach((element) => {
        let credit_count = getCount(creditList, element);
        let debit_count = getCount(debitList, element);

        if (credit_count != 0 || debit_count != 0) {
          if (credit_count > debit_count) {
            let diff = credit_count - debit_count;

            while (diff != 0) {
              let dates = debitList.map((record) => record.date);
              let lastIndex = dates.lastIndexOf(element);
              debitList.splice(lastIndex, 0, {
                Amount: 0,
                date: element,
              });
              diff--;
            }
            console.log(
              "🚀 ~ file: MultilineChart.tsx:55 ~ dateList.forEach ~ debitList:",
              debitList
            );
          } else if (debit_count > credit_count) {
            let diff = debit_count - credit_count;

            while (diff != 0) {
              let dates = creditList.map((record) => record.date);
              let lastIndex = dates.lastIndexOf(element);
              creditList.splice(lastIndex, 0, {
                Amount: 0,
                date: element,
              });
              diff--;
            }
          }
        }
      });
    }

    setLabels(getSortedDates(creditList.map((record) => record.date)));
  };

  useEffect(() => {
    sortByDate();
    setAmount();
  }, [labels]);

  useEffect(() => {
    get_transaction();
  }, []);

  useEffect(() => {
    if (transactions != null) {
      SetDateList();
      setLoader(false);
    }
  }, [transactions]);

  useEffect(() => {
    setLabelsList();
  }, [dateList]);

  function sortByDate() {
    try {
      creditList.sort((a, b) => {
        const [dayA, monthA] = a.date.split("/");
        const [dayB, monthB] = b.date.split("/");
        const dateA: any = new Date(`${monthA}/${dayA}`);
        const dateB: any = new Date(`${monthB}/${dayB}`);
        return dateA - dateB;
      });

      debitList.sort((a, b) => {
        const [dayA, monthA] = a.date.split("/");
        const [dayB, monthB] = b.date.split("/");
        const dateA: any = new Date(`${monthA}/${dayA}`);
        const dateB: any = new Date(`${monthB}/${dayB}`);
        return dateA - dateB;
      });
    } catch (e) {
      console.log(e as string);
    }
  }

  function getSortedDates(dates: any[]) {
    const sortedDates = dates.sort((a, b) => {
      const [dayA, monthA] = a.split("/");
      const [dayB, monthB] = b.split("/");
      let date = new Date();
      const dateA: any = new Date(date.getFullYear(), monthA - 1, dayA);
      const dateB: any = new Date(date.getFullYear(), monthB - 1, dayB);
      return dateA - dateB;
    });

    return sortedDates;
  }

  const add_dateproperty = () => {
    creditList.forEach((element) => {
      let obj = new Date(element.TimeStamp);
      element.date = obj.getDate().toString() + "/" + obj.getMonth().toString();
      delete element.TimeStamp;
    });

    debitList.forEach((element) => {
      let obj = new Date(element.TimeStamp);
      element.date = obj.getDate().toString() + "/" + obj.getMonth().toString();
      delete element.TimeStamp;
    });
  };

  const getCount = (list: any[], date: string) => {
    let count = 0;
    list.forEach((record) => {
      if (record.date === date) {
        count++;
      }
    });
    return count;
  };

  const SetDateList = () => {
    let dates: any[] = [];
    try {
      transactions?.forEach((element) => {
        dates.push(
          element.map((record: any) => {
            let date = new Date(record.TimeStamp);
            Amounts.push(record.Amount);
            let d =
              date.getDate().toString() + "/" + date.getMonth().toString();
            return d;
          })
        );
      });
      dates = dates[0].concat(dates[1]);

      const uniqueDates = new Set(dates);
      setDateList(uniqueDates);
    } catch (err) {
      console.error(err);
    }
  };

  const setAmount = () => {
    if (creditList != null) {
      let c = creditList.flatMap((record: any) => record.Amount);
      setCreditAmount(c);
    }
    if (debitList != null) {
      let d = debitList.flatMap((record: any) => record.Amount);
      setDebitAmount(d);
    }
  };

  const get_transaction = async () => {
    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([info.idToken, info.oAuthIdToken])
      );
      await fetch("/api/user/query/getChartList/getTotalList", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ username: username }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          setTransactions(data);
          setCreditList(data[0]);
          setDebitList(data[1]);
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
        text: "Transactions Graph (1W)",
        color: "grey",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Credit",
        data: creditAmount,
        borderColor: "rgb(106, 90, 205)",
        backgroundColor: "rgb(106, 90, 205)",

        // borderColor: "rgb(22,163,74)",
        // backgroundColor: "rgb(22, 163, 74, 0.5)",
      },
      {
        label: "Debit",
        data: debitAmount,
        borderColor: "rgb(90, 90, 90)",

        backgroundColor: "rgb(90, 90, 90)",
        // borderColor: "rgb(153, 27, 27)",
        // backgroundColor: "rgba(153, 27, 27, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
export default MultilineChart;
