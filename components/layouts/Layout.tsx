import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
export default function Layout({ children }:any) {
  return (
    <>
      <Header />
      <Sidebar/>
      <main>{children}</main>
      <Footer />
    </>
  )
}