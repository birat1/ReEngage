import React, { useState } from "react";

// how to play option
// finish Round: click and drag

function Choices({text, choices = [], onSelect}){ // outputs text along with the corresponding choices
  return (
      <div>
        {text}
          <div>
              {choices.map((choice) => (
              <button
                  key={choice}
                  onClick={() => onSelect(choice)}
              >
                  {choice}
              </button>
              ))}
          </div>
      </div>
    );
};

function ChooseYear(){ // a pop up screen that makes the user choose what year they're in
  const [selectedChoice, setSelectedChoice] = useState(null); // State to store selected choice
  const [isOpen, setIsOpen] = useState(true); // shows the function
  const [showFillitFish, setShowFillitFish] = useState(false); // Controls ChooseYear visibility

  if (!isOpen) return null; // if not open then does not display function

  function handleSelect(choice) {
    setSelectedChoice(choice); // Update the state with selected choice
    setIsOpen(false) //close function 
    setShowFillitFish(true) // open FillitFish
  }

  return (
    <div>
      <Choices // calling Choices so that user chooses their year
        text="Choose your year"
        choices={["year 3", "year 4", "year 5", "year 6"]}
        onSelect={handleSelect}
      />
      {showFillitFish && <FillitFish year={selectedChoice} />}
    </div>
  );
}

function TitleScreen() { // screen user sees before playing the game
  const [isOpen, setIsOpen] = useState(true); // Controls TitleScreen visibility
  const [showChooseYear, setShowChooseYear] = useState(false); // Controls ChooseYear visibility

  function handleSelect() {
    setIsOpen(false); // Hide TitleScreen
    setShowChooseYear(true); // Show ChooseYear
  }

  return (
    <div>
      {isOpen && <button onClick={handleSelect}>Start</button>}
      {showChooseYear && <ChooseYear />}
    </div>
  );
}

function Round({wordBank}){ // a single round 
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  let copy, hidden;

  const fetchDefinition = async () => {
    if (!word.trim()) return;

    setDefinition(null);
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error("Word not found");
    }
    const data = await response.json();
    setDefinition(data[0]);
  }

  function handleSelect(choice){ // check if all spaces have been filled. If they have, check if they are correct

  }

  function hideWord(){ // hide half of the letters and store the hidden letters
    let num = word.length / 2;
    hidden = [];
    let usedChar = [];
    while (num != 0){
      let int = Math.floor(Math.random() * word.length);
      let char = word[int];
      if (!usedChar.includes(int)){ // checks if the randomly selected character had already been selected
        hidden.concat(char); // if not, replace the character with an empty space and decrease num by one
        usedChar.concat(int);
        copy.replace(copy[int], ' ');
        num--;
      }
    }
  }

  function Play(){
    setWord(wordBank[Math.random(0,9)])
    copy = word
    fetchDefinition();
    hideWord();
    <div>
      <Choices
        text={definition}
        choices={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]}
        onSelect={handleSelect}
      />
    </div>
  }

}

function FillitFish({year}) { // loops rounds and gives a score at the end

  const yearArrays = {
    3: ['accept', 'except', 'peace', 'piece', 'knot', 'not', 'reign', 'main', 'mane', 'grate'],
    4: ['weather', 'whether', 'meddle', 'whose', 'scene', 'groan', 'effect', 'mist', 'missed', 'mail'],
    5: ['knight', 'doubt', 'island', 'lamb', 'solemn', 'thistle', 'aisle', 'ascent', 'weary', 'prophet'],
    6: ['stationary', 'compliment', 'complement', 'descent', 'dissent', 'draught', 'bridle', 'serial', 'aloud', 'allowed']
  }

  function loopRounds(){
    for (let i = 1; i <= 5; i++) {
      <Round Year = {yearArrays[year[5]]}/>
    }
  }

  return(
    loopRounds()
  );
}

export default function StartGame() {
  return <TitleScreen />;
}
