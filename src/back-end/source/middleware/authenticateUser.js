import jwt from "jsonwebtoken";
import { settings } from "../config/settings.js";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const formattedToken = token.replace("Bearer ", "");
    const decodedToken = jwt.verify(formattedToken, settings.jwtSecret);
    const userId = decodedToken.userId;

    req.user = userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
