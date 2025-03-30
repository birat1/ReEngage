/**
 * FeedbackMessages
 * 
 * Displays feedback to the user after answering a question.
 * Shows different styles for correct and incorrect answers.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.message - The feedback message to display
 * @param {boolean} props.isCorrect - Whether the answer was correct
 */

import React from 'react';

const FeedbackMessage = ({ message, isCorrect }) => {
  if (!message) return null;

  return (
    <div className={`feedback-message ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
      {message}
    </div>
  );
};

export default FeedbackMessage; 