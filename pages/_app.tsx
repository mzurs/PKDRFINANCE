import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import dynamic from "next/dynamic";
import Layout from "../components/layouts/Layout";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
// import Header from '../components/layouts/Header'
// import Footer from '../components/layouts/Footer'
// const Header = dynamic(() => import('../components/layouts/Header'), {
//   ssr: false,
// })
// const Footer = dynamic(() => import('../components/layouts/Footer'), {
//   ssr: false,
// })
const Footer = dynamic(() => import("../components/layouts/Layout"), {
  ssr: false,
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Provider>
          <Layout>
          <ReactNotifications />
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </>
  );
}
