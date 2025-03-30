import { useState } from "react";

let numQuestions = "";
let difficulty = "";
let yearGroup = "";
const operatorArray = ["+", "-", "÷", "×"];
let operatorRef = "";
let firstNumRef = "";
let secondNumRef = "";
let resultNumRef = "";
let numeratorRef = "";
let pointRef = "";
let denominatorRef = "";
let starRefs = new Set();
let retry = 0;

//so just retrieving the choice options for year group, difficulty, and questionCount

export function yrGroupSorter(
  year,
  operatorRef2,
  firstNumRef2,
  secondNumRef2,
  resultNumRef2,
  numeratorRef2,
  pointRef2,
  denominatorRef2,
  starRefs2
) {
  operatorRef = operatorRef2;
  firstNumRef = firstNumRef2;
  secondNumRef = secondNumRef2;
  resultNumRef = resultNumRef2;
  numeratorRef = numeratorRef2;
  pointRef = pointRef2;
  denominatorRef = denominatorRef2;
  starRefs = starRefs2;
  switch (year) {
    case "Year 3":
      generateEqYr3();
      yearGroup = "Year 3";
      console.log(yearGroup + " yearGroup");
      break;
    case "Year 4":
      yearGroup = "Year 4";
      break;
    case "Year 5":
      yearGroup = "Year 5";
      break;
    case "Year 6":
      yearGroup = "Year 6";
      break;
  }
}

export function difficultyChoice(difficult) {
  switch (difficult) {
    case "Easy":
      difficulty = "Easy";
      console.log(difficult + "from game logic");
      break;
    case "Medium":
      difficulty = "Medium";
      break;
    case "Hard":
      difficulty = "Hard";
      break;
  }
}

export function questionCount(qAmount) {
  switch (qAmount) {
    case "5":
      numQuestions = "5";
      break;
    case "10":
      numQuestions = "10";
      break;
    case "15":
      numQuestions = "15";
      break;
    case "20":
      numQuestions = "20";
      break;
  }
}

export function changeDenominator() {
  const denominator = document.querySelector("#denominator");
  if (denominator) {
    denominator.innerHTML = numQuestions.trim();
    console.log("this was ran");
  } else {
    console.error("denominator element not found");
  }
}

