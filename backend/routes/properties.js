import express from "express";
import {
  createProperty,
  getProperties,
} from "../controllers/propertyController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/", upload.array("images", 10), createProperty);
router.get("/", getProperties);

export default router;
