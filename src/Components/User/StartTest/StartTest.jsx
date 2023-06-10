import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TopNavbar from '../TopNavbar/TopNavbar'
import { Button } from 'react-bootstrap';
import '../StartTest/StartTest.css'


import { BeatLoader } from 'react-spinners'




function StartTest() {

    const [fetchedQuestions, setFetchedQuestions] = useState([])
    const [questionsCount, setQuestionsCount] = useState(0)
    const [sectionName, setSectionName] = useState("")
    const [timer, setTimer] = useState(10)
    const [numOfMCQ, setNumOfMCQ] = useState(10)

    const [errorMessage, setErrorMessage] = useState("")
    const [showSetup, setShowSetup] = useState(true)
    const [showQuestions, setShowQuestions] = useState(false)

    const [questionNumber, setQuestionNumber] = useState(1)


    const [questionIndex, setQuestionIndex] = useState(0)


    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const [count, setCount] = useState(0)

    const [showResults, setShowResult] = useState(false)


    const [isTestFinished, setIsTestFinished] = useState(false)


    const [resetCount, setResetCount] = useState(0)
    

    const [showAnswer, setShowAnswer] = useState(false)


    const [loading, setLoading] = useState(true)


    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)




    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }



    const startTimer = (inputMinutes) => {
        setMinutes(inputMinutes)
        setSeconds(0)
    }



    useEffect(() => {
        let interval = null;

        if ((minutes === 0 && seconds === 0) || isTestFinished) {
            clearInterval(interval);
        } else if (seconds === 0) {
            interval = setInterval(() => {
                setMinutes((prevMinutes) => prevMinutes - 1)
                setSeconds(59)
            }, 1000)
        } else {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [minutes, seconds, isTestFinished])



    useEffect(() => {
        if (searchParams.get('sectionID') == null) {
            axios.get(`https://question-bank-backend.onrender.com/admin/subjectName/${searchParams.get('subjectID')}`)
                .then((res) => {
                    setSectionName(res.data.data.subjectName)
                })
                .catch((err) => { console.log(err.message) })
        }

        else {
            axios.get(`https://question-bank-backend.onrender.com/admin/sectionName/${searchParams.get('sectionID')}`)
                .then((res) => {
                    setSectionName(res.data.data.sectionName)
                })
                .catch((err) => { console.log(err.message) })

        }
    }, [resetCount])
        



    useEffect(() => {
        if (searchParams.get('sectionID') == null) {
            axios.get(`https://question-bank-backend.onrender.com/user/subject/${searchParams.get('subjectID')}/questions`)
                .then((res) => {
                    setFetchedQuestions(shuffleArray(res.data.data))
                    setQuestionsCount(res.data.data.length)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        else {
            axios.get(`https://question-bank-backend.onrender.com/user/subject/${searchParams.get('subjectID')}/section/${searchParams.get('sectionID')}/questions`)
                .then((res) => {
                    setFetchedQuestions(shuffleArray(res.data.data))
                    setQuestionsCount(res.data.data.length)
                    setLoading(false)
                })
                .catch((err) => { console.log(err) })
        }

    }, [resetCount])
        

    const handleSetTimer = (e) => {
        setTimer(e.target.value)
    }

    const handleSetNum = (e) => {
        if (e.target.value > questionsCount || e.target.value < 1) {
            setErrorMessage("Please enter number of questions lesser than the available questions")
        }
        else {
            setNumOfMCQ(e.target.value)
            setErrorMessage("")
        }
    }


    const handleQuickStart = () => {
        setTimer(10)
        setNumOfMCQ(10)
        setShowSetup(false)
        setShowQuestions(true)

        startTimer(timer)

    }

    const handleCustomStart = () => {
        if (!errorMessage) {
            setTimer(timer)
            setNumOfMCQ(numOfMCQ)
            setShowSetup(false)
            setShowQuestions(true)

            startTimer(timer)

        }
    }


    const handleNextQuestion = () => {
        if (questionIndex < numOfMCQ - 1) {
            setQuestionIndex(prev => prev + 1)
            setQuestionNumber(prev => prev + 1)
        }
    }

    const handlePrevQuestion = () => {
        if (questionIndex > 0) {
            setQuestionIndex(prev => prev - 1)
            setQuestionNumber(prev => prev - 1)
        }
    }


    const handleOptionSelect = (option) => {
        const updatedQuestions = [...fetchedQuestions];
        const currentQuestion = updatedQuestions[questionIndex];
      
        if (currentQuestion.selectedOption === option) {
          currentQuestion.selectedOption = null;
        } else {
          currentQuestion.selectedOption = option;
        }
      
        setFetchedQuestions(updatedQuestions);
      
        const count = updatedQuestions.reduce((acc, question, index) => {
          if (question.answer === question.selectedOption && index < numOfMCQ) {
            return acc + 1;
          }
          return acc;
        }, 0);
      
        setCount(count);
      }
      







    useEffect(() => {
        if (showQuestions) {
            if (minutes == 0 && seconds == 0) {
                handleFinish()
            }

        }

    }, [minutes, seconds])


    const handleFinish = () => {
        setShowQuestions(false);
        setShowResult(true);
        setIsTestFinished(true);
    }

    function renderFeedback() {

        if (Math.round(eval(count / numOfMCQ) * 100) < 30) {
            return '"Need a lot of Improvement"'
        }
        else if (Math.round(eval(count / numOfMCQ) * 100) >= 30 && Math.round(eval(count / numOfMCQ) * 100) <= 50) {
            return '"Not Quite the efforts required"'
        }
        else if (Math.round(eval(count / numOfMCQ) * 100) >= 50 && Math.round(eval(count / numOfMCQ) * 100) <= 80) {
            return '"Well Done! Almost there"'
        }
        else if (Math.round(eval(count / numOfMCQ) * 100) >= 80) {
            return '"Excellent Work! Just a step away cracking your dream exam"'
        }
    }



    const resetTest = () => {
        setResetCount(resetCount + 1)
        setTimer(10)
        setNumOfMCQ(10)
        setErrorMessage('')
        setShowSetup(true)
        setShowQuestions(false)
        setQuestionNumber(1)
        setQuestionIndex(0)
        setMinutes(0)
        setSeconds(0)
        setCount(0)
        setShowResult(false)
        setIsTestFinished(false)
    }



    const handleShowAnswers = () => {
        setShowAnswer(true)
        setShowResult(false)
        setQuestionIndex(0)
        setQuestionNumber(1)
    }



    const handleBackToResult = () => {
        setShowAnswer(false)
        setShowResult(true)
    }















    return (
        <div>
            <TopNavbar />

            {loading ?
                    <div style={{}} className="d-flex justify-content-center">
                        <BeatLoader style={{marginTop: "30vh" }} color="#343a40" size={20} />
                    </div> :


            <div style={{ overflow: "auto", boxSizing: "border-box", width: "90vw", backgroundColor: 'darkslategray', marginLeft: "5vw", marginTop: "5vh", borderRadius: "1em" }}>

               
                        {showSetup &&
                            <div style={{ fontSize: "3vmin" }}>
                                <h3 style={{ fontSize: "4vmin", color: "whitesmoke", paddingLeft: "1.5vw", paddingTop: "2vh" }}>{sectionName}</h3>

                                <div style={{ color: "whitesmoke", paddingLeft: "1.5vw" }}>Available MCQ's in this Unit - <span>{questionsCount}</span></div>

                                {errorMessage &&
                                    <div id='err' style={{ marginLeft: '1.5vw', width: "80vw", position: "fixed", color: "orange" }}>{errorMessage}</div>
                                }

                                <h5 style={{ fontSize: "vmin", marginLeft: "1.5vw", marginTop: "7vh", color: "lightgray" }} >Custom set up for the test</h5>

                                <div>
                                    <label style={{ marginTop: "2vh", marginLeft: "1.5vw", color: "lightgray" }} htmlFor="num">Set number of MCQ's -</label>
                                    <input min="1" placeholder='10 MCQs' onChange={(e) => { handleSetNum(e) }} id='num' style={{ marginLeft: "1vw", height: "3.3vh", width: "20vw", padding: "0.5vmax" }} type="number" />

                                </div>


                                <div>
                                    <label style={{ marginTop: "2vh", marginLeft: "1.5vw", color: "lightgray" }} htmlFor="timer">Set Timer (in minutes) - </label>
                                    <input placeholder='10 Min' onChange={(e) => { handleSetTimer(e) }} id='timer' style={{ marginLeft: "1vw", height: "3.3vh", width: "20vw", padding: "0.5vmax" }} type="number" />

                                </div>

                                <div id="btn-cont" style={{ marginBottom: "5vh", marginTop: "8%", display: 'flex', justifyContent: "center", flexWrap: "wrap" }}>
                                    <Button onClick={handleQuickStart} className='btn-lg' style={{ fontSize: "3.3vmin", marginRight: "5%" }}>Quick Start</Button>
                                    <Button style={{ fontSize: "3.3vmin" }} id="customstart" onClick={handleCustomStart} className='btn-secondary btn-lg'>Start with Custom Settings</Button>

                                </div>

                            </div>
                        }






                        {showAnswer &&
                            <div>
                                {fetchedQuestions &&

                                    <div style={{ margin: "2%" }}>

                                        <h4 style={{ display: "inline", color: "silver" }}>Question number {questionNumber} of {numOfMCQ}</h4>

                                        <p style={{ fontSize: "3.5vmin", marginTop: "3vh", color: "white" }}>{fetchedQuestions[questionIndex].question}</p>

                                        {fetchedQuestions[questionIndex].options.map((option) => (
                                            <div key={option}>
                                                <li style={{ listStyle: 'none' }}>
                                                    <Button
                                                        className={`btn-secondary ${option === fetchedQuestions[questionIndex].selectedOption ? 'btn-success' : ''}`}
                                                        style={{ fontSize: "3vmin", textAlign: 'left', display: 'block', marginTop: '2vh' }}
                                                    >
                                                        {option}
                                                    </Button>
                                                </li>
                                            </div>
                                        ))}



                                        <Button style={{ fontSize: "3vmin", backgroundColor: "lightgreen", color: "black", textAlign: 'left', display: 'block', marginTop: '5vh' }}>{fetchedQuestions[questionIndex].answer}</Button>

                                    </div>

                                }
                                <div id='btns-container' style={{ marginTop: "5vh", marginBottom: "5vh" }}>
                                    <Button id='btns' style={{ fontSize: "3vmin" }} className='btn-sm' onClick={handlePrevQuestion}>Previous Question</Button>
                                    <Button id='btns' style={{ fontSize: "3vmin" }} className='btn-sm' onClick={handleNextQuestion}>Next Question</Button>
                                    <Button id='btns' style={{ fontSize: "3vmin" }} className='btn-sm btn-danger' onClick={handleBackToResult}>Back to Results</Button>

                                </div>

                            </div>
                        }






                        {showResults &&
                            <div style={{ color: 'white' }}>
                                <h1 style={{ color: 'silver', marginLeft: "2vw", marginTop: "1vh" }}>Results</h1>

                                <h3 style={{ fontSize: "3.5vmin", marginTop: "3vh", marginLeft: "2vw", color: "lightgreen" }}>{renderFeedback()}</h3>

                                <h3 style={{ fontSize: "3.5vmin", marginLeft: "2vw", marginTop: "4vh" }}>Marks Obtained - {count} / {numOfMCQ}</h3>

                                <h3 style={{ fontSize: "3.5vmin", marginLeft: "2vw" }}>Accuracy - {Math.round(eval(count / numOfMCQ) * 100)}%</h3>

                                <h3 style={{ fontSize: "3.5vmin", marginLeft: "2vw" }}>
                                    Time Taken - {timer - minutes - 1} Min {60 - seconds} Sec
                                </h3>

                                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "6vh", marginBottom: "5vh" }}>
                                    <Button style={{ fontSize: "3vmin" }} className="btn-lg btn-danger" onClick={resetTest}>Retake Test</Button>
                                    <Button style={{ fontSize: "3vmin" }} className="btn-lg btn-success" onClick={handleShowAnswers} >See Answers</Button>

                                </div>
                            </div>
                        }






                        {showQuestions &&
                            <div>
                                {fetchedQuestions &&

                                    <div style={{ margin: "2%" }}>

                                        <h4 style={{ color: "silver" }}>Question number {questionNumber} of {numOfMCQ}</h4>

                                        <div style={{ color: "white" }}>
                                            Time Left : &nbsp;
                                            <span style={{ color: "lightgreen" }}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
                                        </div>

                                        <p style={{ fontSize: "3.5vmin", marginTop: "3vh", color: "white" }}>{fetchedQuestions[questionIndex].question}</p>

                                        {fetchedQuestions[questionIndex].options.map((option) => (
                                            <div key={option}>
                                                <li style={{ listStyle: 'none' }}>
                                                    <Button
                                                        onClick={() => handleOptionSelect(option)}
                                                        className={`btn-secondary ${option === fetchedQuestions[questionIndex].selectedOption ? 'btn-success' : ''}`}
                                                        style={{ fontSize: "3vmin", textAlign: 'left', display: 'block', marginTop: '2vh' }}
                                                    >
                                                        {option}
                                                    </Button>
                                                </li>
                                            </div>
                                        ))}

                                    </div>

                                }
                                <div id='btns-container' style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                                    <Button style={{ fontSize: "3vmin" }} id='btns' className='btn-sm' onClick={handlePrevQuestion}>Previous Question</Button>
                                    <Button style={{ fontSize: "3vmin" }} id='btns' className='btn-sm' onClick={handleNextQuestion}>Next Question</Button>
                                    <Button style={{ fontSize: "3vmin" }} id='btns' className='btn-danger btn-sm' onClick={handleFinish} >Finish Test</Button>

                                </div>


                            </div>
                        }


            </div>
                }
        </div>
    )
}

export default StartTest
