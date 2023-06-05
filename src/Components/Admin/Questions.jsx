import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Questions() {
  const [toggleTextArea, setToggleTextArea] = useState(false);
  const [toggleTextAreaText, setToggleTextAreaText] = useState("Add Questions");
  const [questionText, setQuestionText] = useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [sectionName, setSectionName] = useState("")

  
  const [showDelete, setShowDelete] = useState(false)
  const [deleteButtonText, setDeleteButtonText] = useState("Delete Questions")
  
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)



  
  const handleQuestionFormat = () => {
    let questionsArray = questionText.trim().split("\n\n")
    let finalArray = [];

    class QuestionInit {
      constructor(question, options, answer) {
        this.subjectID = searchParams.get('subjectID')
        this.sectionID = searchParams.get('sectionID')
        this.question = question;
        this.options = options;
        this.answer = answer;
      }
    }

    questionsArray.forEach((item) => {
      let splitted = item.split("\n")
      let question = splitted[0]
      let options = [splitted[1].trim(), splitted[2].trim(), splitted[3].trim(), splitted[4].trim()]
      let answer = splitted[5].split(": ")[1].trim()
      let Mcq = new QuestionInit(question, options, answer)
      finalArray.push(Mcq)
    })

    setQuestionArray(finalArray)
    uploadQuestions(finalArray)
  }

  
  const uploadQuestions = (questions) => {

    axios.post('https://question-bank-backend.onrender.com/admin/subject/section/question', questions)
      .then((res) => { console.log(res.data)})
      .catch((err) => { console.log(err.response.data.message)})
      setFetchedQuestions([...fetchedQuestions, ...questions]);
      setToggleTextArea(false)
      setToggleTextAreaText(toggleTextArea ? "Add Questions" : "Cancel")
  }

  const handleToggle = () => {
    setToggleTextArea(!toggleTextArea)
    setToggleTextAreaText(toggleTextArea ? "Add Questions" : "Cancel")
  }

  useEffect(() => {
    axios.get(`https://question-bank-backend.onrender.com/user/subject/${searchParams.get('subjectID')}/section/${searchParams.get('sectionID')}/questions`)
      .then((res) => { setFetchedQuestions(res.data.data) })
      .catch((err) => { console.log(err.response.data.message) })
  }, [])


  useEffect(() => {
    axios.get(`https://question-bank-backend.onrender.com/admin/sectionName/${searchParams.get('sectionID')}`)
    .then((res) => {setSectionName(res.data.data.sectionName)})
    .catch((err) => {console.log(err.response.data.message)})
  }, [])


  const handleDelete = () => {
    setShowDelete((prevState) => !prevState)
    setDeleteButtonText((prevText) => prevText === "Delete Questions" ? "Cancel" : "Delete Questions")
  }


  const handleQuestionDelete = (questionId) => {
    console.log(questionId)
    axios.delete(`https://question-bank-backend.onrender.com/admin/subject/section/question/${questionId}`)
      .then((res) => {
        const updatedQuestion = fetchedQuestions.filter((item) => item._id !== questionId);
        setFetchedQuestions(updatedQuestion);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <div>
      <div>
      <h1 className="display-4 fw-bold" style={{ margin: "0.2em" }}>
        MCQ Questions in <span style={{color: 'orange'}}>{sectionName}</span>
      </h1>
    </div>
    


      <button className='btn btn-success btn-md' style={{marginTop: "0.2em", marginLeft: "1em" }} onClick={handleToggle}>{toggleTextAreaText}</button>

      <button className='btn btn-md btn-danger' style={{marginTop: "0.2em", marginLeft: "2em" }} onClick={handleDelete}>{deleteButtonText}</button>
      

      

      {toggleTextArea &&
        <div>
          <textarea onChange={(e) => { setQuestionText(e.target.value) }} style={{ width: "90vw", height: "80vh", marginLeft: "5%", marginTop: "1em", padding: "1em" }}></textarea>
          <button onClick={handleQuestionFormat} className='btn btn-primary btn-md' style={{ float: "right", margin: "2em" }}>Submit</button>
        </div>
      }


      {fetchedQuestions &&
        <div style={{}}>
            {fetchedQuestions.map((item) => {
              return (
                <div style={{margin: "1.5em"}}>
                  <ul key={item._id}>

                    <li style={{ listStyleType: "none" }}><div>{item.question}</div></li>

                    <li style={{ listStyleType: "none" }}><div>{item.options.map((option) => {
                    return (
                      <div>{option}</div>
                    )
                  })}
                  </div></li>


                  <li style={{ listStyleType: "none" }}><div>Answer: {item.answer}</div></li>


                  </ul>
                  

                  

                  

                  
                {showDelete && <button className='btn btn-danger btn-sm' onClick={() => { handleQuestionDelete(item._id) }} style={{marginLeft: "1.5em"}}>Delete</button>}

                  <hr />
                  
                </div>
              )
            })}
        </div>
      }


    </div>
  )
}

export default Questions
