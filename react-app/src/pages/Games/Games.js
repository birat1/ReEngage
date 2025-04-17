import Footer from "../../components/Footer/Footer.js";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard.js";
import Maths from "../../assets/images/Maths.png";
import Flask from "../../assets/images/Flask.png";
import Book from "../../assets/images/Open-Book.png";
import "./styles/Games.css";

function Games() {
  return (
    <div>
      <GamesContent />
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
          className="games-section gradient d-flex flex-column align-items-center"
          style={{ minHeight: "100vh" }}
          fluid
        >
          <div className="games d-flex flex-md-row align-items-center flex-wrap gap-4">
            {games.map((game, index) => (
              <Link to={game.to} className="link-style" key={index}>
                <div
                  className="gamecard-animate"
                  style={{ animationDelay: game.delay }}
                >
                  <GameCard
                    image={game.image}
                    title={game.title}
                    background="#F2F2F2"
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
