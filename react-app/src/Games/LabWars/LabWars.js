import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './components/QuestionCard';
import AnswerOptions from './components/AnswerOptions';
import FeedbackMessage from './components/FeedbackMessage';
import StartMenu from './components/StartMenu';
import GameOver from './components/GameOver';
import { questions } from './data/questions';
import './LabWars.css';

const BattleScene = ({ isAttacking, isBossTilting }) => (
  <div className="battle-scene">
    {/* Display the student character */}
    <div className="battle-container">
      <div className="character-name student-name">Student</div>
      <div className={`character-circle student-circle ${isAttacking ? 'shake' : ''}`}>
        <div className={`player-character ${isAttacking ? 'shake' : ''}`}>👨‍🔬</div>
      </div>
    </div>

    {/* Display the VS text */}
    <div className="vs-text">VS</div>

    {/* Display the boss character */}
    <div className="battle-container">
      <div className="character-name boss-name">Science Boss</div>
      <div className={`character-circle boss-circle ${isBossTilting ? 'tilt' : ''}`}>
        <div className="boss-character">👾</div>
      </div>
    </div>
  </div>
);

const LabWars = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: null });
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isBossTilting, setIsBossTilting] = useState(false);

  // Check if the submitted answers are correct based on the question type
  const checkAnswer = (selectedAnswers, question) => {
    if (question.type === 'single') {
      return selectedAnswers.length === 1 && selectedAnswers[0] === question.correct;
    } else {
      // For multiple choice, check if selected answers match exactly with correct answers
      if (selectedAnswers.length !== question.correct.length) return false;
      const sortedSelected = [...selectedAnswers].sort();
      const sortedCorrect = [...question.correct].sort();
      return sortedSelected.every((val, idx) => val === sortedCorrect[idx]);
    }
  };

  // Handle the submission of the answer
  const handleSubmit = (selectedAnswers) => {
    setIsAnswered(true);
    const currentQ = questions[currentQuestion];
    const isCorrect = checkAnswer(selectedAnswers, currentQ);

    // Provide feedback depending on if the answer is correct or not
    if (isCorrect) {
      // TODO: Implement boss damage system
      setIsAttacking(true);
      setIsBossTilting(true);
      setFeedback({
        message: 'Correct! You dealt damage to the boss!',
        isCorrect: true
      });
      // Reset the attack and tilt animations after they complete
      setTimeout(() => {
        setIsAttacking(false);
        setIsBossTilting(false);
      }, 300);
    } else {
      setFeedback({
        message: `Not quite! ${currentQ.explanation}`,
        isCorrect: false
      });
    }

    // Progress to next question after delay
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setFeedback({ message: '', isCorrect: null });
        setIsAnswered(false);
      }, 2000);
    } else {
      // If this was the last question, show game over screen after delay
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  };

  // Handle play again
  const handlePlayAgain = () => {
    setGameOver(false);
    setCurrentQuestion(0);
    setFeedback({ message: '', isCorrect: null });
    setIsAnswered(false);
  };

  // Handle return to homepage
  const handleReturnHome = () => {
    navigate('/');
  };

  if (!gameStarted) {
    return (
      <Container className="lab-wars-container">
        <StartMenu onPlay={() => setGameStarted(true)} />
      </Container>
    );
  }

  if (gameOver) {
    return (
      <Container className="lab-wars-container">
        <GameOver 
          onPlayAgain={handlePlayAgain} 
          onReturnHome={handleReturnHome} 
        />
      </Container>
    );
  }

  return (
    <Container className="lab-wars-container">
      <h1 className="game-title">Lab Wars</h1>
      
      <BattleScene isAttacking={isAttacking} isBossTilting={isBossTilting} />

      <QuestionCard 
        question={questions[currentQuestion].question}
        questionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
      >
        <AnswerOptions 
          options={questions[currentQuestion].options}
          onSubmit={handleSubmit}
          correctAnswer={questions[currentQuestion].correct}
          isAnswered={isAnswered}
          isMultiple={questions[currentQuestion].type === 'multiple'}
        />
      </QuestionCard>

      <FeedbackMessage 
        message={feedback.message}
        isCorrect={feedback.isCorrect}
      />
    </Container>
  );
};

export default LabWars; 