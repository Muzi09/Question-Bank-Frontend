import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



function Signup() {


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [colorid, setColorId] = useState('orange')

  const [message, setMessage] = useState("")

  const navigate = useNavigate()



  const handleSignup = (event) => {
    event.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      return setMessage("All fields are required")
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match")
    }

    if (name.length < 3) {
      return setMessage("Name is too short")
    }

    if (password.length < 6) {
      return setMessage("Password must be of minimum 6 characters")
    }

    if (!email.includes('@')) {
      return setMessage("Please enter a valid email")
    }

    if (!email.includes('.')) {
      return setMessage("Please enter a valid email")
    }


    const alphanumericRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&]+$/
    if (!alphanumericRegex.test(password)) {
      return setMessage("Password must be alphanumeric (Must contain a capital letter, small letter & a number)")
    }

    const redirect = () => {
      navigate('/')
    }

    setMessage("")


    axios.post('https://question-bank-backend.onrender.com/user/signup', {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
      .then((res) => {
        setMessage(res.data.message)
        setColorId('lightgreen')

        setTimeout(redirect, 2000)

      })

      .catch((err) => {
        setMessage(err.response.data.message)
      })
  }






  return (
    <div>

      <div style={{ overflow: "auto", boxSizing: "border-box", width: "80vw", backgroundColor: 'darkslategray', marginLeft: "10vw", marginTop: "6vh", borderRadius: "1em" }}>

        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>

          <h1 style={{ marginTop: "3vh" }}>Logo</h1>


          <p style={{fontSize: "3vmin", color: "silver", marginLeft: "2vw", marginTop: "2vh" }}>Create a new account using email to keep track of your progress</p>


          {message &&
            <p style={{fontSize: "3vmin", marginRight: "2vw", marginLeft: "2vw", color: colorid, position: "relative", top: "26%" }}>{message}</p>
          }


          <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Your name here' style={{ width: "50vmin", fontSize: "3vmin", marginTop: "1vh"}} />

          <input onChange={(e) => { setEmail(e.target.value) }} placeholder='Your email here' type="email" style={{ width: "50vmin", fontSize: "3vmin", marginTop: "3vh"}} />

          <input onChange={(e) => { setPassword(e.target.value) }} placeholder='Create password' type="password" style={{ width: "50vmin", fontSize: "3vmin", marginTop: "3vh"}} />

          <input onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder='Re-enter password' type="password" style={{ width: "50vmin", fontSize: "3vmin", marginTop: "3vh"}} />

          <Button onClick={handleSignup} className='btn-success' style={{fontSize: "3vmin", marginTop: "3.5vh" }}>Submit</Button>




          <p style={{
            color: "silver", marginTop: "1.5vh",fontSize: "3vmin"
          }}>Already have an account <span style={{fontSize: "3vmin",  textDecoration: "none", color: "cyan", cursor: "pointer" }} className='btn-link' onClick={() => { navigate('/login') }} >Login Here</span> </p>

          <Button onClick={() => {navigate("/")}} style={{fontSize: "3vmin", marginBottom: "4vh", marginTop: "2vh"}} className='btn-secondary'>Skip for now </Button>
          
        </div>

      </div>
    </div>
  )
}

export default Signup
