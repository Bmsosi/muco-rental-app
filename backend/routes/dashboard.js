import express from "express";
import {
  getLandlordDashboard,
  getTenantDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

// Route: /api/dashboard/landlord/:userId
router.get("/landlord/:userId", getLandlordDashboard);

// Route: /api/dashboard/tenant
router.get("/tenant", getTenantDashboard);

export default router;
