import React from 'react'
import Header from '../../components/Shop/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Shop/Sidebar'

const ShopLayout = () => {
  return (
    <div className="w-full flex flex-col bg-white overflow-hidden relative">

      <Header/>
      <div className="flex w-full flex-col">
        <Outlet/>
      </div>
    </div>
  )
}

export default ShopLayout