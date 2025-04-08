import Footer from "../../components/Footer/Footer.js";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard.js";
import Maths from "../../assets/images/Maths.png";
import Flask from "../../assets/images/Flask.png";
import Book from "../../assets/images/Open-Book.png";
import Icons from "../../assets/icons.svg";
import "./styles/Games.css";

function Games() {
  return (
    <div>
      <GamesContent />
      <Footer />
    </div>
  );
}

const games = [
  { to: "/starmath", image: Maths, title: "Starmath", delay: "0.1s" },
  { to: "/fill-itfish", image: Book, title: "Fill-itFish", delay: "0.3s" },
  { to: "/lab-wars", image: Flask, title: "LabWars", delay: "0.5s" },
];

function GamesContent() {
  return (
    <div>
      <section>
        <Container
          className="hero-section d-flex flex-column justify-content-center align-items-center"
          style={{ height: "55rem", backgroundImage: `url(${Icons})`, backgroundColor: "#A8D3E6" }}
          fluid
        >
          <div className="d-flex flex-column flex-md-row align-items-center flex-wrap gap-3">
            {games.map((game, index) => (
              <Link to={game.to} className="link-style" key={index}>
                <div
                  className="gamecard-animate"
                  style={{ animationDelay: game.delay }}
                >
                  <GameCard
                    image={game.image}
                    title={game.title}
                    background="#d8eaf2"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Games;
