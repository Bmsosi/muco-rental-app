import express from "express";
import {
  createProperty,
  getProperties,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", createProperty);
router.get("/", getProperties);

export default router;
