import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    // Token should come as "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    // Continue to the next middleware/route
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
