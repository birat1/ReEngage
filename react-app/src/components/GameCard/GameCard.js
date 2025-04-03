import Card from "react-bootstrap/Card";
import "./GameCard.css";

function GameCard ({image, title, background}){
    return (
        <Card className="game-card shadow-sm d-flex justify-content-center align-items-center" style={{ backgroundColor: background }}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={image} className="card-icon" width="25%" />
          <Card.Title className="mt-3">{title}</Card.Title>
        </div>
      </Card>
    )
}

export default GameCard;