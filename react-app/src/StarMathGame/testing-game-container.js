import React from "react";
import StarMathGame from "./StarMath-Game";
import "./GameContainer.css";

const GameContainer = () => {
  return (
    <div className="game-container">
      <h1 className="game-title">Star Math Game</h1>
      <div className="game-frame">
          <StarMathGame />
      </div>
    </div>
  );
};

export default GameContainer;
