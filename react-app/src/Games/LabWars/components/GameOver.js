import React from 'react';
import { Button } from 'react-bootstrap';
import './GameOver.css';

const GameOver = ({ onPlayAgain, onReturnHome }) => {
  return (
    <div className="game-over">
      <h1 className="game-title">Game Over!</h1>
      <div className="game-over-message">
        <p>Congratulations! You've completed all the science questions!</p>
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