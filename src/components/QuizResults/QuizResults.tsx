import React from "react";
import { Topic } from "../../types";
import "./quizresults.css";

type QuizResultsProps = {
  title: string;
  icon: string;
  score: number;
  totalQuestions: number | undefined;
  setQuizTopic: (value: Topic | null) => void;
};

const QuizResults = ({
  title,
  icon,
  score,
  totalQuestions,
  setQuizTopic
}: QuizResultsProps) => {
  const restart = () => {
    sessionStorage.removeItem("question");
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("gameEnded");
    sessionStorage.removeItem("topic");
    setQuizTopic(null);
  };
    return  (
      <section>
        <h1 className="heading--lg results__title">
          Quiz completed{" "}
          <span className="heading--lg--bold"> You scored...</span>
        </h1>
        <div className="results shadow">
          <div className="results__topic">
            <img
              className={`${title}`}
              src={icon}
              aria-hidden="true"
            />
            <p className="heading--s results__topic__title">
              {title}
            </p>
          </div>
          <strong className="display score">{`${score}`}</strong>
          <p className="score__total body--m">{`out of ${totalQuestions}`}</p>
        </div>
        <button onClick={restart} id="btn-end" className="btn heading--s">
          Restart quiz
        </button>
      </section>
    );
};

export default QuizResults;
