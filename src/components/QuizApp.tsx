// src/QuizApp.tsx
// import React from "react";
import { useState } from "react";
import Quiz from "./Quiz/Quiz";
import QuizResults from "./QuizResults/QuizResults";
import { Topic } from "../types";
import "../App.css";

function QuizApp({quizTopic, setQuizTopic}: {quizTopic: Topic, setQuizTopic: (value: Topic | null) => void}) {

  const [question, setQuestion] = useState<number>(Number(sessionStorage.getItem("question")) || 0);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(Number(sessionStorage.getItem("score")) || 0);
  const [gameEnded, setGameEnded] = useState<boolean>(sessionStorage.getItem("gameEnded") ? true : false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [hideSubmit, setHideSubmit] = useState<boolean>(false);

  const totalQuestions = quizTopic?.questions.length;
  const currentQuestion = quizTopic?.questions[question].question;
  const answer = quizTopic?.questions[question].answer;
  const options = quizTopic?.questions[question].options;

  const updateQuestion = () => {
    if (question + 1 !== totalQuestions && hideSubmit) {
      setQuestion(question + 1);
      setChosenAnswer(null);
      setHideSubmit(false);
    }
  };

  const updateChosenAnswer = (choice: string) => {
    if (!hideSubmit) {
      setErrorMessage(false);
      setChosenAnswer(choice);
    }
  };

  const handleSubmit = () => {
    updateScore();
    if (chosenAnswer === null) {
      setErrorMessage(true);
    } else {
      setHideSubmit(true);
    }
    totalQuestions && question !== totalQuestions - 1 && sessionStorage.setItem("question", String(question + 1));
  };


  const updateScore = () => {
    if (chosenAnswer !== null && chosenAnswer === answer) {
      sessionStorage.setItem("score", String(score + 1));
      setScore(score + 1);
    }
  };

  const handleEnd = () => {
    sessionStorage.setItem("gameEnded", String(true));
    setGameEnded(true);
  };

  return (
    <>
     
      <Quiz
        isGameEnded={gameEnded}
        quizTopicSelected={quizTopic}
        totalQuestions={totalQuestions}
        questionPosition={question}
        currentQuestion={currentQuestion}
        chosenAnswer={chosenAnswer}
        correctAnswer={answer}
        errorMessage={errorMessage}
        options={options}
        updateQuestion={updateQuestion}
        updateChosenAnswer={updateChosenAnswer}
        handleSubmit={handleSubmit}
        hideSubmit={hideSubmit}
        handleEnd={handleEnd}
      />
      {gameEnded && (
        <QuizResults
          title={quizTopic.title}
          icon={quizTopic.icon}
          score={score}
          totalQuestions={totalQuestions}
          setQuizTopic={setQuizTopic}
        />
      )}
    </>
  );
}

export default QuizApp;