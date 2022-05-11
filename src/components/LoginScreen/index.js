import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./index.scss";

const LoginScreen = ({ getStudentName }) => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  //const [studentName, setStudentName] = useState();
  const [teacherEmail, setTeacherEmail] = useState();
  const [error, setError] = useState(false);
  const studentInputRef = useRef();
  const teacherInputRef = useRef();
  let history = useHistory();
  const startTestHandler = () => {
    if (studentInputRef.current.value) {
      //setStudentName(studentInputRef.current.value);
      getStudentName(studentInputRef.current.value);
      history.push("/quiz");
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-screen-container">
      <h2>Login as a: </h2>
      <div className="userType-buttons-container">
        <div
          className="checking-button"
          onClick={() => {
            setIsStudent(true);
            setIsTeacher(false);
          }}
        >
          Student
        </div>
        <div
          className="checking-button"
          onClick={() => {
            setIsTeacher(true);
            setIsStudent(false);
          }}
        >
          Teacher
        </div>
      </div>
      {isStudent && (
        <div className="login-form">
          <p className="input-label">Please write your full name: </p>
          <input placeholder="Name" ref={studentInputRef}></input>
          <button className="start-button" onClick={startTestHandler}>
            Incepe testul
          </button>
          {error && <p className="error-message">Error</p>}
        </div>
      )}
      {isTeacher && (
        <div className="login-form">
          <p className="input-label">Please write your email address: </p>
          <input placeholder="email" ref={teacherInputRef}></input>
          <button className="start-button">Log In</button>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
