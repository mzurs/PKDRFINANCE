import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'
import dynamic from 'next/dynamic'
import Sidebar from '../components/layouts/Sidebar'
// import Header from '../components/layouts/Header'
// import Footer from '../components/layouts/Footer'
const Header = dynamic(() => import('../components/layouts/Header'), {
  ssr: false,
})
const Footer = dynamic(() => import('../components/layouts/Footer'), {
  ssr: false,
})
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    < >
    <Provider>
      <Header/>
      <Sidebar/>
      <Component {...pageProps} />
      <Footer/>
    </Provider>
    
    </>
  )
}