import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizResults from '../src/components/QuizResults/QuizResults';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const mockSetQuizTopic = vi.fn();

const defaultProps = {
  title: "HTML",
  icon: "./assets/images/icon-html.svg",
  score: 3,
  totalQuestions: 5,
  setQuizTopic: mockSetQuizTopic,
};

describe('QuizResults Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('displays the score and total questions', () => {
    render(<QuizResults {...defaultProps} />);
  
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('out of 5')).toBeInTheDocument();
  });
  
  test('calls setQuizTopic when restart button is clicked', () => {
    render(<QuizResults {...defaultProps} />);
    
    fireEvent.click(screen.getByText(/Restart quiz/i));
    
    expect(mockSetQuizTopic).toHaveBeenCalledWith(null);
  });
});