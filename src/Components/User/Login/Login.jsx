import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const [colorid, setColorId] = useState('orange')
  const [message, setMessage] = useState("")


  const navigate = useNavigate()


  const handleLogin = () => {


    if (!email || !password) {
      return setMessage("Please enter your registered email & password")
    }

    const redirect = () => {
      navigate('/')
    }

    setMessage("")


    axios.post('https://question-bank-backend.onrender.com/user/login', {
      email: email,
      password: password
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        setMessage(res.data.message)

        setColorId('lightgreen')
        setTimeout(redirect, 2000)

      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
  }


  console.log(message)

  return (
    <div>

      <div style={{ overflow: "auto", boxSizing: "border-box", width: "80vw", backgroundColor: 'darkslategray', marginLeft: "10vw", marginTop: "6vh", borderRadius: "1em" }}>

        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
          <h1 style={{  marginTop: "3vh" }}>Logo</h1>

          <p style={{ fontSize: "3vmin", color: "silver", marginTop: "3vh" }}>Enter your credentials to access your account</p>



          {message &&
            <p style={{fontSize: "3vmin", color: colorid, position: "relative", top: "26%" }}>{message}</p>
          }


          <input onChange={(e) => { setEmail(e.target.value) }} placeholder='Your email here' type="email" style={{ fontSize: "3vmin", width: "50vmin", marginTop: "4vh" }} />

          <input onChange={(e) => { setPassword(e.target.value) }} placeholder='Your password here' type="password" style={{ fontSize: "3vmin", width: "50vmin", marginTop: "4vh" }} />

          <Button onClick={handleLogin} className='btn-success' style={{fontSize: "3vmin", marginTop: "5vh" }}>Login</Button>


          <p style={{
            fontSize: "3vmin",
            color: "silver", marginTop: "3vh"
          }}>Dont have an account? <span style={{ textDecoration: "none", cursor: "pointer", color: "cyan" }} className='btn-link' onClick={() => { navigate('/signup') }} >Create Account Here</span> </p>

          <Button onClick={() => { navigate("/") }} style={{fontSize: "3vmin", marginBottom: "2vh", marginTop: "1vh" }} className='btn-secondary'>Skip for now </Button>

        </div>

      </div>
    </div>
  )
}

export default Login
