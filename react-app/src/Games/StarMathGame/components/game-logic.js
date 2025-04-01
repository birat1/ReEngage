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
let correctRef = "";
let wrongRef = "";
let retryRef = "";
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
  starRefs2,
  correctRef2,
  wrongRef2,
  retryRef2
) {
  operatorRef = operatorRef2;
  firstNumRef = firstNumRef2;
  secondNumRef = secondNumRef2;
  resultNumRef = resultNumRef2;
  numeratorRef = numeratorRef2;
  pointRef = pointRef2;
  denominatorRef = denominatorRef2;
  starRefs = starRefs2;
  correctRef = correctRef2;
  wrongRef = wrongRef2;
  retryRef = retryRef2;
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

  //I may combine two and three digits

  //checking the diffculty and setting variable/const based on that
  switch (difficulty) {
    case "Easy":
      multDivNum3 = [2, 5, 10, 50];
      // generates random number between 10 and 300 inclusive
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

  const resultNum = document.querySelector(".finalNumber");
  const firstNum = document.querySelector(".operand1");
  const secondNum = document.querySelector(".operand2");

  //depending on the operator, a different type of equation will be generated
  switch (selectedOperator) {
    case "+":
      //regaining the permission of dragging an element over from result to Num
      resultNum.classList.add("dropIt");
      firstNum.classList.remove("dropIt");
      secondNum.classList.remove("dropIt");
      console.log("+ has run");
      firstNumber = twoOrThreeDigit;
      secondNumber =
        Math.floor(
          Math.random() *
            (difficulty === "Easy"
              ? 300
              : difficulty === "Medium"
              ? 600
              : 999 - 10 + 1)
        ) + 10;
      firstNumRef.current.innerText = firstNumber.toString();
      secondNumRef.current.innerText = secondNumber.toString();
      result = firstNumber + secondNumber;
      starValues = generateStarValues(result);
      addValuesToStars(starValues);
      break;
    case "-":
      //regaining the permission of dragging an element over from result to Num
      resultNum.classList.add("dropIt");
      firstNum.classList.remove("dropIt");
      secondNum.classList.remove("dropIt");
      firstNumber = twoOrThreeDigit;
      firstNumRef.current.innerText = firstNumber.toString();
      secondNumber = Math.floor(Math.random() * (firstNumber / 2)) + 1; // ensure secondNumber is smaller
      secondNumRef.current.innerText = secondNumber.toString();
      result = firstNumber - secondNumber;
      starValues = generateStarValues(result);
      addValuesToStars(starValues);
      break;
    case "×":
      let a = Math.floor(Math.random() * 2 + 1); //choose number 1 or 2 randomly
      if (a === 1) {
        //to generate an equation in the form _ * 6 = 18
        result = multDiv * maxMul;
        resultNumRef.current.innerText = result.toString();
        if (secondNumRef.current) {
          secondNumRef.current.innerHTML = maxMul.toString();
        } else {
          console.error("secondNumRef.current is undefined!");
        }

        //removing the permission of dragging an element over from result to Num
        resultNum.classList.remove("dropIt");
        firstNum.classList.add("dropIt");
        secondNum.classList.remove("dropIt");
        starValues = generateStarValues(multDiv);
        addValuesToStars(starValues);
        //starValues = generateStarValues([...validAnswers]);
      } else {
        // to generate an equation in the form 6 * 3 = _
        //regaining the permission of dragging an element over from result to Num
        resultNum.classList.add("dropIt");
        firstNum.classList.remove("dropIt");
        secondNum.classList.remove("dropIt");

        firstNumber = multDiv;
        secondNumber = maxMul;
        firstNumRef.current.innerText = firstNumber.toString();
        secondNumRef.current.innerText = secondNumber.toString();
        result = multDiv * maxMul;
        starValues = generateStarValues(result);
        addValuesToStars(starValues);
        //starValues = generateStarValues([...validAnswers]);
      }
      //addValuesToStars(starValues);
      break;
    case "÷":
      let b = Math.floor(Math.random() * 2 + 1); //choose number 1 or 2 randomly
      if (b === 1) {
        //removing the permission of dragging an element over from result to Num
        resultNum.classList.remove("dropIt");
        firstNum.classList.remove("dropIt");
        secondNum.classList.add("dropIt");
        //to generate an equation in the form 20 / _ = 5
        let temp = multDiv * maxMul;
        firstNumRef.current.innerHTML = temp.toString();
        resultNumRef.current.innerText = multDiv.toString();
        starValues = generateStarValues(maxMul);
        addValuesToStars(starValues);
      } else {
        //regaining the permission of dragging an element over from result to Num
        resultNum.classList.add("dropIt");
        firstNum.classList.remove("dropIt");
        secondNum.classList.remove("dropIt");
        // to generate an equation in the form 18 / 3 = _
        result = multDiv * maxMul;
        firstNumber = result;
        secondNumber = multDiv;
        firstNumRef.current.innerText = firstNumber.toString();
        secondNumRef.current.innerText = secondNumber.toString();
        starValues = generateStarValues(maxMul);
        addValuesToStars(starValues);
      }
      break;
  }
}

//change the numbers on the small stars, dependent on the valid answers
//and generate some false star numbers

//change the numbers on the small stars, dependent on the valid answers
//and generate some false star numbers

function generateStarValues(answer) {
  let allValues = new Set();

  let numberOfStars = starRefs.current.length;

  //generating fake answers
  while (allValues.size < numberOfStars - 1) {
    //to generate a 50% chance a number is above max
    let randomCondition = Math.random();
    let fakeAnswer;

    if (randomCondition < 0.33) {
      // generate a number less than min
      fakeAnswer = Math.floor(Math.random() * 50) + answer - 50;

      //ensuring fakeAnswer is not less than 0
      if (fakeAnswer < 0) {
        fakeAnswer = Math.floor(Math.random() * (answer - 1));
      }
    } else if (randomCondition < 0.66) {
      // generate a number between min and max
      fakeAnswer = Math.floor(Math.random() * (answer - answer + 1)) + answer;
    } else {
      //generate a fake answer greater than max
      fakeAnswer = Math.floor(Math.random() * 50) + answer + 1;
    }

    if (fakeAnswer != answer && fakeAnswer > 0) {
      allValues.add(fakeAnswer);
    }
  }

  //adding actual answer to fakeanswers
  allValues.add(answer);

  //converting the set to an array
  const allAnswers = [...allValues];

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
  let secondNumber;
  if (secondNumRef.current) {
    secondNumber = parseInt(secondNumRef.current.innerHTML);
  }
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
      numeratorRef.current.innerHTML = numerator.toString();
      console.log("Changing to End Screen...g");
      changeToEndScreen();
      console.log("Changing to End Screen...a");
      return "end";
    } else {
      retry = 0;
      points += pointIncrease;
      //clear operand stars
      resultNumRef.current.innerHTML = "";
      secondNumRef.current.innerHTML = "";
      firstNumRef.current.innerHTML = "";
      pointRef.current.innerHTML = points.toString();
      numeratorRef.current.innerHTML = numerator.toString();
      generateEqYr3();
      return "correct";
    }
  } else if (retry < 2) {
    //retry
    retry++;
    return "retry";
  } else {
    //reveal answer and move on
    retry = 0;
    //clear operand stars
    resultNumRef.current.innerHTML = "";
    secondNumRef.current.innerHTML = "";
    firstNumRef.current.innerHTML = "";
    numerator++;
    numeratorRef.current.innerHTML = numerator.toString();
    generateEqYr3();
    return "wrong";
  }
}
