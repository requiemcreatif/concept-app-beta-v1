import express from "express";
const router = express.Router();

import {
  createCode,
  getAllCodes,
  updateCode,
  deleteCode,
  getAllCodesFromAllUsers,
} from "../controllers/codeController.js";

router.route("/").post(createCode).get(getAllCodes);
router.route("/all").get(getAllCodesFromAllUsers);
router.route("/:id").patch(updateCode).delete(deleteCode);

export default router;
