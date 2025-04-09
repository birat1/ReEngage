import { CardText, CardTitle } from "react-bootstrap";
import "./styles/TestimonialCard.css";
import Card from "react-bootstrap/Card";

function TestimonialCard({ body, person, about, bgColour }) {
  return (
    <Card
      className="testimonial shadow-sm d-flex justify-content-center align-items-center"
      style={{ backgroundColor: { bgColour } }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 p-5">
        <CardText>
          <em>"{body}"</em>
        </CardText>
        <CardText className="text-center">
          {person}
          <br />
          {about}
        </CardText>
      </div>
    </Card>
  );
}

export default TestimonialCard;
