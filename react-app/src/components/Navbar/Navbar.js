import "./Navbar.css";
import logo from "./logo.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { backendAPI } from '../../constants';

function Navigationbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${backendAPI}api/current-user-info/`, { withCredentials: true });
        if (response.status === 200 && response.data.username) {
          setIsLoggedIn(true);
          setUserName(response.data.username); // Set the username from the API response
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false); // Set loading to false after the check
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendAPI}api/logout/`, {}, { withCredentials: true });
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserName("");
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
          <div className="ms-auto hstack gap-3">
            {isLoading ? (
              // Show nothing or a placeholder while loading
              <div style={{ width: "100px", height: "40px" }}></div>
            ) : isLoggedIn ? (
              <>
                <div className="avatar-holder rounded overflow-hidden">
                  <img
                    alt="Avatar"
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXVhNXppajI5M2J0eWRzd3hmN3o0eWR0cHNjNHQyYWprMnhrczNjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gJzHT5BZZuQYbmw/giphy.gif"
                    className="img-cover"
                  />
                </div>
                <NavDropdown title={userName}>
                  <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">
                <button className="login-button">Login</button>
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;