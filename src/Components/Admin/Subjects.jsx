import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Subjects() {

    const [subject, setSubject] = useState([])
    const [addSubject, setAddSubject] = useState(false)
    const [subjectName, setSubjectName] = useState("")
    const [showDelete, setShowDelete] = useState(false)
    const [deleteButtonText, setDeleteButtonText] = useState("Delete subjects")

    const [feedback, setFeedback] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://question-bank-backend.onrender.com/user/subjects')
            .then((res) => { setSubject(res.data.data) })
            .catch((err) => { console.log(err) })
    }, [])


    useEffect(() => {
        axios.get('https://question-bank-backend.onrender.com/user/feedback')
            .then((res) => { setFeedback(res.data.data) })
            .catch((err) => { console.log(err) })
    }, [])


    const handleCreatesubject = () => {
        if (subjectName) {
            axios.post('https://question-bank-backend.onrender.com/admin/subject', { subjectName: subjectName })
                .then((res) => {
                    setSubject([...subject, res.data.data])
                })
                .catch((err) => {
                    console.log(err.message)
                })
            setAddSubject(false)
            setSubjectName("")
        }
    }


    const handlesubjectDelete = (subjectID) => {
        axios.delete(`https://question-bank-backend.onrender.com/admin/subject/${subjectID}`)
            .then((res) => {
                const updatedsubject = subject.filter((item) => item._id !== subjectID);
                setSubject(updatedsubject);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleOpensubject = (subjectID) => {
        navigate(`/sections?subjectID=${subjectID}`)
    }



    const handleDelete = () => {
        setShowDelete((prevState) => !prevState)
        setDeleteButtonText((prevText) => prevText === "Delete subjects" ? "Cancel" : "Delete subjects")
    }



    console.log(feedback)



    return (


        <div className='container-fluid'>
            <div>
                <h1 className="display-4 fw-bold" style={{ margin: "0.2em" }}>
                    Subjects
                </h1>
            </div>

            <button className='btn btn-md btn-success' style={{ marginLeft: '1vw' }} onClick={() => { setAddSubject(true) }}>Create new subject</button>

            <button className='btn btn-md btn-danger' style={{ marginLeft: "3vw" }} onClick={handleDelete}>{deleteButtonText}</button>

            <hr />

            {addSubject &&
                <div className='card bg-secondary' style={{ width: "50%", marginLeft: "25%", height: "10em", marginTop: "1em", position: "fixed", boxSizing: "border-box" }}>
                    <input style={{ width: "50%", alignSelf: "center", marginTop: "2em" }} placeholder='Subject name here' onChange={(e) => { setSubjectName(e.target.value) }}></input>
                    <button className='btn btn-success btn-sm' style={{ alignSelf: "center", marginTop: "2em", boxSizing: "border-box" }} onClick={handleCreatesubject}>Create subject</button>
                    <button className='btn btn-danger btn-sm' style={{ width: "5%", position: "absolute" }} onClick={() => { setAddSubject(false) }}>X</button>
                </div>
            }

            {subject && <div>
                {subject.map((item) => {
                    return (
                        <ul style={{ margin: "2vh" }} key={item._id}>
                            <li style={{ listStyleType: "none" }}>
                                <button className='btn btn-primary btn-md-lg' onClick={() => { handleOpensubject(item._id) }}>{item.subjectName}</button>
                                {showDelete && <button className='btn btn-danger btn-sm' onClick={() => { handlesubjectDelete(item._id) }}>Delete</button>}
                            </li>
                        </ul>
                    )
                })}
            </div>}


            <hr />

            <h2>Feedbacks & Requests</h2>

            {feedback && <div>
                <ul>
                    {feedback.map((item) => {
                        return (
                            <li>{item.feedback}</li>
                        )
                    })}
                </ul>
            </div>}

        </div>



    )
}

export default Subjects

