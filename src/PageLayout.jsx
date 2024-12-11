import React, { useContext, useEffect } from 'react'
import NavBar from './components/NavBar/NavBar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from './Contexts/UserContext.js'

const PageLayout = () => {
  // const navigate = useNavigate()
  // const { setUserDetails } = useContext(UserContext);

  // useEffect(() => {
  //   const payload = localStorage.getItem('user');
  //   if (payload) {
  //       const user = JSON.parse(payload);

  //       setUserDetails({
  //           id: user.$id,
  //           name: user.name,
  //           email: user.email,
  //           // phoneNumber: user.phoneNumber,
  //           imgUrl: user.img,
  //       });
  //   } else {
  //       navigate('/Login');
  //   }
  // }, [])
  return (
    <div className="container flex-col h-screen">
      <NavBar/>
      <section>
        <Outlet/>
      </section>
  </div>
  )
}

export default PageLayout