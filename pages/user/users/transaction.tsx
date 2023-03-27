import React from 'react'
import List from '../../../components/users/List'

const transaction = () => {
  return (
    <div className='pt-[4.5rem] w-[100vw] overflow-x-hidden'>
        <List title={"Transaction Records"}  sub={"Details and informations about all transactions."}/>
    </div>
  )
}

export default transaction