import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Maths from "../../assets/images/Maths.png";
import Flask from "../../assets/images/Flask.png";
import Book from "../../assets/images/Open-Book.png";
import GameCard from "../../components/GameCard/GameCard.js";
import Icons from "../../assets/icons.svg";
import "./styles/Hero.css";

const games = [
  { to: "/starmath", image: Maths, title: "Starmath"},
  { to: "/fill-itfish", image: Book, title: "Fill-itFish"},
  { to: "/lab-wars", image: Flask, title: "LabWars"},
];


function Hero() {
  return (
    <div className="body">
      <section>
        <Container
          className="hero-section"
          style={{ backgroundImage: `url(${Icons})` }}
          fluid
        >
          <Row style={{ minHeight: "40em" }}>
            <Col>
              <div>
                <h1>Learn Through Play with ReEngage</h1>
                <p>Exciting games and resources to make learning fun!</p>
                <div className="hstack gap-2">
                  <button className="games rounded-pill">Games</button>
                  <button className="resources rounded-pill">
                    Browse Resources
                  </button>
                </div>
              </div>
            </Col>
            <Col>
              <Card className="video-card shadow-sm"></Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container
          className="games-section d-flex flex-column justify-content-center align-items-center"
          fluid
        >
          <h1>Games</h1>
          <p>
            Fun and interactive games that help children learn while they play!
          </p>
          <div className="d-flex flex-column flex-md-row align-items-center flex-wrap gap-3">
            {games.map((game, index) => (
              <Link to={game.to} className="link-style" key={index}>
                <div
                  className="gamecard"
                >
                  <GameCard
                    image={game.image}
                    title={game.title}
                    background="#e6eddf"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section>
        <Container
          className="ending-section d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundImage: `url(${Icons})` }}
          fluid
        >
          <div className="ending-content rounded d-flex flex-column justify-content-center align-items-center p-5 shadow-sm">
            <h1>About ReEngage</h1>
            <p>
              ReEngage was created by students for students. Our mission is to
              provide high-quality educational resources, that are aligned with
              the national curriculum, in a fun and interactive way!
            </p>
            <button className="games rounded-pill">Sign Up</button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Hero;
