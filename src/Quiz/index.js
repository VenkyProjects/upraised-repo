import { useEffect, useState } from "react";
import styles from './styles.module.css'
import React from "react";
// import ProgressBar from "./ProgressBar";
import useListQuestions from "./hooks/useListQusetion";
import Startpage from "./StartPage";
import SemiCircleProgressBar from "./SemiCircleProgressbar";
// import SemiCircleProgressBar from "react-progressbar-semicircle";

function Quiz(){
    const{createData,createLoading}=useListQuestions()
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const[allow,setAllow]=useState('false')
    const [seconds, setSeconds] = useState(0);
    const[submittedAnswers,setSubmittedAnswers]=useState([])
    const[accepted,setAccepted]=useState(false)
    // const [selectedOption, setSelectedOption] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const[open,setOpen]=useState(false)

    const onClickNext = (index) => {
        setSelectedAnswerIndex(null);

        if (questionIndex !== createData.length - 1) {
          setQuestionIndex(questionIndex + 1);
          setActiveQuestion((prev) => prev + 1)
        } else {
          setActiveQuestion(0)
          setShowResult(true)
        }
        if(!accepted){
            setResult((prev) =>
            selectedAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
              }
            : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )
        }
        
    };
    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

    const handleStartAgain=()=>{
        setSeconds(createData.length * 60); // Reset the timer to the initial value
        setAccepted(false)
        setShowResult(!showResult)
        setQuestionIndex(0)
        setResult({
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        })
    }
    const handleReviewAnswers=()=>{
        setShowResult(!showResult)
        setQuestionIndex(0)
        setAccepted(!accepted)

    }
    const progress=!createLoading && (result.score/(createData.length*5))*100;
    console.log(progress,'progress');
    const currentQuestion = createLoading ? 'loading' : createData[questionIndex];

    const onAnswerSelected = (answer,index) => {
        setSubmittedAnswers((prevAnswers) => [...prevAnswers, answer]);
        setSelectedAnswerIndex(index);
        if (answer === currentQuestion.correct_answer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    };

    useEffect(() => {
        const totalTime = !createLoading && createData.length * 60;
        setSeconds(totalTime);
    }, [createLoading, createData]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                clearInterval(interval);
                setAllow(!allow) // Timer has reached 0, we can perform actions here
                setOpen(!open)

            }
            }, 1000); // Update every second

            return () => clearInterval(interval); // Cleanup on unmount
    }, [seconds,allow,open]);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
        <>
            {!createLoading && !allow 
            ? 
                <div className={styles.quiz_container}>
                    { !showResult  ? (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
                            <div className={styles.progress} style={{ position: 'relative', width: '200px',marginTop:'-156px'}}>
                                {/* <SemiCircleProgressBar
                                    percentage={((activeQuestion + 1) / createData.length) * 100}
                                >
                                    <svg
                                        style={{
                                            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
                                            background:'white',
                                        }}
                                    />
                                </SemiCircleProgressBar> */}
                                <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '54%',
                                            transform: 'translate(-50%, -50%)',
                                            color: 'black',
                                            fontSize: '24px',
                                        }}
                                >
                                    <span className={styles.active_question_no}>
                                    {addLeadingZero(activeQuestion + 1)}
                                    </span>
                                    <span className={styles.total_question}>
                                    /{addLeadingZero(createData.length)}
                                    </span>
                                </div>
                            </div>
                            </div>


                            {!accepted && (
                                <div className={styles.timer}>
                                    <span className={styles.timer_icon}>&#x1F570;</span>
                                    <p><span style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>{minutes}</span>:<span style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>{remainingSeconds}</span>
    </p>
                                </div>
                            )}
                            
                            
                            <div>
                                <h2>{currentQuestion.question_text}</h2>
                                {!accepted ? (
                                    <>
                                    <ul>
                                    {(currentQuestion || []).options.slice(1, -1).split(', ').map((answer, index) => (
                                        <li
                                            key={answer}
                                            onClick={() => onAnswerSelected(answer, index)}
                                            className={ selectedAnswerIndex === index ? styles.selected_answer : ''}
                                            >
                                            {answer.replace(/'/g, '')}
                                        </li>
                                    ))}
                                    </ul>
                                    <div className={styles.flex_right}>
                                        <button className={styles.button_size} onClick={onClickNext}>
                                            {questionIndex === createData.length - 1 ? 'Finish' : 'Next' }
                                        </button>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    <ul>
                                    {(currentQuestion || []).options.slice(1, -1).split(', ').map((answer, index) => (
                                        <li
                                            key={answer}
                                            onClick={() => onAnswerSelected(answer, index)}
                                            className={
                                                (submittedAnswers[questionIndex] === answer &&
                                                answer === currentQuestion.correct_answer) || answer === currentQuestion.correct_answer
                                                ? styles.correct
                                                : submittedAnswers[questionIndex] === answer &&
                                                answer !== currentQuestion.correct_answer
                                                ? styles.wrong
                                                : ''
                                            }
                                            >
                                            {answer.replace(/'/g, '')}
                                        </li>
                                    ))}
                                    </ul>
                                    <div className={styles.flex_right}>
                                        <button className={styles.button_size} onClick={onClickNext}>
                                            {questionIndex === createData.length - 1 ? 'Finish' : 'Next'}
                                        </button>
                                    </div>
                                    </>
                                )
                                
                            }
                                
                                
                            </div>
                        </div>
                        
                    ) : (
                        <>
                            <div className={styles.result}>
                            <h3>Your Result</h3>
                            <div>
                                <SemiCircleProgressBar percentage={progress} />
                            </div>
                            {/* <ProgressBar progress={progress}/> */}
                                <span className={styles.correct_answer}> {result.correctAnswers} Correct</span>
                                <span className={styles.wrong_answer}> {result.wrongAnswers} Incorrect</span>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={()=>handleStartAgain()} >Start Again</button>
                                <button onClick={()=>handleReviewAnswers()} >Review Answers</button>
                            </div>
                        </>
                    )}    
                </div>
            : 
                !open && <Startpage setAllow={setAllow} allow={allow} setSeconds={setSeconds} createData={createData} setOpen={setOpen} open={open}/>}
                {open && (
                    <>
                        <h1>Time Up</h1>
                        <img src='https://img.freepik.com/premium-photo/time-up-word-with-clock-yellow-background_121826-322.jpg' alt='img'/>
                        <h2>Better Luck for next Time</h2>
                    </>
                )}
            
            
        </>
    )
};
export default Quiz;