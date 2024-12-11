import React from 'react'
import Header from '../../components/Shop/Header'
import { Outlet } from 'react-router-dom'

const ShopLayout = () => {
  return (
    <div className="w-full flex bg-white overflow-hidden">
      <Header/>
      <div className="flex w-full">
        <Outlet/>
      </div>
    </div>
  )
}

export default ShopLayout