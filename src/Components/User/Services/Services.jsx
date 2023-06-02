import React from 'react'
import TopNavbar from '../TopNavbar/TopNavbar'
import services from '../Services/services-icon.png'

function Services() {
    return (
        <div>
            <TopNavbar></TopNavbar>

            <div style={{ marginLeft: "2vw", marginRight: "2vw", marginLeft: "2vw", marginBottom: "4vh", marginTop: "2.5vh" }}>
                <h4>Services we provide <img style={{ width: "6vmin", marginBottom: "3vh" }} src={services} /></h4>

            </div>

        </div>
    )
}

export default Services
