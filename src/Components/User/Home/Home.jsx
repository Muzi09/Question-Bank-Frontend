import React from 'react'
import TopNavbar from '../TopNavbar/TopNavbar'
import SideNavbar from '../SideNavbar/SideNavbar'
import { useNavigate } from 'react-router-dom'


function Home() {

  
  const navigate = useNavigate()


  return (
    <div>
      <TopNavbar/>
      <SideNavbar/>
      <button onClick={() => {navigate("/admin")}}>admin</button>
    </div>
  )
}

export default Home
