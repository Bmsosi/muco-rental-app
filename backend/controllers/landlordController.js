import prisma from "../utils/prisma.js";

export const updateOnboarding = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  try {
    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
        email: data.email,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        routingNumber: data.routingNumber,
        address: JSON.stringify(data.address), // if not separate fields
      },
    });

    res.json({ message: "Onboarding info saved" });
  } catch (err) {
    console.error("Error saving onboarding:", err);
    res.status(500).json({ error: "Failed to save onboarding data" });
  }
};

export const completeOnboarding = async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { onboarded: true },
    });
    res.json({ message: "Onboarding completed" });
  } catch (err) {
    console.error("Error completing onboarding:", err);
    res.status(500).json({ error: "Failed to complete onboarding" });
  }
};
