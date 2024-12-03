// Importing necessary modules, types, and styles
import { Topic } from "../../types"; // Importing Topic type for strong type-checking
import "./quizresults.css"; // Importing specific styles for the QuizResults component

// Defining the props type for the QuizResults component
type QuizResultsProps = {
  title: string; // Title of the quiz topic
  icon: string; // Icon associated with the quiz topic
  score: number; // User's final score
  totalQuestions: number | undefined; // Total number of questions in the quiz
  setQuizTopic: (value: Topic | null) => void; // Function to reset the quiz topic
};

// The QuizResults component
const QuizResults = ({
  title, // Title of the quiz topic
  icon, // Icon for the quiz topic
  score, // User's score
  totalQuestions, // Total number of questions
  setQuizTopic, // Function to reset the quiz topic
}: QuizResultsProps) => {
  // Function to restart the quiz
  const restart = () => {
    // Remove all quiz-related data from session storage
    sessionStorage.removeItem("question");
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("gameEnded");
    sessionStorage.removeItem("topic");

    // Reset the quiz topic, which takes the user back to the WelcomeScreen
    setQuizTopic(null);
  };

  // JSX for rendering the results
  return (
    <section>
      {/* Heading to congratulate the user */}
      <h1 className="heading--lg results__title">
        Quiz completed{" "}
        <span className="heading--lg--bold"> You scored...</span>
      </h1>

      {/* Container for displaying the quiz results */}
      <div className="results shadow">
        <div className="results__topic">
          {/* Icon of the quiz topic */}
          <img className={`${title}`} src={icon} aria-hidden="true" />
          {/* Title of the quiz topic */}
          <p className="heading--s results__topic__title">{title}</p>
        </div>

        {/* Displaying the user's score */}
        <strong className="display score">{`${score}`}</strong>
        <p className="score__total body--m">{`out of ${totalQuestions}`}</p>
      </div>

      {/* Button to restart the quiz */}
      <button onClick={restart} id="btn-end" className="btn heading--s">
        Restart quiz
      </button>
    </section>
  );
};

// Exporting the QuizResults component for use in other parts of the app
export default QuizResults;
