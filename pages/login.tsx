import React from 'react'
// import Loading from '../components/loading/Loading'
import dynamic from 'next/dynamic'
const Loading = dynamic(() => import('../components/loading/Loading'), {
    ssr: false,
  })
function login() {
    <Loading/>

}

export default login