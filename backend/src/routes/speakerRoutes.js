import express from "express";
import { getSpeakers, registerSpeaker } from "../controllers/speakerController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/register", upload.single('fileInput'), registerSpeaker);
router.get("/speakers", getSpeakers);

export default router;