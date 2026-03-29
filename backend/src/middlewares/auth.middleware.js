import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export async function verifyJWT(req, res, next) {
  // Read token from httpOnly cookie OR Authorization header (Bearer token)
  let token = req?.cookies?.token;

  if (!token) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}