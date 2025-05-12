import "../EndGameOverlay.css";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useUpdateStudentStats } from "../../../components/UpdateStudentStats";

function EndGameOverlay({ points, questions, resetGame, correctQuestions }) {
  const {updateStats} = useUpdateStudentStats();
  
  useEffect(() => {
    if (points !== undefined && questions !== undefined && correctQuestions !== undefined) {
      updateStats(points, "maths", questions, correctQuestions);
    }
  }, [points, questions, correctQuestions, updateStats]);

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
      </div>
    </div>
  );
}

export default EndGameOverlay;
