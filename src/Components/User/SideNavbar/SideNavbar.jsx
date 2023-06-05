import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { BeatLoader } from 'react-spinners'

function Sidenavbar() {
    const [exploreQuestionToggle, setExploreQuestionToggle] = useState(false);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [subjectID, setSubjectID] = useState('');
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
    const [isLoadingSections, setIsLoadingSections] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('https://question-bank-backend.onrender.com/user/subjects')
            .then((res) => {
                setSubjects(res.data.data);
                setIsLoadingSubjects(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoadingSubjects(false);
            });
    }, []);

    useEffect(() => {
        if (subjectID) {
            setIsLoadingSections(true)
            axios
                .get(`https://question-bank-backend.onrender.com/user/subject/${subjectID}/sections`)
                .then((res) => {
                    setSections(res.data.data)
                    setIsLoadingSections(false)
                })
                .catch((err) => {
                    console.log(err.response)
                    setIsLoadingSections(false)
                });
        }
    }, [subjectID]);

    const handleOpenSection = (sectionId) => {
        navigate(`/starttest?sectionID=${sectionId}&subjectID=${subjectID}`);
    };

    const handleSubjectButtonClick = (subjectId) => {
        setSubjectID(subjectId)
        setExploreQuestionToggle(!exploreQuestionToggle);
    };

    return (
        <div>
            <div id="container" style={{ marginBottom: '4vh' }}>
                {isLoadingSubjects ? (
                    <div className="d-flex justify-content-center mt-5">
                        <BeatLoader style={{ position: "absolute", left: "48vw", top: "40vh" }} color="#343a40" size={20} />
                    </div>
                ) : (
                    <>
                        {subjects.map((subject) => (
                            <Button
                                key={subject._id}
                                onClick={() => handleSubjectButtonClick(subject._id)}
                                variant="dark"
                                style={{
                                    border: '1px solid gray',
                                    marginTop: '2vh',
                                    marginLeft: '2vw',
                                    marginBottom: '1vh',
                                    fontSize: '3.2vmin',
                                }}
                            >
                                {subject.subjectName}
                            </Button>
                        ))}
                        <Collapse in={exploreQuestionToggle}>
                            <div
                                style={{
                                    border: '1px solid gray',
                                    borderRadius: '1em',
                                    marginTop: '2vh',
                                    marginLeft: '2vw',
                                    width: '80vw',
                                    height: '70vh',
                                }}
                            >
                                {isLoadingSections ? (
                                    <div className="d-flex justify-content-center">
                                        <BeatLoader color="#343a40" size={10} />
                                    </div>
                                ) : (
                                    <ul>
                                        {sections.map((section) => (
                                            <li
                                                key={section._id}
                                                style={{
                                                    listStyleType: 'none',
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    paddingRight: '5vw',
                                                    paddingTop: '3vh',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                <Button
                                                    className="bg-dark"
                                                    onClick={() => handleOpenSection(section._id)}
                                                    style={{
                                                        border: '1px solid gray',
                                                        textAlign: 'left',
                                                        fontSize: '2.8vmin',
                                                    }}
                                                >
                                                    {section.sectionName}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Collapse>
                    </>
                )}
            </div>
        </div>
    );
}

export default Sidenavbar;

