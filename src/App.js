import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import QuizScreen from "./components/QuizScreen";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import { useState } from "react";
import { QuestionsForm } from "./components/QuestionsForm";

function App() {
  const [studentName, setStudentName] = useState();
  const getStudentName = (name) => {
    setStudentName(name);
  };
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LoginScreen getStudentName={getStudentName} />
        </Route>
        <Route path="/quiz">
          <QuizScreen studentName={studentName} />
        </Route>
        <Route path="/teacherForm">
          <QuestionsForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
