import React from "react";
import "../EndGameOverlay.css";
import { Link } from "react-router-dom";
import { useUpdateStudentStats } from "../../../components/UpdateStudentStats";

/* Backend logic here
- if (user is student and authenticated):
find authenticated user, go into student database and update their:
  - points
  - xp
  - math answered
  - math answered correctly
  else {dont need to interact with the database}*/

function EndGameOverlay({ points, questions, resetGame, correctQuestions }) {
  const { isUpdating } = useUpdateStudentStats({
    points,
    subject: "maths",
    questions,
    correctQuestions
  });

  return (
    <div className="endGameOverlay">
      <div className="endGameContent">
        <h1>Game Over!</h1>
        <p>Your Points: {points}</p>
        <p>
          Questions Correct: {correctQuestions}/{questions}
        </p>
        <div className=" buttonContainerE">
          <button onClick={resetGame} className="EndScreenButton">
            Play Again
          </button>
          <Link to="/" className="EndScreenButton">
            Back to Homepage
          </Link>
        </div>
        {isUpdating && <p>Saving your progress...</p>}
      </div>
    </div>
  );
}

export default EndGameOverlay;
