import "./styles/FeatureCard.css";
import Card from "react-bootstrap/Card";

function FeatureCard({image, title, body, bgColour}) {
  return (
      <Card
        className="feature shadow-sm d-flex justify-content-center align-items-center"
        style={{ backgroundColor: bgColour }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center gap-2 text-center">
          <img src={image} width="25%" />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
        </div>
      </Card>
  );
}

export default FeatureCard;
