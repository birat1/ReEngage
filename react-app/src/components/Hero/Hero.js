import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Maths from "./assets/Maths.png";
import Flask from "./assets/Flask.png";
import Book from "./assets/Open-Book.png";
import GameCard from "../GameCard/GameCard.js";
import "./Hero.css";

function Hero() {
  return (
    <div className="body">
      <section>
        <Container className="hero-section" fluid>
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
            <Link to="/starmath" className="link-style">
              <GameCard image={Maths} title={"Starmath"} background={"#e8eede"} />
            </Link>
            <Link to="/fill-itfish" className="link-style">
              <GameCard image={Book} title={"Fill-itFish"} background={"#e8eede"}/>
            </Link>
            <Link to="/lab-wars" className="link-style">
              <GameCard image={Flask} title={"LabWars"} background={"#e8eede"}/>
            </Link>
          </div>
        </Container>
      </section>
      <section>
        <Container
          className="ending-section d-flex flex-column justify-content-center align-items-center"
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
