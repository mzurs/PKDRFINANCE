import Header from "./Header"
import Footer from "./Footer"
// import SideBar from "./Sidebar"
export default function Layout({ children }:any) {
  return (
    <>
      <Header />
      {/* <SideBar/> */}
      <main>{children}</main>
      <Footer />
    </>
  )
}