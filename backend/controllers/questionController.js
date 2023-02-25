import { StatusCodes } from "http-status-codes";
import { WrongRequestError, ErrorNotFound } from "../errors/index.js";
import Question from "../models/Question.js";

//create question
const createQuestion = async (req, res) => {
  const { question, answers, correctAnswer, difficulty, category } = req.body;

  if (!question || !answers || !correctAnswer || !difficulty || !category) {
    throw new WrongRequestError("Please provide all fields.");
  }

  const newQuestion = await Question.create(req.body);

  res.status(StatusCodes.CREATED).json({ newQuestion });
};

//get all questions
const getAllQuestions = async (req, res) => {
  const { category, difficulty, question, answers, correctAnswer } = req.query;

  const query = {};

  if (category) {
    query.category = category;
  }

  if (difficulty) {
    query.difficulty = difficulty;
  }

  if (question) {
    query.question = question;
  }

  if (answers) {
    query.answers = answers;
  }

  if (correctAnswer) {
    query.correctAnswer = correctAnswer;
  }

  const questions = await Question.find(query);
  //console.log(questions);

  res.status(StatusCodes.OK).json({ questions });
};

//question by id
const getQuestionById = async (req, res) => {
  const { id: questionId } = req.params;

  const question = await Question.findById(questionId);

  if (!question) {
    throw new ErrorNotFound(`Question not found with id: ${questionId}`);
  }

  res.status(StatusCodes.OK).json({ question });
};

const updateQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { question, answers, correctAnswer, difficulty, category } = req.body;

  if (!question || !answers || !correctAnswer || !difficulty || !category) {
    throw new WrongRequestError("Please provide all fields.");
  }

  const updatedQuestion = await Question.findOneAndUpdate({ _id: questionId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedQuestion) {
    throw new ErrorNotFound(`Question not found with id: ${questionId}`);
  }

  res.status(StatusCodes.OK).json({ updatedQuestion });
};

//delete question
const deleteQuestion = async (req, res) => {
  const { id: questionId } = req.params;

  const deletedQuestion = await Question.findByIdAndDelete(questionId);

  if (!deletedQuestion) {
    throw new ErrorNotFound(`Question not found with id: ${questionId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Question deleted successfully." });
};

export { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion };
