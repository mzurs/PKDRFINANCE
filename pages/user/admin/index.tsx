  import React from 'react';
  import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';

  function Home(){
    const notify = () => toast("Wow so easy !");

    return (
      <div><br></br><br></br><br></br><br></br>
        <button onClick={notify}>Notify !</button>
        {/* <ToastContainer /> */}
      </div>
    );
  }

  export default Home;
  