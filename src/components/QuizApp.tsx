// src/QuizApp.tsx

// Importing necessary modules, components, and styles
import { useState } from "react"; // React hook for state management
import Quiz from "./Quiz/Quiz"; // Quiz component for displaying quiz questions
import QuizResults from "./QuizResults/QuizResults"; // Component to display quiz results
import { Topic } from "../types"; // TypeScript type for the quiz topic
import "../App.css"; // App-wide styles

// Defining the QuizApp component with props
function QuizApp({
  quizTopic, // Selected quiz topic
  setQuizTopic, // Function to reset the quiz topic
}: {
  quizTopic: Topic; // Type of the selected quiz topic
  setQuizTopic: (value: Topic | null) => void; // Function to reset the quiz topic
}) {
  // State for tracking the current question index
  const [question, setQuestion] = useState<number>(
    Number(sessionStorage.getItem("question")) || 0
  );

  // State for tracking the user's chosen answer
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);

  // State for tracking the user's score
  const [score, setScore] = useState<number>(
    Number(sessionStorage.getItem("score")) || 0
  );

  // State for tracking whether the game has ended
  const [gameEnded, setGameEnded] = useState<boolean>(
    sessionStorage.getItem("gameEnded") ? true : false
  );

  // State for tracking if an error message should be displayed
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  // State for tracking whether the submit button should be hidden
  const [hideSubmit, setHideSubmit] = useState<boolean>(false);

  // Derived variables for easier access
  const totalQuestions = quizTopic?.questions.length; // Total number of questions in the quiz
  const currentQuestion = quizTopic?.questions[question].question; // Current question text
  const answer = quizTopic?.questions[question].answer; // Correct answer for the current question
  const options = quizTopic?.questions[question].options; // Answer options for the current question

  // Function to move to the next question
  const updateQuestion = () => {
    if (question + 1 !== totalQuestions && hideSubmit) {
      setQuestion(question + 1);
      setChosenAnswer(null); // Reset chosen answer for the next question
      setHideSubmit(false); // Re-enable the submit button
    }
  };

  // Function to update the chosen answer
  const updateChosenAnswer = (choice: string) => {
    if (!hideSubmit) {
      setErrorMessage(false); // Clear any existing error messages
      setChosenAnswer(choice); // Update the state with the chosen answer
    }
  };

  // Function to handle the submit action
  const handleSubmit = () => {
    updateScore(); // Update the score if the answer is correct
    if (chosenAnswer === null) {
      setErrorMessage(true); // Show error if no answer is chosen
    } else {
      setHideSubmit(true); // Disable the submit button after submission
    }
    // Save the next question index in session storage
    totalQuestions &&
      question !== totalQuestions - 1 &&
      sessionStorage.setItem("question", String(question + 1));
  };

  // Function to update the score
  const updateScore = () => {
    if (chosenAnswer !== null && chosenAnswer === answer) {
      sessionStorage.setItem("score", String(score + 1)); // Save the updated score in session storage
      setScore(score + 1); // Increment the score
    }
  };

  // Function to handle the end of the quiz
  const handleEnd = () => {
    sessionStorage.setItem("gameEnded", String(true)); // Save the game-ended state in session storage
    setGameEnded(true); // Set the state to end the game
  };

  // Rendering the component
  return (
    <>
      {/* Render the Quiz component if the game is not ended */}
      <Quiz
        isGameEnded={gameEnded} // Whether the game has ended
        quizTopicSelected={quizTopic} // Current quiz topic
        totalQuestions={totalQuestions} // Total number of questions
        questionPosition={question} // Current question index
        currentQuestion={currentQuestion} // Text of the current question
        chosenAnswer={chosenAnswer} // User's chosen answer
        correctAnswer={answer} // Correct answer for the current question
        errorMessage={errorMessage} // Whether to display an error message
        options={options} // Answer options for the current question
        updateQuestion={updateQuestion} // Function to move to the next question
        updateChosenAnswer={updateChosenAnswer} // Function to update the chosen answer
        handleSubmit={handleSubmit} // Function to handle answer submission
        hideSubmit={hideSubmit} // Whether to hide the submit button
        handleEnd={handleEnd} // Function to end the quiz
      />

      {/* Render the QuizResults component if the game has ended */}
      {gameEnded && (
        <QuizResults
          title={quizTopic.title} // Title of the quiz topic
          icon={quizTopic.icon} // Icon for the quiz topic
          score={score} // User's final score
          totalQuestions={totalQuestions} // Total number of questions
          setQuizTopic={setQuizTopic} // Function to reset the quiz topic
        />
      )}
    </>
  );
}

export default QuizApp; // Exporting the QuizApp component for use in other parts of the app
