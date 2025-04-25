import { fetchQuestions } from "./questions.js";

(async () => {
    const questions = await fetchQuestions();
    console.log("Random Multiple-Choice Questions:", JSON.stringify(questions, null, 2));
})();