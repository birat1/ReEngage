import React, { useState, useEffect, useRef } from "react";
import "./StarMath.css";
import { yrGroupSorter, questionCount, changeDenominator } from "./game-logic";
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
  const [showQuestionChoices, setQuestionChoices] = useState(false);
  const [showDifficulty, setDifficulty] = useState(false);
  const [yearG, setYearG] = useState("");
  const operatorRef = useRef(null);

  //removes title screen and reveals the next screen - yr group choices
  const removeTitleScrn = () => {
    setShowTitleScreen(false);
    setShowYearChoices(true);
    console.log("showYearChoices after removeTitleScrn:", showYearChoices);
  };

  //removes yr group choices and reveals the difficulty screen
  const selectYearGroup = (year) => {
    setShowYearChoices(false);
    setDifficulty(true);
    //introducing the game logic by tailoring questions based on yr Group chosen
    setYearG(year);
    console.log(year + " selected");
  };

  //removes difficulty screen and shows question choices
  const selectDifficulty = (difficulty) => {
    setDifficulty(false);
    setQuestionChoices(true);
    console.log(difficulty + " selected");
  }

  //removes question choices and reveals the main game
  const selectQuestionAmount = (qAmount) => {
    setQuestionChoices(false);
    setShowMainGame(true);
    questionCount(qAmount);
    console.log(qAmount + " selected");
  };

  //toggle on/off button for the how to play button
  const toggleHTP = () => {
    setShowHowToPlay((currentState) => !currentState); //true -> false or false -> true
    console.log("toggleHTP: showHowToPlay =", !showHowToPlay);
  };

  // intialises the main game
  useEffect(() => {
    setupClickSounds();
    if (showMainGame) {
      positionStars();
      positionEquation();
      intialiseDragAndDrop();
      setupClickSounds();
      changeDenominator();
      console.log(yearG + "this is it");
      yrGroupSorter(yearG, operatorRef);

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

  // Adding the button click sound to all screens within the game
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

  useEffect(() => {
    if (showQuestionChoices) {
      setupClickSounds();
    }
  }, [showQuestionChoices]);

  useEffect(() => {
    if (showDifficulty) {
      setupClickSounds();
    }
  })

  return (
      <div className="star-math-container">
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
            {["Year 3", "Year 4", "Year 5", "Year 6"].map((year) => (
              <div>
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

        {/* choices of year group screen */}
        {showDifficulty && (
          <div id="diffChoices" className={showDifficulty ? "visible" : ""}>
            <div>
              <p>Choose your difficulty!</p>
            </div>
            {["Easy", "Medium", "Hard"].map((difficulty)=> (
              <div>
                <button
                  type="button"
                  className="yrGpBtn"
                  onClick={() => selectDifficulty(difficulty)}
                >
                  {`${difficulty}`}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* choice of how many questions */}
        {showQuestionChoices && (
          <div id="qChoices" className={showQuestionChoices ? "visible" : ""}>
            <div>
              <p>Pick the number of questions!</p>
            </div>
            <div className="btnQ">
              {["5", "10", "15", "20"].map((qAmount) => (
                <div>
                  <button
                    type="button"
                    className="yrGpBtn"
                    onClick={() => selectQuestionAmount(qAmount)}
                  >
                    {`${qAmount}`}
                  </button>
                </div>
              ))}
            </div>
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
                <p
                  id="operator"
                  ref={operatorRef}
                  key="operator-element"
                  className="operands"
                >
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
                <button type="button" className="check" id="checkEq">
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
                    <p>Questions: </p>
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