//GENERATING EQUATIONS
export function generateEqYr3() {
  let twoOrThreeDigit = 0;
  let twoDigit = Math.floor(Math.random() * 99 + 10);
  let oneDigit = Math.floor(Math.random() * 9 + 1);
  let maxMul = Math.floor(Math.random() * 12 + 1);
  let multDivNum3 = [];
  let result = 0;
  let secondNumber = 0;
  let firstNumber = 0;
  let singleAnswer = 0;
  let validAnswers = new Set();
  let starValues = new Set();
  console.log("this is a test of factor div: " + getFactorPairsDiv(6));
  console.log("this is a test of factor div: " + getFactorPairsDiv(5));
  console.log("this is a test of factor div: " + getFactorPairsDiv(8));
  console.log("this is a test of factor div: " + getFactorPairsDiv(10));

  console.log("this is a test of factor mul: " + getFactorPairs(20));
  console.log("this is a test of factor mul: " + getFactorPairs(56));
  console.log("this is a test of factor mul: " + getFactorPairs(70));
  console.log("this is a test of factor mul: " + getFactorPairs(120));

  //I may combine two and three digits

  //checking the diffculty and setting variable/const based on that
  switch (difficulty) {
    case "Easy":
      multDivNum3 = [2, 5, 10, 50, 100];
      twoOrThreeDigit = Math.floor(Math.random() * (300 - 10 + 1)) + 10;
      break;
    case "Medium":
      multDivNum3 = [2, 3, 4, 5, 8, 10, 50, 100];
      twoOrThreeDigit = Math.floor(Math.random() * (600 - 10 + 1)) + 10;

      break;
    case "Hard":
      multDivNum3 = [2, 3, 4, 5, 6, 8, 10, 50, 100];
      twoOrThreeDigit = Math.floor(Math.random() * (999 - 10 + 1)) + 10;
      break;
  }

  //intialising the index for divide and multiply operators for random choice
  let multDivNum3Idx = Math.floor(Math.random() * multDivNum3.length);
  let multDiv = multDivNum3[multDivNum3Idx]; //select a multiplier randomly

  //randomly select an operator
  let randOperatorIdx = Math.floor(Math.random() * operatorArray.length);
  let selectedOperator = operatorArray[randOperatorIdx];

  if (operatorRef.current) {
    //check if ref is valid change the operator randomly.
    console.log(operatorArray[randOperatorIdx]);
    operatorRef.current.innerHTML = selectedOperator;
  } else {
    console.error("operator element not found");
  }

  //depending on the operator, a different type of equation will appear
  switch (selectedOperator) {
    case "+":
      //to generate an equation similar in the form _ + 18 = 26
      //randomly chooses a result and second number in the equation
      console.log("+ has run");
      result = twoOrThreeDigit;
      resultNumRef.current.innerText = result.toString();
      secondNumber = Math.floor(Math.random() * (result - 1)) + 1;
      secondNumRef.current.innerText = secondNumber.toString();
      singleAnswer = result - secondNumber;
      validAnswers.add(singleAnswer);
      console.log("2validtask ", validAnswers);
      starValues = generateStarValues(validAnswers);
      console.log("starvalues to add ", starValues);
      addValuesToStars(starValues);
      // starValues = generateStarValues([...validAnswers]);
      //addValuesToStars(starValues);
      break;
    case "-": //to generate an equation similar in the form _ - 6 = 26
      //randomly chooses a result and second number in the equation
      result = twoOrThreeDigit;
      resultNumRef.current.innerText = result.toString();
      secondNumber = Math.floor(Math.random() * (result / 2)) + 1; // ensure secondNumber is smaller
      secondNumRef.current.innerText = secondNumber.toString();
      singleAnswer = result + secondNumber;
      validAnswers.add(singleAnswer);
      console.log("2validtask ", validAnswers);
      starValues = generateStarValues(validAnswers);
      console.log("starvalues to add ", starValues);
      addValuesToStars(starValues);
      //starValues = generateStarValues([...validAnswers]);
      //addValuesToStars(starValues);
      break;
    case "×":
      let a = Math.floor(Math.random() * 2 + 1); //choose number 1 or 2 randomly
      if (a === 1) {
        //to generate an equation in the form _ * 6 = 18
        result = multDiv * maxMul;
        resultNumRef.current.innerText = result.toString();
        if (secondNumRef.current) {
          secondNumRef.current.innerHTML = multDiv.toString();
        } else {
          console.error("secondNumRef.current is undefined!");
        }
        singleAnswer = maxMul;
        validAnswers.add(singleAnswer);
        console.log("2valid answers are: ", validAnswers);
        starValues = generateStarValues(validAnswers);
        console.log("starvalues to add ", starValues);
        addValuesToStars(starValues);
        //starValues = generateStarValues([...validAnswers]);
      } else {
        // to generate an equation in the form _ * _ = 18
        result = multDiv * maxMul;
        resultNumRef.current.innerText = result.toString();
        let pairs = getFactorPairs(result);
        for (let value of pairs) {
          validAnswers.add(value);
        }
        console.log("2valid answers are: ", validAnswers);
        starValues = generateStarValues(validAnswers);
        console.log("starvalues to add ", starValues);
        addValuesToStars(starValues);
        //starValues = generateStarValues([...validAnswers]);
      }
      //addValuesToStars(starValues);
      break;
    case "÷":
      let b = Math.floor(Math.random() * 2 + 1); //choose number 1 or 2 randomly
      if (b === 1) {
        //to generate an equation in the form 20 / _ = 5
        let temp = multDiv * maxMul;
        firstNumRef.current.innerHTML = temp.toString();
        resultNumRef.current.innerText = multDiv.toString();
        singleAnswer = maxMul;
        validAnswers.add(singleAnswer);
        console.log("2valid answers are: ", validAnswers);
        starValues = generateStarValues(validAnswers);
        console.log("starvalues to add ", starValues);
        addValuesToStars(starValues);
        //starValues = generateStarValues([...validAnswers]);
      } else {
        // to generate an equation in the form _ / _ = 18
        result = maxMul;
        resultNumRef.current.innerText = result.toString();
        let pairs = getFactorPairsDiv(result);
        for (let value of pairs) {
          validAnswers.add(value);
        }
        starValues = generateStarValues(validAnswers);
        console.log("2valid answers are: ", validAnswers);
        console.log("starvalues to add ", starValues);
        addValuesToStars(starValues);
        //starValues = generateStarValues([...validAnswers]);
        //console.log(starValues + "these are star values");
      }
      //addValuesToStars(starValues);
      break;
  }
}

//returns factors of a number -- used in multiply
function getFactorPairs(result) {
  let factorPairs = [];
  for (let i = 1; i <= Math.sqrt(result); i++) {
    if (result % i === 0) {
      let pair = [i, result / i];
      //ensuring the pairs are ascending
      if (pair[0] > pair[1]) {
        pair = [pair[1], pair[0]];
      }

      if (i === result / i) {
        //perfect square so only one pair is added
        factorPairs.push(pair);
      } else {
        factorPairs.push(pair);
      }
    }
  }

  // factor pairs code
  if (factorPairs.length < 3) return factorPairs;

  //fisher-yates shuffle to randomise the array
  for (let i = factorPairs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [factorPairs[i], factorPairs[j]] = [factorPairs[j], factorPairs[i]];
  }

  console.log("factor pairs choice set div ", factorPairs.toString());

  let finalChoiceSet = new Set(
    [factorPairs[0], factorPairs[1], factorPairs[2]].flat()
  );

  console.log("final choice set div ", finalChoiceSet);

  return finalChoiceSet;
}

