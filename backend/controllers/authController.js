import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register user
export const register = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, firstName, lastName, role },
    });

    res.json({ message: "User registered", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};


// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });//This will call the user and direct them to their dashboard
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
