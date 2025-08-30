import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export function signToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export async function requireAuth(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.sub);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role === 'admin') return next();
  return res.status(403).json({ error: 'Forbidden' });
}
