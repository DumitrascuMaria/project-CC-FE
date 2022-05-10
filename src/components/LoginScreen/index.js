import React from "react";
import "./index.scss";

const LoginScreen = () => {
  return (
    <div className="login-screen-container">
      <h2>Login as a: </h2>
      <button>Student</button>
      <button>Teacher</button>
    </div>
  );
};

export default LoginScreen;
