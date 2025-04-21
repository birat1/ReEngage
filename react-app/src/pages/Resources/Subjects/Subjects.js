import GameCard from "../../../components/GameCard/GameCard.js";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Maths from "../../../assets/images/Maths.png";
import Flask from "../../../assets/images/Flask.png";
import Book from "../../../assets/images/Open-Book.png";

const gameCards = [
  { title: "Maths", image: Maths },
  { title: "English", image: Book },
  { title: "Science", image: Flask },
];

function Subjects() {
  const {year} = useParams();

  return (
    <div>
      <section>
        <Container
          className="years gradient d-flex flex-column align-items-center"
          style={{ minHeight: "calc(100vh - 76px)" }}
          fluid
        >
          <div className="slide-up year-cards d-flex justify-content-center align-items-center gap-4">
            {gameCards.map((card, index) => (
              <Link
                to={`/resources/${year}/${card.title.toLowerCase()}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <GameCard key={index} title={card.title} image={card.image} />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Subjects;
