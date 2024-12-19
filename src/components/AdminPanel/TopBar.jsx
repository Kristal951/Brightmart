import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const TopBar = () => {
  const {user} = useSelector((state)=> state.auth)
  return (
    <div className='w-full h-[60px] md:ml-64 z-[1200] bg-white fixed shadow-md flex items-center'>
       <Avatar position="absolute" right="266px" name={user?.name}/>
    </div>
  )
}

export default TopBar