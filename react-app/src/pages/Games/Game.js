import { Container } from "react-bootstrap";
import LabWars from "../../Games/LabWars/LabWars.js";
import MainGame from "../../Games/Fill-itFish/MainGame.js";
import StarMathGame from "../../Games/StarMathGame/StarMath-Game.js";
import "./styles/Game.css";

function Game() {
  return (
    <div>
      <GameContent />
    </div>
  );
}

function GameContent() {
  return (
    <div>
      <Container
        className="games-section gradient d-flex flex-column align-items-center"
        style={{ minHeight: "calc(100vh - 76px)" }}
        fluid
      >
        <div className="game-container">
        </div>
      </Container>
    </div>
  );
}

export default Game;
