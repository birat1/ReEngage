import React from "react";
import "../EndGameOverlay.css";
import { Link } from "react-router-dom";

function EndGameOverlay({ points, questions, resetGame, correctQuestions }) {
  return (
    <div className="endGameOverlay">
      <div className="endGameContent">
        <h1>Game Over!</h1>
        <p>Your Points: {points}</p>
        <p>Questions Correct: {correctQuestions}/{questions}</p>
        <div className=" buttonContainerE">
          <button onClick={resetGame} className="EndScreenButton">
            Play Again
          </button>
          <Link to="/" className="EndScreenButton">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EndGameOverlay;
