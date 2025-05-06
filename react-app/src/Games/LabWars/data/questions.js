// TODO: FIGURE OUT HOW TO GET ASSETS FOR SOME QUESTIONS FROM THE API
import axios from "axios";

const API_URL = "http://localhost:8000/api/oak/questions/{keyStage}/{subject}";

// Fetch questions from the National Academy API
export async function fetchQuestions(keyStage) {
  const subject = "science"; 

  try {
    const url = API_URL.replace("{keyStage}", keyStage).replace("{subject}", subject);
    
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    // Convert array of lessons to an array of questions
    const allQuestions = data.flatMap((lesson) => [
      ...(lesson.starterQuiz || []),
      ...(lesson.exitQuiz || []),
    ]);

    // Keywords to identify questions with assets
    const assetKeywords = [
      "graph",
      "figure",
      "image",
      "diagram",
      "table",
      "chart",
      "see below",
      "shown",
      "in this picture",
      "in the picture",
      "in this diagram",
      "refer to the",
      "these results"
    ];

    // Filter for singular/multiple-choice questions and exclude those with assets
    const multipleChoiceQuestions = allQuestions.filter(
      (question) => 
        question.questionType === "multiple-choice" && 
        !assetKeywords.some((keyword) =>
          question.question.toLowerCase().includes(keyword)
        )
    );

    // Shuffle the questions and select 10 random ones
    const shuffledQuestions = multipleChoiceQuestions.sort(() => Math.random() - 0.5);
    const randomQuestions = shuffledQuestions.slice(0, 10);

    return randomQuestions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}