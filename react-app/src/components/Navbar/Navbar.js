import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Navigationbar() {
  return (
    <Navbar sticky="top" className="w-100 Navbar shadow-sm" fluid>
      <Container>
        <Link to="/" className="link-style">
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <img alt="ReEngage Logo" src="logo.png" width="50" height="50"/>
          <h2>ReEngage</h2>
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="mx-auto">
          <div className="ms-auto hstack gap-2">
            <button className="login rounded-pill">Login</button>
            <button className="sign rounded-pill">Sign Up</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
