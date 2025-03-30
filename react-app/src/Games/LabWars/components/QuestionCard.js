/**
 * QuestionCard Component
 * 
 * Displays the current question with its number and total questions count.
 * Acts as a container for the answer options.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.question - The current question text
 * @param {number} props.questionNumber - The current question number (1-based)
 * @param {number} props.totalQuestions - Total number of questions in the game
 * @param {React.ReactNode} props.children - Child components (AnswerOptions)
 */

import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, questionNumber, totalQuestions, children }) => {
  return (
    <div className="question-card">
      {/* Question Progress Display */}
      <div className="question-number">
        Question {questionNumber} of {totalQuestions}
      </div>

      {/* Question Text Display */}
      <div className="question-text">
        {question}
      </div>

      {/* Answer Options Container */}
      {children}
    </div>
  );
};

export default QuestionCard; 