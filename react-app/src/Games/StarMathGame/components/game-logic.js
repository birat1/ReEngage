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
let thisIsTheEnd = 0;
let answer = 0;

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
      yearGroup = "Year3";
      console.log(yearGroup + " yearGroup");
      answer = generateEquation();
      break;
    case "Year 4":
      yearGroup = "Year4";
      answer = generateEquation();
      break;
    case "Year 5":
      yearGroup = "Year5";
      answer = generateEquation();
      break;
    case "Year 6":
      yearGroup = "Year6";
      answer = generateEquation();
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


//decides year group and difficulty chosen by user
const yearSettings = {
  Year3: {
    Easy: { multDivNum3: [2, 5, 10], range: [10, 300] },
    Medium: { multDivNum3: [2, 3, 4, 5, 10], range: [10, 600] },
    Hard: { multDivNum3: [2, 3, 4, 5, 8, 10], range: [10, 999] }
  },
  Year4: {
    Easy: { multDivNum3: [2, 3, 4, 5, 8, 10], range: [10, 3000] },
    Medium: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11], range: [10, 6000] },
    Hard: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], range: [10, 9999] }
  },
  Year5: {
    Easy: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100], range: [10, 30000] },
    Medium: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100], range: [10, 60000] },
    Hard: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100], range: [10, 99999] }
  },
  Year6: {
    Easy: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100], range: [10, 100000] },
    Medium: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100], range: [10, 250000] },
    Hard: { multDivNum3: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100], range: [10, 500000] }
  },
};

//GENERATING EQUATIONS
export function generateEquation() {
  let twoOrMoreDigit = 0;
  let answer;
  let twoOrMoreDigit2 = 0;
  let maxMul = Math.floor(Math.random() * 12 + 1);
  let multDivNum3 = [];
  let result = 0;
  let secondNumber = 0;
  let firstNumber = 0;
  let starValues = new Set();
  

  const settings = yearSettings[yearGroup][difficulty];
  multDivNum3 = settings.multDivNum3;
  const range = settings.range;

  twoOrMoreDigit = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  twoOrMoreDigit2 = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];

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
      firstNumber = twoOrMoreDigit;
      secondNumber = twoOrMoreDigit2;
      firstNumRef.current.innerText = firstNumber.toString();
      secondNumRef.current.innerText = secondNumber.toString();
      result = firstNumber + secondNumber;
      answer = result;
      starValues = generateStarValues(result);
      addValuesToStars(starValues);
      break;
    case "-":
      //regaining the permission of dragging an element over from result to Num
      resultNum.classList.add("dropIt");
      firstNum.classList.remove("dropIt");
      secondNum.classList.remove("dropIt");
      firstNumber = twoOrMoreDigit;
      firstNumRef.current.innerText = firstNumber.toString();
      secondNumber = Math.floor(Math.random() * (firstNumber / 2)) + 1; // ensure secondNumber is smaller
      secondNumRef.current.innerText = secondNumber.toString();
      result = firstNumber - secondNumber;
      answer = result;
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
        answer = multDiv;
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
        answer = result;
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
        answer = maxMul;
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
        answer = maxMul;
        firstNumRef.current.innerText = firstNumber.toString();
        secondNumRef.current.innerText = secondNumber.toString();
        starValues = generateStarValues(maxMul);
        addValuesToStars(starValues);
      }
      break;
  }

  return answer;
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
export function checkEquation(changeToEndScreen, toggleCorrect, toggleWrong, toggleRetry) {
  //return true or false
  if (thisIsTheEnd != 1) {
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
    //correct answer
    numerator++;
    retry = 0;
    points += pointIncrease;

    //end game - switch to different screen
    if (numerator > denominator) {
      thisIsTheEnd++;
      toggleCorrect();
      pointRef.current.innerHTML = points.toString();
      changeToEndScreen();
      return "end";
    }

    pointRef.current.innerHTML = points.toString();
    toggleCorrect();
    setTimeout(() => {
       //continue to next question & clear operand stars
    resultNumRef.current.innerHTML = "";
    secondNumRef.current.innerHTML = "";
    firstNumRef.current.innerHTML = "";
    answer = generateEquation();
    numeratorRef.current.innerHTML = numerator.toString();
    }, 2500);
    return "correct";
  }

  if (retry < 1) {
    //retry
    retry++;
    toggleRetry();
    return "retry";
  }

  //reveal answer and move on
  retry = 0;
  numerator++;

  //check if game should end again
  if (numerator > denominator) {
    toggleWrong(answer);
    changeToEndScreen();
    return "end";
  }

  toggleWrong(answer);

  setTimeout(() => {
    //clear operand stars
  resultNumRef.current.innerHTML = "";
  secondNumRef.current.innerHTML = "";
  firstNumRef.current.innerHTML = "";
  answer = generateEquation();
  numeratorRef.current.innerHTML = numerator.toString();
  }, 2500);
  return {response: "wrong", answer: answer};
  }
 
}