import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from './Quiz';
import '@testing-library/jest-dom'; // This can remain the same

// Mock functions
const mockUpdateQuestion = vi.fn(); // Use vi.fn() instead of jest.fn()
const mockUpdateChosenAnswer = vi.fn();
const mockHandleSubmit = vi.fn();
const mockHandleEnd = vi.fn();

// Sample quiz topic
const quizTopicSelected = {
  title: 'HTML',
  icon: './assets/images/icon-html.svg',
  questions: [
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Trainer Marking Language',
        'Hyper Text Marketing Language',
        'Hyper Text Markup Language',
        'Hyper Text Markup Leveler',
      ],
      answer: 'Hyper Text Markup Language',
    },
  ],
};

describe('Quiz Component', () => {
  beforeEach(() => {
    render(
      <Quiz
        isGameEnded={false}
        quizTopicSelected={quizTopicSelected}
        totalQuestions={1}
        questionPosition={0}
        currentQuestion={quizTopicSelected.questions[0].question}
        chosenAnswer={null}
        correctAnswer={quizTopicSelected.questions[0].answer}
        errorMessage={false}
        options={quizTopicSelected.questions[0].options}
        updateQuestion={mockUpdateQuestion}
        updateChosenAnswer={mockUpdateChosenAnswer}
        handleSubmit={mockHandleSubmit}
        hideSubmit={false}
        handleEnd={mockHandleEnd}
      />
    );
  });

  test('renders the current question and options', () => {
    expect(screen.getByText(/What does HTML stand for?/i)).toBeInTheDocument();
    expect(screen.getByText(/Hyper Trainer Marking Language/i)).toBeInTheDocument();
    expect(screen.getByText(/Hyper Text Marketing Language/i)).toBeInTheDocument();
    expect(screen.getByText(/Hyper Text Markup Language/i)).toBeInTheDocument();
    expect(screen.getByText(/Hyper Text Markup Leveler/i)).toBeInTheDocument();
  });

  test('allows the user to select an answer', () => {
    const option = screen.getByText(/Hyper Text Markup Language/i);
    fireEvent.click(option);
    expect(mockUpdateChosenAnswer).toHaveBeenCalledWith('Hyper Text Markup Language');
  });

  test('submits the answer', () => {
    const option = screen.getByText(/Hyper Text Markup Language/i);
    fireEvent.click(option);
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test('navigates to the next question', () => {
    const option = screen.getByText(/Hyper Text Markup Language/i);
    fireEvent.click(option);
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitButton);
    
    // Simulate moving to the next question
    const nextButton = screen.getByRole('button', { name: /Next Question/i });
    fireEvent.click(nextButton);
    expect(mockUpdateQuestion).toHaveBeenCalled();
  });

  test('ends the quiz when all questions are answered', () => {
    const option = screen.getByText(/Hyper Text Markup Language/i);
    fireEvent.click(option);
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitButton);
    
    const endButton = screen.getByRole('button', { name: /End Quiz/i });
    fireEvent.click(endButton);
    expect(mockHandleEnd).toHaveBeenCalled();
  });

  test('displays an error message if no answer is selected', () => {
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/Please select an answer/i)).toBeInTheDocument();
  });
});