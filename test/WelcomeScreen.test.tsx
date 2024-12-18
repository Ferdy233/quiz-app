// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WelcomeScreen from '../src/components/WelcomeScreen/WelcomeScreen';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const mockUpdateTopic = vi.fn();

describe('WelcomeScreen Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders topic choices', () => {
    render(<WelcomeScreen updateTopic={mockUpdateTopic} />);
    
    expect(screen.getByText(/Pick a subject to get started/i)).toBeInTheDocument();
    expect(screen.getByText(/HTML/i)).toBeInTheDocument();
    expect(screen.getByText(/CSS/i)).toBeInTheDocument();
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Accessibility/i)).toBeInTheDocument();
  });

  test('calls updateTopic when a topic is clicked', () => {
    render(<WelcomeScreen updateTopic={mockUpdateTopic} />);
    
    fireEvent.click(screen.getByText(/HTML/i));
    
    expect(mockUpdateTopic).toHaveBeenCalledWith("HTML");
  });
});