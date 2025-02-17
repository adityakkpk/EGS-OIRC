import express from "express";
import { getSpeakers, registerSpeaker } from "../controllers/speakerController.js";

const router = express.Router();

router.post("/register", registerSpeaker);
router.get("/speakers", getSpeakers);

export default router;