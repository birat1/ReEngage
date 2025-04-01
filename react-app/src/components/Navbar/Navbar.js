import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Navigationbar() {
  return (
    <Navbar sticky="top" className="w-100 Navbar shadow-sm" fluid>
      <Container>
        <Navbar.Brand href="#home"><h2>ReEngage</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="mx-auto">
          <div className="ms-auto hstack gap-2">
            <Button className="rounded-pill">Login</Button>
            <Button className="rounded-pill">Sign Up</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
