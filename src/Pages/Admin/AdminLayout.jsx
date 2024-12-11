import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/AdminPanel/Sidebar'
import TopBar from '../../components/AdminPanel/TopBar'

const AdminLayout = () => {
  return (
    <div className='w-full h-screen flex flex-row relative'>
      <Sidebar/>
        <TopBar/>
          <main className='flex-1 flex bg-white p-2 md:ml-64 mt-[60px]'>
            <Outlet/>
          </main>
        </div>
  )
}

export default AdminLayout