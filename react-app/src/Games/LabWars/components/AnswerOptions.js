/**
 * AnswerOptions Component
 * 
 * Displays and manages the answer options for both single and multiple choice questions.
 * Handles user selection, submission, and displays correct answers after submission.
 * 
 * @component
 * @param {Object} props
 * @param {string[]} props.options - Array of answer options to display
 * @param {Function} props.onSubmit - Callback function when answers are submitted
 * @param {(number|number[])} props.correctAnswer - Index or array of indices of correct answer(s)
 * @param {boolean} props.isAnswered - Whether the question has been answered
 * @param {boolean} props.isMultiple - Whether this is a multiple choice question
 */

import React, { useState, useEffect } from 'react';
import './AnswerOptions.css';

const AnswerOptions = ({ options, onSubmit, correctAnswer, isAnswered, isMultiple }) => {
  // Track selected answer indices
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Reset selections when question changes
  useEffect(() => {
    setSelectedAnswers([]);
  }, [options]);

  // Handles clicking an answer option
  const handleOptionClick = (index) => {
    if (isAnswered) return; // Prevent selection after submission
    
    setSelectedAnswers(prev => {
      if (prev.includes(index)) {
        // Deselect if already selected
        return prev.filter(i => i !== index);
      } else {
        // For single choice, replace previous selection
        // For multiple choice, add to selections
        return isMultiple ? [...prev, index] : [index];
      }
    });
  };

  /**
   * Handles answer submission
   * Only submits if at least one answer is selected
   */
  const handleSubmit = () => {
    if (selectedAnswers.length > 0) {
      onSubmit(selectedAnswers);
    }
  };

  /**
   * Determines the CSS classes for an answer button
   * Handles different states: selected, correct, and default
   * @param {number} index - Index of the option
   * @returns {string} CSS class names
   */
  const getButtonClass = (index) => {
    let className = 'answer-button';
    
    if (isAnswered) {
      // Show correct answer(s) after submission
      if (Array.isArray(correctAnswer)) {
        if (correctAnswer.includes(index)) {
          className += ' correct';
        }
      } else if (index === correctAnswer) {
        className += ' correct';
      }
    } else if (selectedAnswers.includes(index)) {
      // Show selected state before submission
      className += ' selected';
    }
    
    return className;
  };

  return (
    <div className="answer-options-container">
      {/* Grid of answer options */}
      <div className="answer-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(index)}
            onClick={() => handleOptionClick(index)}
            disabled={isAnswered}
          >
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      {/* Submit button - hidden after submission */}
      {!isAnswered && (
        <button 
          className={`submit-button ${selectedAnswers.length > 0 ? 'active' : 'disabled'}`}
          onClick={handleSubmit}
          disabled={selectedAnswers.length === 0}
        >
          Submit Answer(s)
        </button>
      )}
    </div>
  );
};

export default AnswerOptions; 