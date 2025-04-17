import GameCard from "../../../components/GameCard/GameCard.js";
import Container from "react-bootstrap/Container";
import Maths from "../../../assets/images/Maths.png";
import Flask from "../../../assets/images/Flask.png";
import Book from "../../../assets/images/Open-Book.png";

function Subjects() {
  return (
    <div>
      <section>
        <Container
          className="years gradient d-flex flex-column align-items-center"
          style={{ minHeight: "100vh" }}
          fluid
        >
          <div className="year-cards d-flex justify-content-center align-items-center gap-4">
            <GameCard title={"Science"} />
            <GameCard title={"Science"} />
            <GameCard title={"Science"} />
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Subjects;
