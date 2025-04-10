import "./styles/TestimonialCard.css";
import Card from "react-bootstrap/Card";
import CardText from "react-bootstrap/esm/CardText";

function TestimonialCard({ body, person, about, bgColour }) {
  return (
    <Card
      className="testimonial shadow-sm d-flex justify-content-center align-items-center"
      style={{ backgroundColor: { bgColour } }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 p-5">
        <CardText>"{body}"</CardText>
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
