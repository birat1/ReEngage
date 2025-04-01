import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <div className="body">
      <section>
        <Container className="hero-section" fluid>
          <Row style={{ height: "40em" }}>
            <Col>
              <div>
                <h1>Learn Through Play with ReEngage</h1>
                <p>Exciting games and resources to make learning fun!</p>
                <div className="hstack gap-2">
                  <Button className="blue-button rounded-pill">Games</Button>
                  <Button className="green-button rounded-pill">
                    Browse Resources
                  </Button>
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
          <div className="d-flex align-items-center flex-wrap">
            <Link to="/starmath">
              <Card className="game-card shadow-sm">
                <Card.Title>Starmath</Card.Title>
              </Card>
            </Link>
            <Link to="/fill-itfish">
              <Card className="game-card shadow-sm">
                <Card.Title>Fill-itFish</Card.Title>
              </Card>
            </Link>
            <Link to="/lab-wars">
              <Card className="game-card shadow-sm">
                <Card.Title>Lab Wars</Card.Title>
              </Card>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Hero;
