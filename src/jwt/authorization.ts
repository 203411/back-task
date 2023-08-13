import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";

dotenv.config(); 

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as { _id: string; name: string, email: string };
    req.user = decodedToken; 
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Unauthorized' });
  }
};