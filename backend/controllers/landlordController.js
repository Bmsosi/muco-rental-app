import prisma from "../utils/prisma.js";

export const saveLandlordOnboarding = async (req, res) => {
  const { userId } = req.params;
  const {
    bankName,
    accountName,
    accountNumber,
    routingNumber,
    internationalNumber,
    swiftBic,
    phoneNumber,
    email,
    address,
  } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user || user.role !== "LANDLORD") {
      return res.status(403).json({ error: "Unauthorized or invalid user." });
    }

    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        bankName,
        accountNumber,
        routingNumber,
        phone: phoneNumber,
        address,
        onboarded: true,
      },
    });

    res.json({ message: "Onboarding info saved successfully" });
  } catch (error) {
    console.error("Error saving onboarding:", error);
    res.status(500).json({ error: "Failed to save onboarding data." });
  }
};
