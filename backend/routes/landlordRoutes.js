import express from "express";
import {
  updateOnboarding,
  completeOnboarding,
} from "../controllers/landlordController.js";

const router = express.Router();

router.post("/onboarding/:userId", updateOnboarding);
router.patch("/users/:userId/complete-onboarding", completeOnboarding);

export default router;
