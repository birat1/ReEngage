import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './StartMenu.css';

const StartMenu = ({ onPlay }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const handleClose = () => {
    setShowHowToPlay(false);
  };

  return (
    <div className="start-menu">
      <h1 className="game-title">Lab Wars</h1>
      <div className="menu-buttons">
        <Button variant="primary" size="lg" onClick={onPlay} className="menu-button">
          Play Game
        </Button>
        <Button variant="info" size="lg" onClick={() => setShowHowToPlay(true)} className="menu-button">
          How to Play
        </Button>
      </div>

      <HowToPlayModal 
        show={showHowToPlay}
        onHide={handleClose}
      />
    </div>
  );
};

const HowToPlayModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>How to Play Lab Wars</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h5>Welcome to Lab Wars!</h5>
      <p>In this exciting science battle game:</p>
      <ul>
        <li>You play as a student battling against the Science Boss</li>
        <li>Answer science-related questions correctly to deal damage to the boss</li>
        <li>Questions can be single or multiple choice</li>
        <li>Each correct answer will make your character attack and damage the boss</li>
        <li>Wrong answers will give you feedback to help you learn</li>
        <li>Try to defeat the Science Boss by answering all questions correctly!</li>
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide} className="close-button">
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default StartMenu; 