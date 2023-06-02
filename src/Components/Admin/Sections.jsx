import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

function Sections() {
  const [section, setSection] = useState([])
  const [addSection, setAddSection] = useState(false)
  const [sectionName, setSectionName] = useState("")
  const [showDelete, setShowDelete] = useState(false)
  const [deleteButtonText, setDeleteButtonText] = useState("Delete Sections")

  const [subjectName, setSubjectName] = useState("")

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  
  let subjectID = searchParams.get('subjectID')
  

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/user/subject/${searchParams.get('subjectID')}/sections`)
      .then((res) => { setSection(res.data.data) })
      .catch((err) => { console.log(err) })
  }, [])


  useEffect(() => {
    axios.get(`http://localhost:3001/admin/subjectName/${searchParams.get('subjectID')}`)
    .then((res) => {setSubjectName(res.data.data.subjectName)})
    .catch((err) => {console.log(err.response.data.message)})
  }, [])

  
  const handleCreateSection = () => {
    if (sectionName) {
      axios.post('http://localhost:3001/admin/subject/section', { subjectID: subjectID, sectionName: sectionName })
        .then((res) => {
          setSection([...section, res.data.data])
        })
        .catch((err) => {
          console.log(err.message)
        })
      setAddSection(false)
      setSectionName("")
    }
  }


  const handleSectionDelete = (sectionID) => {
    axios.delete(`http://localhost:3001/admin/subject/section/${sectionID}`)
      .then((res) => {
        const updatedSection = section.filter((item) => item._id !== sectionID);
        setSection(updatedSection);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleOpenSection = (sectionID) => {
    navigate(`/questions?subjectID=${subjectID}&sectionID=${sectionID}`);
  }
  


  const handleDelete = () => {
    setShowDelete((prevState) => !prevState)
    setDeleteButtonText((prevText) => prevText === "Delete Sections" ? "Cancel" : "Delete Sections")
  }

  return (
    <div className='container-fluid'>
      <div>
      <h1 className="display-4 fw-bold" style={{ margin: "0.2em" }}>
        Sections in <span style={{color: "forestgreen"}}>{subjectName}</span>
      </h1>
    </div>

      <button className='btn btn-md btn-success' style={{ marginLeft: '1em' }} onClick={() => { setAddSection(true) }}>Create new section</button>

      <button className='btn btn-md btn-danger' style={{ marginLeft: "2em" }} onClick={handleDelete}>{deleteButtonText}</button>

      <hr />

      {addSection &&
        <div className='card bg-secondary' style={{ width: "50%", marginLeft: "25%", height: "10em", marginTop: "1em", position: "fixed", boxSizing: "border-box" }}>
          <input style={{ width: "50%", alignSelf: "center", marginTop: "2em" }} placeholder='Section name here' onChange={(e) => { setSectionName(e.target.value) }}></input>
          <button className='btn btn-success btn-sm' style={{ alignSelf: "center", marginTop: "2em", boxSizing: "border-box" }} onClick={handleCreateSection}>Create Section</button>
          <button className='btn btn-danger btn-sm' style={{ width: "5%", position: "absolute" }} onClick={() => { setAddSection(false) }}>X</button>
        </div>
      }

      {section && <div>
        {section.map((item) => {
          return (
            <ul style={{ margin: "2vh" }} key={item._id}>
              <li style={{ listStyleType: "none" }}>
                <button className='btn btn-primary btn-md-lg' onClick={() => { handleOpenSection(item._id) }}>{item.sectionName}</button>
                {showDelete && <button className='btn btn-danger btn-sm' onClick={() => { handleSectionDelete(item._id) }}>Delete</button>}
              </li>
            </ul>
          )
        })}
      </div>}
    </div>
  )
}

export default Sections

