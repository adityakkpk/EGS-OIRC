import express from "express";
const router = express.Router();
import {
  login,
  createAdmin,
  getUsers,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/login", login);
router.post("/create", authMiddleware, createAdmin);
router.get("/users", authMiddleware, getUsers);

export default router;
