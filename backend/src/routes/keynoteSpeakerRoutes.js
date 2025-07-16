import express from "express";
import { 
  registerKeynoteSpeaker, 
  getKeynoteSpeakers, 
  getKeynoteSpeakerById, 
  updateKeynoteSpeakerStatus,
  getAllKeynoteSpeakersForAdmin,
  updateKeynoteSpeakerByAdmin,
  deleteKeynoteSpeaker,
  getKeynoteSpeakerStatsForAdmin
} from "../controllers/keynoteSpeakerController.js";
import { upload } from "../config/cloudinary.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
// Keynote speaker registration with file uploads
router.post("/register", upload.fields([
  { name: 'cvFile', maxCount: 1 },
  { name: 'photoFile', maxCount: 1 },
  { name: 'presentationFile', maxCount: 1 }
]), registerKeynoteSpeaker);

// Get all keynote speakers (public, limited info)
router.get("/", getKeynoteSpeakers);

// Get specific keynote speaker by ID (public, limited info)
router.get("/:id", getKeynoteSpeakerById);

// Admin-only routes (protected)
// Get all keynote speakers with full details for admin
router.get("/admin/all", authenticateToken, getAllKeynoteSpeakersForAdmin);

// Get keynote speaker statistics for admin dashboard
router.get("/admin/stats", authenticateToken, getKeynoteSpeakerStatsForAdmin);

// Update keynote speaker by admin
router.put("/admin/:id", authenticateToken, updateKeynoteSpeakerByAdmin);

// Update keynote speaker status (for admin)
router.patch("/admin/:id/status", authenticateToken, updateKeynoteSpeakerStatus);

// Delete keynote speaker (admin only)
router.delete("/admin/:id", authenticateToken, deleteKeynoteSpeaker);

export default router; 