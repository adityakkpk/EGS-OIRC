import express from "express";
import { 
  registerKeynoteSpeaker, 
  getKeynoteSpeakers, 
  getKeynoteSpeakerById, 
  updateKeynoteSpeakerStatus 
} from "../controllers/keynoteSpeakerController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Keynote speaker registration with file uploads
router.post("/register", upload.fields([
  { name: 'cvFile', maxCount: 1 },
  { name: 'photoFile', maxCount: 1 },
  { name: 'presentationFile', maxCount: 1 }
]), registerKeynoteSpeaker);

// Get all keynote speakers (for admin)
router.get("/", getKeynoteSpeakers);

// Get specific keynote speaker by ID
router.get("/:id", getKeynoteSpeakerById);

// Update keynote speaker status (for admin)
router.patch("/:id/status", updateKeynoteSpeakerStatus);

export default router; 