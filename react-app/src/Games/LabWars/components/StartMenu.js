import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './StartMenu.css';

const StartMenu = ({ onPlay }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showKeyStageModal, setShowKeyStageModal] = useState(false);
  const [selectedKeyStage, setSelectedKeyStage] = useState(null);

  const handleCloseHowToPlay = () => setShowHowToPlay(false);
  const handleCloseKeyStageModal = () => setShowKeyStageModal(false);

  const handlePlayGame = () => {
    setShowKeyStageModal(true); // Show the key stage selection modal
  };

  const handleSelectKeyStage = (keyStage) => {
    setSelectedKeyStage(keyStage);
    setShowKeyStageModal(false);
    onPlay(keyStage); // Pass the selected key stage to the onPlay function
  };

  return (
    <div className="start-menu">
      <h1 className="game-title">Lab Wars</h1>
      <div className="menu-buttons">
        <Button variant="primary" size="lg" onClick={handlePlayGame} className="menu-button">
          Play Game
        </Button>
        <Button variant="primary" size="lg" onClick={() => setShowHowToPlay(true)} className="menu-button">
          How to Play
        </Button>
      </div>

      <HowToPlayModal show={showHowToPlay} onHide={handleCloseHowToPlay} />

      {/* Key Stage Selection Modal */}
      <Modal show={showKeyStageModal} onHide={handleCloseKeyStageModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Key Stage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select your key stage to begin:</p>
          <div className="menu-buttons">
            <Button variant="primary" size="lg" onClick={() => handleSelectKeyStage('ks1')} className="menu-button">
              KS1
            </Button>
            <Button variant="primary" size="lg" onClick={() => handleSelectKeyStage('ks2')} className="menu-button">
              KS2
            </Button>
            <Button variant="primary" size="lg" onClick={() => handleSelectKeyStage('ks3')} className="menu-button">
              KS3
            </Button>
          </div>
        </Modal.Body>
      </Modal>
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