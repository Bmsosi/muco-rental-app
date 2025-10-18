import prisma from "../utils/prisma.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // save to /uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// Create a property
export const createProperty = async (req, res) => {
  const {
    title,
    description,
    type,
    price,
    location,
    landlordId,
    available,
    availableFrom,
  } = req.body;

  // Get uploaded image paths
  const imagePaths =
    req.files?.map((file) => `/uploads/${file.filename}`) || [];

  try {
    const property = await prisma.property.create({
      data: {
        title,
        description,
        type,
        price: parseFloat(price),
        location,
        landlordId: parseInt(landlordId),
        images: imagePaths, // store the image URLs
        available: available === "true",
        availableFrom: availableFrom ? new Date(availableFrom) : null,
      },
    });

    res.json(property);
  } catch (err) {
    console.error("Error creating property:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: { landlord: true },
    });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a single property by ID
