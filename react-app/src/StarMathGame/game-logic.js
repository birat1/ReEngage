let numQuestions = "";
const firstOperand = document.querySelector("#firstNumber");
const secondOperand = document.querySelector("#secondNumber");
const finalNumber = document.querySelector("#result");
const points = document.querySelector("#points");
const numerator = document.querySelector("#numerator");
const checkBtn = document.querySelector("#checkEq");
const operator = document.querySelector("#operator");

//use ref for the rest od the stuff above


export function yrGroupSorter(year, operatorRef) {
    switch(year) {
        case "Year 3":
              equationGeneratorYr3(operatorRef);
              console.log("year 3 chosen from up here");
            break;
        case "Year 4":
            break;
        case "Year 5":
            break;
        case "Year 6":
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

export function equationGeneratorYr3(operatorRef) {
  console.log(operatorRef);
  console.log(operatorRef.innerHTML);
  const multDivNum3 = [2, 3, 4, 5, 6, 8, 10, 50, 100];
  const operatorArray = ["+", "-", "÷", "×"];
  let threeDigit = Math.floor(Math.random() * 999 + 100);
  /*generate a random number (used for addition and subtraction*/
  let twoDigit = Math.floor(Math.random() * 99 + 10);
  let oneDigit = Math.floor(Math.random() * 9 + 1);
  console.log(threeDigit);

  let randOperatorIdx = Math.floor(Math.random() * operatorArray.length);
  let multDivNum3Idx = Math.floor(Math.random() * multDivNum3.length);
  let selectedOperator = operatorArray[randOperatorIdx];
  //i may prefer instead of using a loop that iterates over each operator array

  console.log("operatorRef.current:", operatorRef.current);

  //check if ref is valid change the operator randomly.
  if (operatorRef.current) {
    //main code
    console.log(randOperatorIdx);
    console.log(operatorArray[randOperatorIdx]);
    operatorRef.current.innerHTML = selectedOperator;
    console.log("this was ran eq gen yr 3");
  } else {
    console.error("operator element not found");
  }
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
function checkEquation() {
  //return true or false
}
