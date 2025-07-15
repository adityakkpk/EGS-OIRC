import express from "express";
const router = express.Router();
import {
  login,
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  getAdminInfo,
  getReferredUsers,
  // Registration management
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  // Speaker management
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
  // Sponsor management
  getAllSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
  // Dashboard stats
  getDashboardStats
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

// Admin authentication routes
router.post("/login", login);
router.post("/create", authMiddleware, createAdmin);
router.get("/all", authMiddleware, getAllAdmins);
router.delete("/admins/:id", authMiddleware, deleteAdmin);
router.get("/info", authMiddleware, getAdminInfo);
router.get("/referred-users", authMiddleware, getReferredUsers);

// Dashboard
router.get("/dashboard-stats", authMiddleware, getDashboardStats);

// Registration management routes
router.get("/registrations", authMiddleware, getAllRegistrations);
router.get("/registrations/:id", authMiddleware, getRegistrationById);
router.put("/registrations/:id", authMiddleware, updateRegistration);
router.delete("/registrations/:id", authMiddleware, deleteRegistration);

// Speaker management routes
router.get("/speakers", authMiddleware, getAllSpeakers);
router.get("/speakers/:id", authMiddleware, getSpeakerById);
router.put("/speakers/:id", authMiddleware, upload.single('fileInput'), updateSpeaker);
router.delete("/speakers/:id", authMiddleware, deleteSpeaker);

// Sponsor management routes
router.get("/sponsors", authMiddleware, getAllSponsors);
router.get("/sponsors/:id", authMiddleware, getSponsorById);
router.put("/sponsors/:id", authMiddleware, updateSponsor);
router.delete("/sponsors/:id", authMiddleware, deleteSponsor);

export default router;
