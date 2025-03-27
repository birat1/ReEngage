import React, { useState, useEffect, Component } from "react";
import './FillitFish.css';

// how to play option
// score system
// implement text to speech api
// wrong choice screen
// fish gui
// sound effects

function Choices({ text, choices = [], onSelect }) {
  return (
    <div>
      <div className="text">{text}</div>
      <div className="btn-container">
        {choices.map((choice) => (
          <button key={choice} onClick={() => onSelect(choice)} className="btn">
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

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
  const [audio] = useState(new Audio("/water.mp3"));

  useEffect(() => {
    audio.loop = true;
  }, [audio]);

  function handleSelect() {
    setIsOpen(false);
    setShowTransitionScreen(true);
    audio.play(); // Start playing when the game starts
  }

  return ( // only hides button so doesn't need a parent component
    <div className="bg">
      <div>
        {isOpen && <h1 className="icon"></h1>}
      </div>
      {isOpen && <button onClick={handleSelect} class="center-btn btn">Start</button>} 
      {showTransitionScreen && <TransitionScreen />}
    </div>
  );
}

function TransitionScreen() { // choose year hides itself entirely, so a parent component is needed to show FillitFish afterwards
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <div>
      {!selectedYear ? (
        <ChooseYear onSelect={setSelectedYear} />
      ) : (
        <FillitFish year={selectedYear} roundsLeft={3} />
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

function Round({ wordBank, numLeft }) {
  const [hasStarted, setHasStarted] = useState(false); // controls start round button visibility
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
    let randomWord = yearArrays[wordBank[5]][Math.floor(Math.random() * wordBank.length)]; // generate random word
    setWord(randomWord); 
    hideWord(randomWord); // Call hideWord with the new word
    setHasStarted(true); // Hide the start button
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

  return ( // hide start round button after clicking
    <div> 
      {!hasStarted && <button onClick={startRound} class="btn center-btn">Start Round</button>} 
      {!isRoundComplete ? (
          <div>
              {word && ( // displays this only when word changes
              <>
                <p className="definition">Definition: {definition}</p>
                <Choices
                  text={"Word: " + hiddenWord}
                  choices={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]}
                  onSelect={handleSelect}
                />
              </>
            )}
          </div>
        ) : (
            <FillitFish year={wordBank} roundsLeft={numLeft - 1} />
        )}
    </div>
  );
}

function FillitFish({year, roundsLeft}) { // loops rounds and gives a score at the end

  if (roundsLeft > 0){
    return(
      <div>
        <Round wordBank={year} numLeft={roundsLeft}/>
      </div>
    )
  }

  // make an ending 
  
}
