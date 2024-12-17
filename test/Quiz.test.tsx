import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Quiz from "../src/components/Quiz/Quiz"; // Adjust the import based on your file structure

describe("Quiz Component", () => {
  const mockUpdateQuestion = vi.fn();
  const mockUpdateChosenAnswer = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockHandleEnd = vi.fn();

  const defaultProps = {
    isGameEnded: false,
    quizTopicSelected: {
      title: "Test Quiz",
      icon: "",
      questions: [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          answer: "4",
        },
      ],
    },
    totalQuestions: 1,
    questionPosition: 0,
    currentQuestion: "What is 2 + 2?",
    chosenAnswer: null,
    correctAnswer: "4",
    errorMessage: false,
    options: ["3", "4", "5", "6"],
    updateQuestion: mockUpdateQuestion,
    updateChosenAnswer: mockUpdateChosenAnswer,
    handleSubmit: mockHandleSubmit,
    hideSubmit: false,
    handleEnd: mockHandleEnd,
  };

  it("renders the current question and options", () => {
    render(<Quiz {...defaultProps} />);

    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  // it("updates chosen answer when an option is clicked", () => {
  //   render(<Quiz {...defaultProps} />);

  //   fireEvent.click(screen.getByText("4"));

  //   expect(mockUpdateChosenAnswer).toHaveBeenCalledWith("4");
  // });

  it("submits the answer when the submit button is clicked", () => {
    render(<Quiz {...defaultProps} />);

    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("Submit Answer"));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("ends the quiz when end button is clicked", () => {
    render(
      <Quiz
        {...defaultProps}
        hideSubmit={true}
        questionPosition={0}
        totalQuestions={1}
      />
    );

    fireEvent.click(screen.getByText("End Quiz"));

    expect(mockHandleEnd).toHaveBeenCalled();
  });

  it("displays error message when no answer is selected and submit is clicked", () => {
    render(<Quiz {...defaultProps} chosenAnswer={null} errorMessage={true} />);

    expect(screen.getByText("Please select an answer")).toBeInTheDocument();
  });
});
