import { Router } from "express";
import { getUserById } from "../controllers/userController.js";

const router = Router();

// GET /api/users/:userId
router.get("/:userId", getUserById);

export default router;
