import { StatusCodes } from "http-status-codes";
import { WrongRequestError } from "../errors/index.js";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-bE3vnxyaksA6Km344Pgi1pS7",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateChallenge() {
  const prompt =
    "Generate a programming challenge that asks the user to write a function that returns the sum of two numbers.";

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: ["You:"],
    });

    const choice = response.choices[0];
    if (!choice) {
      throw new Error("Failed to generate a response");
    }
    const challenge = choice.text.trim();

    console.log("Generated challenge:", challenge);
    return challenge;
  } catch (error) {
    console.error("Error generating challenge:", error);
    throw new Error("Failed to generate a response");
  }
}

function checkAnswer(challenge, answer) {
  const code = `function add(a, b) { return a + b; }`;
  const result = eval(code + answer);
  return result === 3;
}

export { generateChallenge, checkAnswer };
