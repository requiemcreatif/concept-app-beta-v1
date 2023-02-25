import express from "express";
const router = express.Router();

import { gptChat, generateChallenge } from "../controllers/gptController.js";

router.post("/gptchat", gptChat);
//router.post("/generateChallenge", auth, generateChallenge);

export default router;
