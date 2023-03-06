import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function Home(){
  const notify = () => toast("Wow so easy !");

  return (
    <div className="w-[100vw] h-[100vh] pt-20 overflow-x-hidden">
      <button className="w-[100vw] h-[100vh] pt-20 overflow-x-hidden" onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  );
}

export default Home;

// import React, { useState } from "react";

// function AlertButton() {
//   const [showAlert, setShowAlert] = useState(false);

//   const handleClick = () => {
//     console.log("AlertButton")
//     setShowAlert(true);
//   };

//   return (
//     <div className="w-[100vw] h-[100vh] pt-20 overflow-x-hidden">
//       {" "}
//       <button className="w-[100vw] h-[100vh] pt-20" onClick={handleClick}>Click me</button>
//       {showAlert && (
//         <div>
//           <p>This is an alert message!</p>
//           <button onClick={() => setShowAlert(false)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AlertButton;
