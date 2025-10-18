import prisma from "../utils/prisma.js";

// Landlord dashboard: view own properties
export const getLandlordDashboard = async (req, res) => {
  const { userId } = req.params;
  try {
    const properties = await prisma.property.findMany({
      where: { landlordId: parseInt(userId) },
      include: { messages: true },
    });
    res.json({ properties });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tenant dashboard: view available properties
export const getTenantDashboard = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: { available: true },
      include: { landlord: true },
    });
    res.json({ properties });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
