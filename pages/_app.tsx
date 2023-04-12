import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import dynamic from "next/dynamic";
import Layout from "../components/shared/layouts/Layout";
import 'react-notifications-component/dist/theme.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from '../components/layouts/Header'
// import Footer from '../components/layouts/Footer'
// const Header = dynamic(() => import('../components/layouts/Header'), {
//   ssr: false,
// })
// const Footer = dynamic(() => import('../components/layouts/Footer'), {
//   ssr: false,
// })
const Footer = dynamic(() => import("../components/shared/layouts/Footer"), {
  ssr: false,
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Provider>
          <Layout>
          <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </>
  );
}
