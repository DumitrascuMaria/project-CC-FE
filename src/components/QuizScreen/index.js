import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./index.scss";

const QuizScreen = ({ studentName }) => {
  const [questions, setQuestions] = useState([]);
  const [grade, setGrade] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [goHome, setGoHome] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/questions`
      );

      if (result.data.data) {
        let questionsArray = result.data.data;
        questionsArray.reverse();
        setQuestions(result.data.data);
      }
    };

    fetchData();
  }, []);

  const selectAnswerHandler = () => {
    const newGrade = grade + 1;
    setGrade(newGrade);
  };

  const finishQuizHandler = async () => {
    setIsFinished(true);
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student/sendMail`,
        {
          receiver: "dumitrascusandra18@stud.ase.ro",
          sender: "dumitrascusandra18@stud.ase.ro",
          subject: "Nota evaluare finala",
          msg: `Punctajul studentului ${studentName} este ${
            (grade / questions.length) * 100
          }pct`,
        }
      );

      if (response.status === 200) {
        alert("Your teacher will receive your grade.");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="back"
        onClick={() => {
          setGoHome(true);
        }}
      >
        Go to homepage
      </button>
      {goHome && <Redirect to="/" />}
      <div className="quiz-screen">
        <p>Student: {studentName} </p>
        <h1>Test</h1>
        {!isFinished ? (
          <>
            <div className="questions-container">
              {questions &&
                questions.map((question, index) => (
                  <div className="question" key={index}>
                    <p className="question-text">
                      <span>{index + 1}. </span>
                      {question.questionText}
                    </p>
                    <div className="answers-container">
                      <button className="answer" onClick={selectAnswerHandler}>
                        {question.questionRightAnswer}
                      </button>
                      <button className="answer">
                        {question.questionWrongAnswer}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="finish-button" onClick={finishQuizHandler}>
              FINISH
            </div>
          </>
        ) : (
          <h2>
            Your score is: {grade} / {questions.length}
          </h2>
        )}
      </div>
    </>
  );
};

export default QuizScreen;
