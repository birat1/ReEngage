import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './GameOver.css';
import { useUpdateStudentStats } from '../../../components/UpdateStudentStats';

const GameOver = ({ onPlayAgain, onReturnHome, questionsAnswered, correctQuestionsAnswered, points }) => {
  const updateStats = useUpdateStudentStats();

  useEffect(() => {
    // Update student stats when the game ends
    updateStats(points, 'science', questionsAnswered, correctQuestionsAnswered);
  }, [points, questionsAnswered, correctQuestionsAnswered, updateStats])


  return (
    <div className="game-over">
      <h1 className="game-title">Game Over!</h1>
      <div className="game-over-message">
        <p>Here are your stats:</p>
        <ul>
          <li><strong>Questions Answered:</strong> {questionsAnswered}</li>
          <li><strong>Correct Answers:</strong> {correctQuestionsAnswered}</li>
          <li><strong>Points:</strong> {points}</li>
        </ul>
        <p>Would you like to play again or return to the homepage?</p>
      </div>
      <div className="menu-buttons">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onPlayAgain} 
          className="menu-button"
        >
          Play Again
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onReturnHome} 
          className="menu-button"
        >
          Return to Homepage
        </Button>
      </div>
    </div>
  );
};

export default GameOver; 