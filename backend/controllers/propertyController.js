import prisma from "../utils/prisma.js";

// Create a property
export const createProperty = async (req, res) => {
  const { title, description, type, price, location, landlordId } = req.body;
  try {
    const property = await prisma.property.create({
      data: {
        title,
        description,
        type,
        price: parseFloat(price),
        location,
        landlordId: parseInt(landlordId),
      },
    });
    res.json(property);
  } catch (err) {
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
