import React, { useState, useEffect } from "react";
import "./StarMath.css";
import {
  positionEquation,
  positionStars,
  intialiseDragAndDrop,
  setupClickSounds,
} from "./main";

function StarMathGame() {
  const [showTitleScreen, setShowTitleScreen] = useState(true);
  const [showYearChoices, setShowYearChoices] = useState(false);
  const [showMainGame, setShowMainGame] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const removeTitleScrn = () => {
    setShowTitleScreen(false);
    setShowYearChoices(true);
    console.log("showYearChoices after removeTitleScrn:", showYearChoices);
  };

  const selectYearGroup = (year) => {
    setShowYearChoices(false);
    setShowMainGame(true);
    console.log("year " + year + " selected");
  };

  const toggleHTP = () => {
    setShowHowToPlay((prev) => !prev);
    console.log("toggleHTP: showHowToPlay =", !showHowToPlay);
  };

  useEffect(() => {
    setupClickSounds();
    if (showMainGame) {
      positionStars();
      positionEquation();
      intialiseDragAndDrop();
      setupClickSounds();

      window.addEventListener("resize", () => {
        positionStars();
        positionEquation();
      });

      return () => {
        window.removeEventListener("resize", () => {
          positionStars();
          positionEquation();
        });
      };
    }
  }, [showMainGame]);

  useEffect(() => {
    if (showYearChoices) {
      setupClickSounds();
    }
  }, [showYearChoices]);

  useEffect(() => {
    if (showTitleScreen) {
      setupClickSounds();
    }
  }, [showTitleScreen]);

  useEffect(() => {
    if (showHowToPlay) {
      setupClickSounds();
    }
  }, [showHowToPlay]);

  return (
    <div className="game-container">
      {/* title screen */}
      {showTitleScreen && (
        <div id="titleScreen">
          <div>
            <h1 className="titleImg"></h1>
          </div>
          <div id="titleScrnComp">
            <div>
              <p>Drag the stars and solve the math!</p>
            </div>
            <div>
              <button
                type="button"
                className="playBtn"
                onClick={removeTitleScrn}
              >
                Play
              </button>
            </div>
            <div>
              <button
                type="button"
                className="playBtn HTPBtn"
                onClick={toggleHTP}
              >
                How to Play
              </button>
            </div>
          </div>
        </div>
      )}

      {/* how to play overlay */}
      {showHowToPlay && (
        <div id="howToPlay">
          <button type="button" className="exitHTP" onClick={toggleHTP}>
            ✕
          </button>
          <h2>How to play</h2>
          <p>Lorem ipsum dolor sit amet, mel ne homero recusabo...</p>
        </div>
      )}

      {/* choices of year group screen */}
      {showYearChoices && (
        <div id="yrChoices" className={showYearChoices ? "visible" : ""}>
          <div>
            <p>Choose your year group!</p>
          </div>
          {["Year 3", "Year 4", "Year 5", "Year 6"].map((year, index) => (
            <div key={index}>
              <button
                type="button"
                className="yrGpBtn"
                onClick={() => selectYearGroup(year)}
              >
                {`${year}`}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* main game */}
      {showMainGame && (
        <div id="mainGame">
          <div>
            <button
              type="button"
              onClick={toggleHTP}
              className="playBtn HTPBtn HTPBtn-M"
            >
              How to Play
            </button>
          </div>
          <div id="smallStars">
            {[50000, 10, 8, 1, 9, 11, 12, 80, 54, 12, 3, 5, 600].map(
              (value, index) => (
                <div className="drag" key={index}>
                  <p className="smallStar" id={`var${index + 1}`}>
                    {value}
                  </p>
                </div>
              )
            )}
          </div>

          {/* the equation, points and no. of questions solved elements */}
          <div id="theEquation">
            <div className="mainEquation">
              <div className="dropIt">
                <p id="firstNumber"></p>
              </div>
              <p id="operator" className="operands">
                +
              </p>
              <div className="dropIt">
                <p id="secondNumber"></p>
              </div>
              <p id="equals" className="operands">
                =
              </p>
              <div className="finalNumber">
                <p id="result">0</p>
              </div>
              <button type="button" className="check">
                Check
              </button>

              <div className="gamePoints" id="gamePoints">
                <div className="gamePoints2">
                  <p>Points: </p>
                  <p id="points">0</p>
                </div>
              </div>

              <div className="numQuestions" id="numQuestions">
                <div className="numQuestions2">
                  <p>Solved: </p>
                  <p id="numerator">0</p>
                  <p id="fractionSlash">/</p>
                  <p id="denominator">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StarMathGame;
