import express from "express";
import { getSpeakers, registerSpeaker } from "../controllers/speakerController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Error handling middleware for file uploads
const handleUploadError = (err, req, res, next) => {
  if (err) {
    if (err.message.includes('Only PDF, DOCX, and LaTeX')) {
      return res.status(400).json({
        message: "Invalid file format",
        error: "Only PDF, DOCX, and LaTeX (.tex, .latex) files are allowed",
        success: false
      });
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: "File too large",
        error: "File size must be less than 10MB",
        success: false
      });
    }
    return res.status(400).json({
      message: "File upload error",
      error: err.message,
      success: false
    });
  }
  next();
};

router.post("/register", upload.single('fileInput'), handleUploadError, registerSpeaker);
router.get("/speakers", getSpeakers);

export default router;