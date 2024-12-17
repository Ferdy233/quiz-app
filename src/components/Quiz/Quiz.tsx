import errorIcon from "../../assets/images/icon-error.svg"; // Icon for incorrect answers or errors
import successIcon from "../../assets/images/icon-correct.svg"; // Icon for correct answers; // Icon for correct answers
import "./quiz.css"; // Import specific styles for the Quiz component

// Define the prop types for the Quiz component
type QuizProps = {
  isGameEnded: boolean; // Indicates if the quiz has ended
  quizTopicSelected: {
    title: string; // Quiz topic title
    icon: string; // Quiz topic icon
    questions: {
      question: string; // The quiz question
      options: string[]; // Possible answers to the question
      answer: string; // Correct answer
    }[];
  } | null;
  totalQuestions: number | undefined; // Total number of questions in the quiz
  questionPosition: number; // Current question index
  currentQuestion: string | undefined; // The current question
  chosenAnswer: string | null; // User's selected answer
  correctAnswer: string | undefined; // Correct answer for the current question
  errorMessage: boolean; // Whether an error message should be displayed
  options: string[] | undefined; // List of answer options for the current question
  updateQuestion: () => void; // Function to update to the next question
  updateChosenAnswer: (choice: string) => void; // Function to update the chosen answer
  handleSubmit: () => void; // Function to submit the selected answer
  hideSubmit: boolean; // Whether the submit button is hidden
  handleEnd: () => void; // Function to end the quiz
};

// The Quiz component
const Quiz = ({
  isGameEnded,
  quizTopicSelected,
  totalQuestions,
  questionPosition,
  currentQuestion,
  chosenAnswer,
  correctAnswer,
  errorMessage,
  options,
  updateQuestion,
  updateChosenAnswer,
  handleSubmit,
  hideSubmit,
  handleEnd,
}: QuizProps) => {
  // Map each option to a styled answer card
  const answerOptions = options?.map((option: string, optionID: number) => {
    return (
      <div
        className={`answer shadow ${!hideSubmit ? "answer-hover" : ""} ${
          chosenAnswer === option ? "answer--selected" : ""
        } ${option === correctAnswer && hideSubmit ? "answer--correct" : ""} ${
          option === correctAnswer && hideSubmit && chosenAnswer === option
            ? "answer--picked--correct"
            : ""
        } ${
          chosenAnswer !== correctAnswer &&
          hideSubmit &&
          chosenAnswer === option
            ? "answer--incorrect"
            : ""
        } answer--mode`}
        onClick={() => updateChosenAnswer(option)}
        key={optionID}
      >
        {/* Option label (A, B, C, D) */}
        <div className="answer__order heading--s">
          {["A", "B", "C", "D"][optionID]}
        </div>

        {/* Option text */}
        <p className="answer__text heading--s">{option}</p>

        {/* Correct and incorrect icons */}
        <img
          className="answer__correct-img"
          src={successIcon}
          alt={`The correct answer is ${option}`}
        />
        <img
          className="answer__incorrect-img"
          src={errorIcon}
          alt="This option is incorrect"
        />
      </div>
    );
  });

  // Calculate the progress bar's width as a percentage
  const widthPercentage = (questionPosition / (totalQuestions ?? 1)) * 100 + 10;

  // Render null if no topic is selected or the quiz has ended
  {
    return quizTopicSelected === null || isGameEnded ? null : (
      <section className="quiz">
        {/* Question and progress bar */}
        <div className="quiz__questions">
          <em className="question--position body--s">{`Question ${
            questionPosition + 1
          } of ${totalQuestions}`}</em>
          <h1 className="question heading--m">{currentQuestion}</h1>
          <div className="progress-bar-background">
            <div
              className="progress-bar"
              style={{ width: `${widthPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Answer options and controls */}
        <div className="quiz__answers">
          <div className="answers">{answerOptions}</div>

          {/* Submit button */}
          {!hideSubmit && (
            <button className="btn heading--s" onClick={handleSubmit}>
              Submit Answer
            </button>
          )}

          {/* Next question button */}
          {chosenAnswer &&
          hideSubmit &&
          questionPosition + 1 !== totalQuestions ? (
            <button className="btn heading--s" onClick={updateQuestion}>
              Next Question
            </button>
          ) : null}

          {/* End quiz button */}
          {questionPosition + 1 === totalQuestions && hideSubmit ? (
            <button className="btn heading--s" onClick={handleEnd}>
              End Quiz
            </button>
          ) : null}

          {/* Error message for unselected answers */}
          {errorMessage ? (
            <div className="error--message">
              <img src={errorIcon} aria-hidden="true" />
              <p className="body--m">Please select an answer</p>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
};

export default Quiz;
