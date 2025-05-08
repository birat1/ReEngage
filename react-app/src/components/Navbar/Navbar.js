import "./Navbar.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthStatus } from "../Authentication/CheckLoginStatus";
import { backendAPI } from "../../constants";
import { useCurrentEquippedAvatar } from "../RetrievingAvatars/CurrentEquippedAvatar";
import React, { useState } from "react";
import Default from "../../avatars/Default.png";

function Navigationbar() {
  const { isLoggedIn, userName, isLoading } = useAuthStatus();
  const currentAvatar = useCurrentEquippedAvatar();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${backendAPI}api/logout/`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar sticky-top">
      <div className="navbar-container d-flex align-items-center justify-content-between mx-auto">
        <Link to={"/"}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <img
              alt="ReEngage Logo"
              src={logo}
              width="50"
              height="50"
              className="logo"
            />
            <h2>ReEngage</h2>
          </div>
        </Link>

        {isLoggedIn ? (
          <div className={`nav-links gap-4 ${isOpen ? "active" : ""}`}>
            <Link to={"/"}>
              <span className="underline-ani">Home</span>
            </Link>
            <Link to={"/games"}>
              <span className="underline-ani">Games</span>
            </Link>
            <Link to={"/resources"}>
              <span className="underline-ani">Resources</span>
            </Link>
            <Link to={"/leaderboard"}>
              <span className="underline-ani">Leaderboard</span>
            </Link>
          </div>
        ) : (
          <></>
        )}

        {isLoggedIn ? (
          <div className="hstack gap-3">
            <div className="avatar-holder rounded overflow-hidden">
              <img
                alt="Avatar"
                src={currentAvatar || Default}
                className="img-cover"
              />
            </div>
            <div className="username d-flex gap-1" onClick={toggleDropdown}>
              {userName}
              <div className={`tri ${isDropdownOpen ? "rotate" : ""}`}>
                &#9207;
              </div>
            </div>
            {isDropdownOpen && (
              <div className="options-menu rounded shadow-sm d-flex flex-column gap-1 p-2">
                <Link to={"/dashboard"} className="option-item rounded p-1">
                  <span>Dashboard</span>
                </Link>
                <div className="option-item rounded p-1" onClick={handleLogout}>
                  <span>Logout</span>
                </div>
              </div>
            )}
            <div
              className={`nav-hamburger ${isOpen ? "change" : ""}`}
              onClick={toggleMenu}
            >
              <div className="bar-a rounded"> </div>
              <div className="bar-b rounded"> </div>
              <div className="bar-c rounded"> </div>
            </div>
          </div>
        ) : (
          <div>
            <Link to={"/login"}>
              <button className="login-button">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigationbar;
