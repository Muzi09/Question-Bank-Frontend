import React from 'react'
import TopNavbar from '../TopNavbar/TopNavbar'

import linkedin from '../../assets/image.png'
import gitlogo from '../../assets/WhatsApp_icon.png'
import gmail from '../../assets/Gmail_logo_PNG6.png'
import { Button } from 'react-bootstrap'
import axios from 'axios'

import { useState } from 'react'





function Contact() {

    const [feedback, setFeeback] = useState("")
    const [showSubmitted, setShowSubmitted] = useState(false)
    const [showFeedbackTaker, setShowFeedbackTaker] = useState(true)
    const [emptyFeeback, setEmptyFeedback] = useState(false)




    const email = "amzikhan711@gmail.com"
    const subject = ""
    const body = ""
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`


    function handleClick() {
        window.open(gmailUrl, "Compose Email", "height=400,width=600")
        console.log("object")
    }


    const handleFeedbackSubmit = () => {
        if (feedback) {
            setEmptyFeedback(false)
            axios.post('https://question-bank-backend.onrender.com/user/contact/feeback', { feedback: feedback })
                .then((res) => {
                    setFeeback(res.data.data)
                    setShowSubmitted(true)
                    setShowFeedbackTaker(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        else {
            setEmptyFeedback(true)
        }

    }





    return (
        <div>
            <TopNavbar></TopNavbar>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginTop: "3vh", marginLeft: "2vw" }}>
                    <img style={{ marginBottom: "1.5vh", width: "5vmin", height: "5vmin" }} src={linkedin} id='linkedin' />
                    <a style={{ marginLeft: "2vh", fontSize: "larger", textDecoration: "none" }} className='btn-link' id='linked-in-link'  href="https://www.linkedin.com/in/MuzammilKhan19" target='_blank'>Linked In</a>

                </div>


                <div style={{ marginTop: "1vh", marginLeft: "1.4vw" }}>
                    <img style={{ marginBottom: "1.5vh", width: "7vmin", height: "7vmin" }} src={gitlogo} id='git-hub' />
                    <a style={{ marginLeft: "1.1vh", fontSize: "larger", textDecoration: "none" }} className='btn-link' id='git-hub-link' href=" https://wa.me/8234971938?text=Hello" target='_blank'>Whatsapp</a>

                </div>

                <div style={{ marginTop: "1vh", marginLeft: "2vw" }}>
                    <img style={{ marginBottom: "1.5vh", width: "6vmin", height: "5vmin" }} src={gmail} id='gmail' />
                    <a style={{ marginLeft: "2vh", fontSize: "larger", textDecoration: "none" }} className='btn-link' id='gmail-link' href='#' onClick={handleClick}>Gmail</a>

                </div>


                {showFeedbackTaker &&
                    <>
                        <h5 style={{ fontSize: "3vmin", margin: "auto", marginTop: "5vh" }}>Help us improve. We would love to hear from you <span role="img" aria-label="smile emoji">&#x1F60A;</span> </h5>

                        <textarea onChange={(e) => { setFeeback(e.target.value) }} placeholder='Write your review here...' style={{ border: "1px solid grey", borderRadius: "0.3em", padding: "0.4em", width: "40vw", height: "30vh", fontSize: "3vmin", margin: "auto", marginTop: "4vh" }} name="" id="" cols="30" rows="10"></textarea>

                        <Button onClick={handleFeedbackSubmit} style={{ fontSize: "3vmin", margin: "auto", marginTop: "3vh" }}>Submit</Button>

                    </>
                }


                {showSubmitted &&
                    <>
                        <h5 style={{ fontSize: "3vmin", margin: "auto", marginTop: "15vh" }}>Thank You for your valuable feedback we will try to improve on it <span role="img" aria-label="grinning face">&#x1F600;</span>
                        </h5>

                    </>

                }




            </div>
        </div>
    )
}

export default Contact
