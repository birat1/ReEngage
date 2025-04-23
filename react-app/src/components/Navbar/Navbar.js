import "./Navbar.css";
import logo from "./logo.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Navigationbar() {
  return (
    <Navbar sticky="top" expand="lg" className="w-100 Navbar">
      <Container>
        <Link to="/" className="link-style">
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <img
              alt="ReEngage Logo"
              src={logo}
              width="50"
              height="50"
              className="logo"
            />
            <h2>ReEngage</h2>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-center">
          <Nav className="d-flex justify-content-center w-100">
            <Nav.Link href="/" to="/Home">
              <span className="underline-ani">Home</span>
            </Nav.Link>
            <Nav.Link href="/games">
              <span className="underline-ani">Games</span>
            </Nav.Link>
            <Nav.Link href="/resources">
              <span className="underline-ani">Resources</span>
            </Nav.Link>
            <Nav.Link href="/leaderboard">
              <span className="underline-ani">Leaderboard</span>
            </Nav.Link>
          </Nav>
          {/* <div className="ms-auto hstack gap-2">
            <button className="login rounded-pill">Login</button>
            <button className="sign rounded-pill">Sign Up</button>
          </div> */}
          <div className="ms-auto hstack gap-3">
            <div className="avatar-holder rounded overflow-hidden">
              <img alt="Avatar" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXVhNXppajI5M2J0eWRzd3hmN3o0eWR0cHNjNHQyYWprMnhrczNjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gJzHT5BZZuQYbmw/giphy.gif" className="img-cover"/>
            </div>
            <NavDropdown title="Student Name">
              <NavDropdown.Item href="#action/3.1">Avatar Page</NavDropdown.Item>
              <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
