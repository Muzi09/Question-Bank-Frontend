import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Sidenavbar() {
    const [exploreQuestionToggle, setExploreQuestionToggle] = useState(false)
    const [sections, setSections] = useState([])
    const [subjects, setSubjects] = useState([])
    const [subjectID, setSubjectID] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/user/subjects')
            .then((res) => {
                setSubjects(res.data.data)
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (subjectID) {
            axios.get(`http://localhost:3001/user/subject/${subjectID}/sections`)
                .then((res) => {
                    setSections(res.data.data)
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }

    }, [subjectID])

    const handleOpenSection = (sectionId) => {
        navigate(`/starttest?sectionID=${sectionId}&subjectID=${subjectID}`)
    }

    const handleSubjectButtonClick = (subjectId) => {
        setSubjectID(subjectId)
        setExploreQuestionToggle(!exploreQuestionToggle)
    }

    return (
        <div>
            <div id='container' style={{ marginBottom: "4vh" }}>
                {subjects.map((subject) => (
                    <Button
                        key={subject._id}
                        onClick={() => handleSubjectButtonClick(subject._id)}
                        variant="dark"
                        style={{border: "1px solid gray", marginTop: "2vh", marginLeft: "2vw", marginBottom: "1vh", fontSize: "3.5vmin" }}
                    >
                        {subject.subjectName}
                    </Button>
                ))}

                <Collapse in={exploreQuestionToggle}>
                    <div
                        style={{
                            border: "1px solid gray",
                            borderRadius: "1em",
                            marginTop: "2vh",
                            marginLeft: "2vw",
                            width: "80vw",
                            height: "70vh",
                        }}
                    >
                        <ul>
                        {sections.map((section) => (
                                <li
                                    key={section._id}
                                    style={{
                                        listStyleType: "none",
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        paddingRight: "5vw",
                                        paddingTop: "3vh",
                                        textAlign: 'left',
                                    }}>
                                    <Button 
                                        className='bg-dark'
                                        onClick={() => handleOpenSection(section._id)}
                                        style={{border: "1px solid gray", textAlign: "left", fontSize: "3vmin" }}
                                    >
                                        {section.sectionName}
                                    </Button>
                                </li>
                        ))}
                        </ul>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default Sidenavbar
