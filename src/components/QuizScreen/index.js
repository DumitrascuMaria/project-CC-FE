import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";

const QuizScreen = ({ studentName }) => {
  const [questions, setQuestions] = useState([]);
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

  console.log(questions);
  return (
    <div className="quiz-screen">
      <p>Student: {studentName} </p>
      <h1>Test</h1>
      <div className="questions-container">
        {questions &&
          questions.map((question, index) => (
            <div className="question" key={index}>
              <p className="question-text">
                <span>{index + 1}. </span>
                {question.questionText}
              </p>
              <div className="answers-container">
                <div className="answer">{question.questionRightAnswer}</div>
                <div className="answer">{question.questionWrongAnswer}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="finish-button">FINISH</div>
    </div>
  );
};

export default QuizScreen;
