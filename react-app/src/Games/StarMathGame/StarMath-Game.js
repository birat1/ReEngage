import React, { useState, useEffect, useRef } from "react";
import "./StarMath.css";
import EndGameOverlay from "./components/EndGameOverlay";
import {
  yrGroupSorter,
  questionCount,
  changeDenominator,
  difficultyChoice,
  checkEquation,
  removeCheckButtonListenser,
} from "./components/game-logic";
import {
  positionEquation,
  positionStars,
  intialiseDragAndDrop,
  setupClickSounds,
} from "./components/main";

function StarMathGame() {
  const [showTitleScreen, setShowTitleScreen] = useState(true);
  const [showYearChoices, setShowYearChoices] = useState(false);
  const [showMainGame, setShowMainGame] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showQuestionChoices, setQuestionChoices] = useState(false);
  const [showDifficulty, setDifficulty] = useState(false);
  const [showEndScreen, setEndScreen] = useState(false);
  const [showWrongResponse, setWrongResponse] = useState(false);
  const [showCorrectResponse, setCorrectResponse] = useState(false);
  const [showRetryResponse, setRetryResponse] = useState(false);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const [wrongMessage, setWrongMessage] = useState("");
  const [finalPoints, setFinalPoints] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [yearG, setYearG] = useState("");
  const operatorRef = useRef(null);
  const firstNumRef = useRef(null);
  const secondNumRef = useRef(null);
  const resultNumRef = useRef(null);
  const numeratorRef = useRef(null);
  const denominatorRef = useRef(null);
  const pointRef = useRef(null);
  const correctRef = useRef(null);
  const wrongRef = useRef(null);
  const retryRef = useRef(null);
  const starRefs = useRef([]);

  //reset game
  const resetGame = () => {
    setShowTitleScreen(true);
    setShowYearChoices(false);
    setShowMainGame(false);
    setShowHowToPlay(false);
    setQuestionChoices(false);
    setDifficulty(false);
    setShowEndOverlay(false);
    setWrongResponse(false);
    setCorrectResponse(false);
    setRetryResponse(false);
    setFinalPoints(false);
    setTotalQuestions(false);
    setEndScreen(false);
    numeratorRef.current.innerHTML = "1";
    pointRef.current.innerHTML = "0";
  };

  // converts symbols to words for better pronunciation
  const convertSymbolsToWords = (text) => {
    return text
      .replace(/\+/g, " plus ")
      .replace(/-/g, " minus ")
      .replace(/\×/g, " times ")
      .replace(/÷/g, " divided by ");
  };

  //handling webToSpeech API
  const handleTextToSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = convertSymbolsToWords(text);
    speech.lang = "en-GB";
    window.speechSynthesis.speak(speech);
  };

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
    difficultyChoice(difficulty);
    setQuestionChoices(true);
    console.log(difficulty + " selected");
  };

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

  const changeToEndScreen = () => {
    setTimeout(() => {
      setFinalPoints(parseInt(pointRef.current.innerHTML));
      setTotalQuestions(parseInt(denominatorRef.current.innerHTML));
      setShowEndOverlay(true);
    }, 2500);
  };

  //controls the wrong, correct and retry response
  const toggleWrongResponse = (answer) => {
    setCorrectResponse(false);
    setRetryResponse(false);
    setWrongResponse(true);

    setWrongMessage(
      "Nice effort, but the correct answer is " + answer.toString()
    );
    setTimeout(() => {
      setWrongResponse(false);
    }, 2500);
  };

  const toggleCorrectResponse = () => {
    setRetryResponse(false);
    setWrongResponse(false);
    setCorrectResponse(true);

    setTimeout(() => {
      setCorrectResponse(false);
    }, 2500);
  };

  const toggleRetryResponse = () => {
    setCorrectResponse(false);
    setWrongResponse(false);
    setRetryResponse(true);

    setTimeout(() => {
      setRetryResponse(false);
    }, 2500);
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
      yrGroupSorter(
        yearG,
        operatorRef,
        firstNumRef,
        secondNumRef,
        resultNumRef,
        numeratorRef,
        pointRef,
        denominatorRef,
        starRefs,
        correctRef,
        wrongRef,
        retryRef
      );

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
  });

  useEffect(() => {
    if (showEndScreen) {
      setupClickSounds();
    }
  }, [showEndScreen]);

  useEffect(() => {
    if (showCorrectResponse) {
      setupClickSounds();
    }
  }, showCorrectResponse);

  useEffect(() => {
    if (showWrongResponse) {
      setupClickSounds();
    }
  }, showWrongResponse);

  useEffect(() => {
    if (showCorrectResponse) {
      setupClickSounds();
    }
  }, showCorrectResponse);

  useEffect(() => {
    if (showEndOverlay) {
      setupClickSounds();
    }
  }, showEndOverlay);

  useEffect(() => {
    if (wrongMessage && wrongRef.current) {
      wrongRef.current.innerHTML = wrongMessage;
      setTimeout(() => {
        setWrongResponse(false);
        setWrongMessage(""); // clear the message
      }, 2500);
    }
  }, [wrongMessage]);

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
              <p className="gameSlogan">Drag the stars and solve the math!</p>
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
          <h2 className="htpTitle">How to play</h2>
          <p>
            Drag a number from the stars and drop it on the blank star, to
            complete the equation.
          </p>
          <p>
            You have 2 tries to get it right before the answer is shown, good
            luck!
          </p>
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

      {/* choices of difficulty */}
      {showDifficulty && (
        <div id="diffChoices" className={showDifficulty ? "visible" : ""}>
          <div>
            <p>Choose your difficulty!</p>
          </div>
          {["Easy", "Medium", "Hard"].map((difficulty, index) => (
            <div key={index}>
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
            {["5", "10", "15", "20"].map((qAmount, index) => (
              <div key={index}>
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
          <div className="side-button-container">
            <button
              type="button"
              onClick={toggleHTP}
              className="playBtn HTPBtn HTPBtn-M"
            >
              How to Play
            </button>
             {/* Text-to-Speech button */}
            <button
              type="button"
              className="speechBtn"
              onClick={() =>
                handleTextToSpeech(
                  `${firstNumRef.current.innerHTML} ${operatorRef.current.innerHTML} ${secondNumRef.current.innerHTML} = ${resultNumRef.current.innerHTML}`
                )
              }
            >
              Read Equation
            </button>
          </div>
          <div id="smallStars">
            {[50000, 10, 8, 1, 9, 11, 12, 80, 54, 12, 3, 5, 600].map(
              (value, index) => (
                <div className="drag" key={index}>
                  <p
                    className="smallStar"
                    id={`var${index + 1}`}
                    ref={(el) => (starRefs.current[index] = el)}
                  >
                    {value}
                  </p>
                </div>
              )
            )}
          </div>

          {/* the equation, points and no. of questions solved elements */}
          <div id="theEquation">
            <div className="mainEquation">
              <div className="operandStars operand1">
                <p id="firstNumber" ref={firstNumRef}></p>
              </div>
              <p
                id="operator"
                ref={operatorRef}
                key="operator-element"
                className="operands"
              >
                +
              </p>
              <div className="operandStars operand2">
                <p id="secondNumber" ref={secondNumRef}></p>
              </div>
              <p id="equals" className="operands">
                =
              </p>
              <div className="finalNumber dropIt">
                <p id="result" ref={resultNumRef}></p>
              </div>
              <button
                type="button"
                className="check"
                id="checkEq"
                onClick={() => {
                  checkEquation(
                    () => changeToEndScreen(),
                    toggleCorrectResponse,
                    (answer) => toggleWrongResponse(answer),
                    toggleRetryResponse
                  );
                }}
              >
                Check
              </button>

              <div className="gamePoints" id="gamePoints">
                <div className="gamePoints2">
                  <p>Points: </p>
                  <p id="points" ref={pointRef}>
                    0
                  </p>
                </div>
              </div>

              <div className="numQuestions" id="numQuestions">
                <div className="numQuestions2">
                  <p>Question: </p>
                  <p id="numerator" ref={numeratorRef}>
                    1
                  </p>
                  <p id="fractionSlash">/</p>
                  <p id="denominator" ref={denominatorRef}>
                    10
                  </p>
                </div>
              </div>

              {/* Correct answer response */}
              {showCorrectResponse && (
                <div id="correctResp" className="correctResponse">
                  <p id="correctResponse2" ref={correctRef}>
                    Correct answer, well done!
                  </p>
                </div>
              )}

              {/* Retry answer response */}
              {showRetryResponse && (
                <div id="retryResp" className="retryResponse">
                  <p id="retryResponse2" ref={retryRef}>
                    Not quite, give it another go!
                  </p>
                </div>
              )}

              {/* Wrong answer response */}
              {showWrongResponse && (
                <div id="wrongResp" className="wrongResponse">
                  <p id="wrongResponse2" ref={wrongRef}></p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* end game screen */}
      {showEndOverlay && (
        <EndGameOverlay
          points={finalPoints}
          questions={totalQuestions}
          resetGame={resetGame}
        />
      )}
    </div>
  );
}

export default StarMathGame;
