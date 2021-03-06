import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";
import { Redirect } from "react-router-dom";

export const QuestionsForm = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [questionCorrectAnswer, setQuestionCorrectAnswer] = useState("");
  const [questionWrongAnswer, setQuestionWrongAnser] = useState("");
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

  const deleteQuestionHandler = async (index) => {
    console.log("index", index);
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/questions/${index}`
      );

      if (response.status === 200) {
        alert("Intrebarea a fost stearsa cu succes!");
        window.location.reload();
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  const addQuestionHandler = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/questions`,
        {
          questionText: questionText,
          questionRightAnswer: questionCorrectAnswer,
          questionWrongAnswer: questionWrongAnswer,
        }
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const onChangeTextHandler = (e) => {
    setQuestionText(e.target.value);
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
      <div className="questionsForm">
        <h1>Questions Form</h1>
        {questions.map((question) => {
          return (
            <div key={question.questionID} className="questionRowForm">
              <div className="questionDetails">
                <label>Question: </label>
                <input value={question.questionText} />
                <label>Correct Answer: </label>
                <input value={question.questionRightAnswer} />
                <label>Wrong Answer: </label>
                <input value={question.questionWrongAnswer} />
              </div>
              <div className="actions">
                <button
                  className="delete-button"
                  onClick={() => deleteQuestionHandler(question.questionID)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <button
          className="add-question"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add Question
        </button>
        {showForm && (
          <div className="questionRowForm">
            <div className="questionDetails">
              <label>Question: </label>
              <input
                type="text"
                value={questionText}
                onChange={(e) => {
                  onChangeTextHandler(e);
                }}
              />
              <label>Correct Answer: </label>
              <input
                type="text"
                value={questionCorrectAnswer}
                onChange={(e) => {
                  setQuestionCorrectAnswer(e.target.value);
                }}
              />
              <label>Wrong Answer: </label>
              <input
                type="text"
                value={questionWrongAnswer}
                onChange={(e) => {
                  setQuestionWrongAnser(e.target.value);
                }}
              />
            </div>
            <div className="actions">
              <button className="add-question" onClick={addQuestionHandler}>
                ADD
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
