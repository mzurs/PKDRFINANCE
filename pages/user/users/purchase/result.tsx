import { useEffect, useState } from "react";
import { userInfoAtom, web3authAtom } from "../../../../state/jotai";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loading from "../../../../components/shared/loading/Loading";

export default function Result() {
  const [web3auth] = useAtom(web3authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  // const [data,setData]=useState(0)
  const [counters, setCounters] = useState(0);
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout/${router.query.session_id}` : null,
    async (url) => {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([
          (userInfo as unknown as any).email,
          (web3auth as unknown as any).idToken,
          (userInfo as unknown as any).oAuthIdToken,
        ])
      );
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
      });
      const data = await response.json();
      console.log("🚀 ~ file: result.tsx:35 ~ data:", data);
      return data;
    }
  );
  useEffect(() => {
    data ? router.push("/") : "";
  });
  return (
    <div>
      <h1>Payment Result</h1>
      <pre>
        {!data ? <Loading state={true} /> : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
