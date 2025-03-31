import React, { useState, useEffect, Component } from "react";
import './FillitFish.css';

// score system
// ending
// implement text to speech api: click the fish head to hear it
// wrong choice screen
// skip button that tells your the answer before moving on to the next round

function Choices({ text, choices = [], onSelect }) { // shws text and buttons
  return ( // if there is text, show it
    <div>
      {text !== '' && <div className="text">{text}</div>} 
      <div className="btn-container">
        {choices.map((choice) => (
          <button key={choice} onClick={() => onSelect(choice)} className="btn">
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

class AudioComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { play: false };
    this.audio = new Audio("./water.mp3");
    this.audio.loop = true;
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    this.setState(prevState => {
      if (!prevState.play) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      return { play: !prevState.play };
    });
  }
}

export default function TitleScreen() { // screen user sees before playing the game
  const [isOpen, setIsOpen] = useState(true); // Controls button visibility
  const [showTransitionScreen, setShowTransitionScreen] = useState(false); // Controls ChooseYear visibility
  const [showHelpScreen, setShowHelpScreen] = useState(false); // controls help screen visibility
  const [audio] = useState(new Audio("/water.mp3"));

  useEffect(() => {
    audio.loop = true;
  }, [audio]);

  function handleSelect() {
    setIsOpen(false);
    setShowTransitionScreen(true);
    audio.play(); // Start playing when the game starts
  }

  function handleHelp() {
    setShowHelpScreen(true);
  }

  function closeHelpScreen() {
    setShowHelpScreen(false);
  }

  return ( // only hides button so doesn't need a parent component
    <div className="bg">
      <div>
        {isOpen && <h1 className="icon Title-icon"></h1>}
      </div>
      {isOpen && <button onClick={handleSelect} class="center-btn btn">Start</button>} 
      {isOpen && <button onClick={handleHelp} class="btn" style = {{top: "85%", position: "absolute", left: "50%", transform: "translate(-50%, -50%)"}}>Help</button>}
      {showTransitionScreen && <TransitionScreen />}
      {showHelpScreen && <HelpScreen onClose={closeHelpScreen} />}
    </div>
  );
}

function HelpScreen({ onClose }) {
  return (
    <div className="helpWindow">
      <button className="close-btn btn" onClick={onClose}>x</button>
      <p className="helpText" style={{ height: "30%" }}>
        Help reassemble the fish by filling in the gaps to complete the word based on the definition given.
        <br /><br />
        Click on the fish's head for a clue!
      </p>
    </div>
  );
}

function TransitionScreen() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [roundsLeft, setRoundsLeft] = useState(3); // Track remaining rounds

  return (
    <div>
      {!selectedYear ? (
        <ChooseYear onSelect={setSelectedYear} />
      ) : roundsLeft > 0 ? (
        <Round 
          key={roundsLeft} // This forces re-mounting when roundsLeft changes
          wordBank={parseInt(selectedYear.split(" ")[1])}
          numLeft={roundsLeft}
          onNextRound={() => {setRoundsLeft(roundsLeft - 1)}}
        />
      ) : (
        <Finish />
      )}
    </div>
  );
}


function ChooseYear({ onSelect }) {
  function handleSelect(choice) {
    onSelect(choice); // Pass selected year to parent
  }
  return (
    <div>
      <Choices
        text="Choose your year"
        choices={["year 3", "year 4", "year 5", "year 6"]}
        onSelect={handleSelect}
      />
    </div>
  );
}

function Round({ wordBank, numLeft, onNextRound, totalScore }) {
  const [word, setWord] = useState(""); // the actual word for this round
  const [definition, setDefinition] = useState(null); // definition for current word
  const [hiddenWord, setHiddenWord] = useState(""); // the partially hidden word displayed to user
  const [hiddenIndexes, setHiddenIndexes] = useState([]); // indexes for each character hidden in hidden word
  const [isRoundComplete, setIsRoundComplete] = useState(false);

  const yearArrays = { // wordbanks for each year
    3: ['accept', 'except', 'peace', 'piece', 'knot', 'not', 'reign', 'main', 'mane', 'grate'],
    4: ['weather', 'whether', 'meddle', 'whose', 'scene', 'groan', 'effect', 'mist', 'missed', 'mail'],
    5: ['knight', 'doubt', 'island', 'lamb', 'solemn', 'thistle', 'aisle', 'ascent', 'weary', 'prophet'],
    6: ['stationary', 'compliment', 'complement', 'descent', 'dissent', 'draught', 'bridle', 'serial', 'aloud', 'allowed']
  }

    // defining the word when word changes using dictionary api
  useEffect(() => {
    if (!word) return;

    const fetchDefinition = async () => {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Word not found");
        
        const data = await response.json();
        setDefinition(data[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found");
      } catch (error) {
        setDefinition("Definition not found");
      }
    };

    fetchDefinition();
  }, [word]);

  function hideWord(wordToHide) {
    let num = Math.floor(wordToHide.length / 2);
    let hiddenArray = wordToHide.split(""); 

    while (num > 0) {
      let index = Math.floor(Math.random() * wordToHide.length);
      if (!hiddenIndexes.includes(index)) {
        hiddenArray[index] = "_"; // Replace letter with "_"
        setHiddenIndexes(prevIndexes => [...prevIndexes, index]);
        num--;
      }
    }

    setHiddenWord(hiddenArray.join(" ")); // Update state with the hidden word
  }

  function startRound() {
    const words = yearArrays[wordBank];  // Get the correct array
    const randomWord = words[Math.floor(Math.random() * words.length)]; // Choose a random word
    setWord(randomWord); 
    hideWord(randomWord); // Call hideWord with the new word
  }

  function handleSelect(choice) {  
    let hiddenArray = hiddenWord.split(" "); // Convert string to array
    let updated = false; // Track if letter was placed
    let i = 0

    while (!updated){
      if (hiddenArray[i] === "_"){
        hiddenArray[i] = choice
        updated = true
      }
      else{
        i++
      }
    }

    if (updated) {
        setHiddenWord(hiddenArray.join(" ")); // Update state to trigger re-render
    }

    // After updating, check if the word is fully revealed
    if (!hiddenArray.includes("_")) {  
        if (hiddenArray.join("") === word) { 
            //move to next round
            setIsRoundComplete(true);
        } else { 
            //reset word
            let resetArray = word.split("").map((char, i) => hiddenIndexes.includes(i) ? "_" : char);
            setHiddenWord(resetArray.join(" "));
        }
    }
  }

  function ChoppedFish(){
    let hiddenArray = hiddenWord.split(" ");

    function Word() {
      return (
        <div className="fish-container "> {/* Flex container */}
          {hiddenArray.map((item, index) =>
            index === 0 ? (
              <div key={index} className="fishbod-container fishhd-container">
                <p className="text-over-img fishhd-text">{item}</p>
              </div>
            ) : index === hiddenArray.length - 1 ? (
              <div key={index} className="fishbod-container fishtl-container">
                <p className="text-over-img fishtl-text">{item}</p>
              </div>
            ) : (
              <div key={index} className="fishbod-container fishmd-container">
                <p className="text-over-img">{item}</p>
              </div>
            )
          )}
        </div>
      );
    }       
    
    return(
      <Word />
    )
  }

  useEffect(() => {
    startRound(); // Auto-start the round when numLeft changes
  }, [numLeft]);

  return ( // hide start round button after clicking
    <div> 
      {!isRoundComplete ? (
          <div>
              {word && ( // displays this only when word changes
              <>
                <p className="definition">Definition: {definition}</p>
                <ChoppedFish />
                <Choices
                  text={''}
                  choices={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]}
                  onSelect={handleSelect}
                />
              </>
              )}
              
          </div>
        ) : (
          <div>
            {isRoundComplete && <h1 className="icon fishhappy-icon"></h1>}
            <div className="btn-container">
              <button onClick={onNextRound} className="btn center-btn">
                {numLeft > 1 ? "Next Round" : "Finish"}
              </button>
            </div>
          </div>
          
        )}
    </div>
  );
}

function Finish({year, roundsLeft}) { // logives a score at the end
  
  function handleSelect(choice) {  
    // redirect to homepage
  };

  return (
    <div>
      <h1 className="icon fishhappy-icon"></h1>
      <button onClick={handleSelect} className="btn center-btn">
        {"Return to Homepage"}
      </button>
    </div>
  )
}
  // make an ending 
  

