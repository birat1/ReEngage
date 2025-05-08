import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./components/QuestionCard";
import AnswerOptions from "./components/AnswerOptions";
import FeedbackMessage from "./components/FeedbackMessage";
import StartMenu from "./components/StartMenu";
import GameOver from "./components/GameOver";
import { fetchQuestions } from "./data/questions";
import BackgroundMusic from "./components/backgroundMusic";
import "./LabWars.css";
import { CheckLoggedIn } from "../../components/Authentication/CheckLoginStatus";

const BattleScene = ({ isAttacking, isBossTilting }) => (
  <div className="battle-scene">
    {/* Display the student character */}
    <div className="battle-container">
      <div
        className={`character-circle student-circle ${
          isAttacking ? "shake" : ""
        }`}
      >
        <div className={`player-character ${isAttacking ? "shake" : ""}`}>
          👨‍🔬
        </div>
      </div>
    </div>

    {/* Display the VS text */}
    <div className="vs-text">VS</div>

    {/* Display the boss character */}
    <div className="battle-container">
      <div
        className={`character-circle boss-circle ${
          isBossTilting ? "tilt" : ""
        }`}
      >
        <div className="boss-character">👾</div>
      </div>
    </div>
  </div>
);

const LabWars = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState({ message: "", isCorrect: null });
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isBossTilting, setIsBossTilting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctQuestionsAnswered, setCorrectQuestionsAnswered] = useState(0);
  const [points, setPoints] = useState(0);

  const handleTextToSpeech = (text) => {
    if (isSpeaking) return; // Prevent multiple clicks

    setIsSpeaking(true); // Set speaking state to true
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-GB";

    // Reset speaking state when speech ends
    speech.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  const handleStartGame = async (keyStage) => {
    setIsLoading(true);
    const fetchedQuestions = await fetchQuestions(keyStage);
    setQuestions(fetchedQuestions);
    setIsLoading(false);
    setGameStarted(true);
  };

  const handlePlayAgain = async () => {
    const fetchedQuestions = await fetchQuestions();
    setQuestions(fetchedQuestions);
    setGameOver(false);
    setCurrentQuestion(0);
    setFeedback({ message: "", isCorrect: null });
    setIsAnswered(false);
  };

  // Handle return to homepage
  const handleReturnHome = () => {
    navigate("/");
  };

  // Check if the submitted answers are correct based on the question type
  const checkAnswer = (selectedAnswers, question) => {
    const correctAnswers = question.answers
      .map((answer, index) => (answer.distractor === false ? index : null))
      .filter((index) => index !== null);

    if (selectedAnswers.length !== correctAnswers.length) {
      return false;
    }

    const sortedSelected = [...selectedAnswers].sort();
    const sortedCorrect = [...correctAnswers].sort();
    return sortedSelected.every((val, idx) => val === sortedCorrect[idx]);
  };

  // Handle the submission of the answer
  const handleSubmit = (selectedAnswers) => {
    setIsAnswered(true);
    const currentQ = questions[currentQuestion];
    const isCorrect = checkAnswer(selectedAnswers, currentQ);

    // Increment the number of questions answered
    setQuestionsAnswered((prev) => prev + 1);

    // Provide feedback depending on if the answer is correct or not
    if (isCorrect) {
      // Increment the number of correct questions answered
      setCorrectQuestionsAnswered((prev) => prev + 1);
      // Update points based on the number of correct answers
      setPoints((prev) => prev + 100);

      setIsAttacking(true);
      setIsBossTilting(true);
      setFeedback({
        message: "Great job! You got it right! 🎉",
        isCorrect: true,
      });
      // Reset the attack and tilt animations after they complete
      setTimeout(() => {
        setIsAttacking(false);
        setIsBossTilting(false);
      }, 300);
    } else {
      setFeedback({
        message: `Oops! That’s not correct. Try again next time! ❌`,
        isCorrect: false,
      });
    }

    // Progress to next question after delay
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setFeedback({ message: "", isCorrect: null });
        setIsAnswered(false);
      }, 2000);
    } else {
      // If this was the last question, show game over screen after delay
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  };

  if (!gameStarted) {
    if (isLoading) {
      return (
        <Container className="lab-wars-container loading-screen">
          <Spinner animation="border" variant="primary" role="status" />
          <h2 className="mt-4">Loading Questions...</h2>
        </Container>
      );
    }

    return (
      <Container className="lab-wars-container">
        <CheckLoggedIn>
          <StartMenu onPlay={handleStartGame} />
        </CheckLoggedIn>
      </Container>
    );
  }

  if (gameOver) {
    return (
      <Container className="lab-wars-container">
        <GameOver
          onPlayAgain={handlePlayAgain}
          onReturnHome={handleReturnHome}
          questionsAnswered={questionsAnswered}
          correctQuestionsAnswered={correctQuestionsAnswered}
          points={points}
        />
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container className="lab-wars-container">
        <h1 className="game-title">No Questions Found...</h1>
      </Container>
    );
  }

  return (
    <CheckLoggedIn>
      <Container className="lab-wars-container">
        <BackgroundMusic />

        <button
          type="button"
          className="read-question-btn"
          onClick={() =>
            handleTextToSpeech(questions[currentQuestion].question)
          }
          disabled={isSpeaking}
        >
          {isSpeaking ? "Speaking..." : "Read Question"}
        </button>

        <h1 className="game-title">Lab Wars</h1>

        <BattleScene isAttacking={isAttacking} isBossTilting={isBossTilting} />

        <QuestionCard
          question={questions[currentQuestion].question}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
        >
          <AnswerOptions
            options={questions[currentQuestion].answers.map(
              (answer) => answer.content
            )}
            onSubmit={handleSubmit}
            isAnswered={isAnswered}
            correctAnswers={questions[currentQuestion].answers
              .map((answer, index) =>
                answer.distractor === false ? index : null
              )
              .filter((index) => index !== null)}
            isMultiple={
              questions[currentQuestion].answers.filter(
                (answer) => answer.distractor === false
              ).length > 1
            }
          />
        </QuestionCard>

        <FeedbackMessage
          message={feedback.message}
          isCorrect={feedback.isCorrect}
        />
      </Container>
    </CheckLoggedIn>
  );
};

export default LabWars;
