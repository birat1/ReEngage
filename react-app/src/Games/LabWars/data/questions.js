// TODO: Use Oak's OpenAPI for questions https://open-api.thenational.academy/playground

export const questions = [
  {
    question: "What is the closest planet to the Sun?",
    options: ["Venus", "Mercury", "Mars", "Earth"],
    correct: 1,
    type: "single",
    explanation: "Mercury is the closest planet to the Sun, orbiting at an average distance of 57.9 million kilometers!"
  },
  {
    question: "Select all the states of matter:",
    options: ["Solid", "Liquid", "Gas", "Rock"],
    correct: [0, 1, 2],
    type: "multiple",
    explanation: "Solid, liquid, and gas are the three main states of matter. Rock is a type of solid!"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2,
    type: "single",
    explanation: "Diamond is the hardest natural substance, scoring 10 on the Mohs scale of mineral hardness!"
  },
  {
    question: "Select all renewable energy sources:",
    options: ["Solar", "Coal", "Wind", "Hydroelectric"],
    correct: [0, 2, 3],
    type: "multiple",
    explanation: "Solar, wind, and hydroelectric power are renewable energy sources. Coal is a non-renewable fossil fuel!"
  },
  {
    question: "Which element has the chemical symbol 'Fe'?",
    options: ["Iron", "Fluorine", "Francium", "Fermium"],
    correct: 0,
    type: "single",
    explanation: "Fe is the chemical symbol for Iron, derived from the Latin word 'ferrum'!"
  },
  {
    question: "Select all parts of a plant cell:",
    options: ["Nucleus", "Engine", "Chloroplast", "Mitochondria"],
    correct: [0, 2, 3],
    type: "multiple",
    explanation: "Nucleus, chloroplast, and mitochondria are all parts of a plant cell. Engine is not a cellular component!"
  },
  {
    question: "Which of these is not a type of rock?",
    options: ["Igneous", "Sedimentary", "Metamorphic", "Photonic"],
    correct: 3,
    type: "single",
    explanation: "The three main types of rocks are Igneous, Sedimentary, and Metamorphic. Photonic is not a type of rock!"
  },
  {
    question: "Select all greenhouse gases:",
    options: ["Carbon Dioxide", "Methane", "Oxygen", "Water Vapor"],
    correct: [0, 1, 3],
    type: "multiple",
    explanation: "Carbon dioxide, methane, and water vapor are greenhouse gases. Oxygen is not a greenhouse gas!"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correct: 2,
    type: "single",
    explanation: "Mars is called the Red Planet because of the reddish iron oxide (rust) on its surface!"
  },
  {
    question: "Select all primary colors of light:",
    options: ["Red", "Green", "Yellow", "Blue"],
    correct: [0, 1, 3],
    type: "multiple",
    explanation: "Red, green, and blue are the primary colors of light. Yellow is a secondary color created by mixing red and green light!"
  }
]; 