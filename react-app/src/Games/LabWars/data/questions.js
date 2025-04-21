// TODO: FIGURE OUT HOW TO GET ASSETS FOR SOME QUESTIONS FROM THE API

const API_URL = "https://open-api.thenational.academy/api/v0/key-stages/{keyStage}/subject/{subject}/questions?offset=0&limit=10"
const API_KEY = "f38bf624-bdb7-46a7-8bce-b938e5563d0e"

// Fetch questions from the National Academy API
export async function fetchQuestions() {
  const keyStage = "ks1"; // Key stage 1
  const subject = "science"; // Science

  try {
    const url = API_URL.replace("{keyStage}", keyStage).replace("{subject}", subject);
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }

    const data = await response.json();

    // Convert array of lessons to an array of questions
    const allQuestions = data.flatMap((lesson) => [
      ...(lesson.starterQuiz || []),
      ...(lesson.exitQuiz || []),
    ]);

    // Filter for singular/multiple-choice questions
    const multipleChoiceQuestions = allQuestions.filter(
      (question) => question.questionType === "multiple-choice"
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