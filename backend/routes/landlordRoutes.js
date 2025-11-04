import { Router } from "express";
import { saveLandlordOnboarding } from "../controllers/landlordController.js";
import { authenticate } from "../middleware/AuthMiddleware.js";

const router = Router();

// POST /api/landlord/onboarding/:userId
router.post("/onboarding/:userId", authenticate, saveLandlordOnboarding);

export default router;
