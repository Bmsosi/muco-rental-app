import prisma from "../utils/prisma.js";

// Send a message
export const sendMessage = async (req, res) => {
  const { content, senderId, propertyId } = req.body;
  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId: parseInt(senderId),
        propertyId: parseInt(propertyId),
      },
    });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get messages for a property
export const getMessages = async (req, res) => {
  const { propertyId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: { propertyId: parseInt(propertyId) },
      include: { sender: true },
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
