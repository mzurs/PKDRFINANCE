import Link from "next/link";
import React from "react";

function cancel() {
  return (
    <>
      <div>Payment Didn't Procced</div>
      <br />
      <Link href="/">Home</Link>
    </>
  );
}

export default cancel;
