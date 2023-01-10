import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    < >
    <Provider>
      <Header/>
      <Component {...pageProps} />
<Footer/>
    </Provider>
    
    </>
  )
}