import express from "express";
const router = express.Router();
import {
  login,
  createAdmin,
  getAllAdmins,
  getAdminInfo,
  getReferredUsers,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/login", login);
router.post("/create", authMiddleware, createAdmin);
router.get("/all", authMiddleware, getAllAdmins);
router.get("/info", authMiddleware, getAdminInfo);
router.get("/referred-users", authMiddleware, getReferredUsers);

export default router;
