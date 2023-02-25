import express from "express";
const router = express.Router();
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

router.route("/").post(createQuestion).get(getAllQuestions);
router.route("/:id").get(getQuestionById).patch(updateQuestion).delete(deleteQuestion);

export default router;
