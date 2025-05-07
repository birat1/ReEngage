import Footer from "../../components/Footer/Footer.js";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard.js";
import Maths from "../../assets/images/Maths.png";
import Flask from "../../assets/images/Flask.png";
import Book from "../../assets/images/Open-Book.png";
import "./styles/Games.css";
import { CheckLoggedIn } from "../../components/Authentication/CheckLoginStatus.js";

function Games() {
  return (
    <div>
      <GamesContent />
    </div>
  );
}

const games = [
  { to: "/games/starmath", image: Maths, title: "Starmath", delay: "0.1s" },
  {
    to: "/games/fill-itfish",
    image: Book,
    title: "Fill-itFish",
    delay: "0.3s",
  },
  { to: "/games/labwars", image: Flask, title: "LabWars", delay: "0.5s" },
];

function GamesContent() {
  return (
    <CheckLoggedIn>
      <div>
        <section>
          <Container
            className="games-section gradient d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "calc(100vh - 76px)" }}
            fluid
          >
            <div className="games d-flex align-items-center flex-wrap gap-4">
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
    </CheckLoggedIn>
  );
}

export default Games;