////returns possible results of a number -- used in divide
function getFactorPairsDiv(result) {
  let factorPairs = [];
  for (let i = 1; i <= 12; i++) {
    //checking possible divisors
    factorPairs.push([i * result, i]);
  }

  if (factorPairs.length < 3) return factorPairs;

  //fisher-yates shuffle to randomise the array
  for (let i = factorPairs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [factorPairs[i], factorPairs[j]] = [factorPairs[j], factorPairs[i]];
  }

  let finalChoiceSet = new Set(
    [factorPairs[0], factorPairs[1], factorPairs[2]].flat()
  );

  console.log("final choice set div ", finalChoiceSet);

  console.log("factor pairs choice set div ", factorPairs.toString());

  return finalChoiceSet;
}

//change the numbers on the small stars, dependent on the valid answers
//and generate some false star numbers

function generateStarValues(validAnswersArray) {
  let fakeAnswers = new Set();

  //find max/min value in array
  let maxVal = Math.max(...validAnswersArray);
  let minVal = Math.min(...validAnswersArray);
  console.log(maxVal);
  console.log(minVal);

  let numberOfStars = starRefs.current.length;
  console.log("number of stars", numberOfStars);
  console.log("valid answer array", validAnswersArray);

  //generating fake answers
  while (fakeAnswers.size < numberOfStars - validAnswersArray.size) {
    //to generate a 50% chance a number is above max
    let randomCondition = Math.random();
    let fakeAnswer;

    if (randomCondition < 0.33) {
      // generate a number less than min
      fakeAnswer = Math.floor(Math.random() * 50) + minVal - 50;

      //ensuring fakeAnswer is not less than 0
      if (fakeAnswer < 0) {
        fakeAnswer = Math.floor(Math.random() * (minVal - 1));
      }
    } else if (randomCondition < 0.66) {
      // generate a number between min and max
      fakeAnswer = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    } else {
      //generate a fake answer greater than max
      fakeAnswer = Math.floor(Math.random() * 50) + maxVal + 1;
    }
    console.log("fake answer");
    if (!validAnswersArray.has(fakeAnswer) && fakeAnswer > 0) {
      fakeAnswers.add(fakeAnswer);
    }
  }

  //converting the set to an array
  const allAnswers = [...fakeAnswers, ...validAnswersArray];

  let shuffleAnswers = shuffleArray(allAnswers);
  console.log("shuffle answes", shuffleAnswers);
  return shuffleArray(allAnswers);
}

//shuffles using fisher-yates
function shuffleArray(array) {
  //convert from set to array
  let sArray = new Set();

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  //convert from array to set
  for (let value of array) {
    sArray.add(value);
  }

  return sArray;
}

//add values to small stars
function addValuesToStars(starValues) {
  let newStarValues = Array.from(starValues);
  newStarValues.forEach((element, i) => {
    starRefs.current[i].innerHTML = element.toString();
  });
}

//this will check if the player's answer is correct
/*
retrieve the numbers from the operand variables
perform the equation calculation using the stored operator
compare the calculated result to the displayed result
if the answer correct:
increment the correct answer count
provide visual feedback - green checkmark
if the answer incorrect:
provide visual feedback - red */
//then advance onto the next question
export function checkEquation(changeToEndScreen) {
  //return true or false
  let firstNumber = parseInt(firstNumRef.current.innerHTML);
  let secondNumber = parseInt(secondNumRef.current.innerHTML);
  let result = parseInt(resultNumRef.current.innerHTML);
  let operator = operatorRef.current.innerHTML.trim();
  let numerator = parseInt(numeratorRef.current.innerHTML);
  let denominator = parseInt(denominatorRef.current.innerHTML);
  let leftEquation;
  let points = parseInt(pointRef.current.innerHTML);
  let pointIncrease = 100;

  switch (operator) {
    case "+":
      leftEquation = firstNumber + secondNumber;
      break;
    case "-":
      leftEquation = firstNumber - secondNumber;
      break;
    case "×":
      leftEquation = firstNumber * secondNumber;
      break;
    case "÷":
      leftEquation = firstNumber / secondNumber;
      break;
  }

  //checking if answer is correct
  if (leftEquation === result) {
    //correct
    numerator++;
    if (numerator > denominator) {
      //end game
      //switch to different screen
      console.log("Changing to End Screen...g");
      changeToEndScreen();
      console.log("Changing to End Screen...a");
      return;
    } else {
      retry = 0;
      points += pointIncrease;
      //clear operand stars
      secondNumRef.current.innerHTML = "";
      firstNumRef.current.innerHTML = "";
      pointRef.current.innerHTML = points.toString();
      numeratorRef.current.innerHTML = numerator.toString();
      generateEqYr3();
    }
  } else if (retry < 2) {
    //retry
    retry++;
  } else {
    //reveal answer and move on
    retry = 0;
    secondNumRef.current.innerHTML = "";
    firstNumRef.current.innerHTML = "";
    numerator++;
    numeratorRef.current.innerHTML = numerator.toString();
    generateEqYr3();
  }
}
