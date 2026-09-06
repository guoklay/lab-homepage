/**
 * 认证工具：密码哈希（Node 内置 crypto.scrypt，零原生依赖）、JWT 签发与校验中间件
 */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'lab-admin-secret-change-me';
const TOKEN_EXPIRES = '7d';

function hashPassword(password, salt) {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), s, 64).toString('hex');
  return { salt: s, hash };
}

function verifyPassword(password, salt, hash) {
  const h = crypto.scryptSync(String(password), salt, 64).toString('hex');
  const a = Buffer.from(h, 'hex');
  const b = Buffer.from(hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function signToken(user) {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES,
  });
}

/** 鉴权中间件：校验 Authorization: Bearer <token> */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: '未登录' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: '登录已过期，请重新登录' });
  }
}

module.exports = { hashPassword, verifyPassword, signToken, requireAuth, JWT_SECRET };
