const express = require('express');
const db = require('../db');
const { verifyPassword, signToken, requireAuth } = require('../auth');

const router = express.Router();

// POST /api/auth/login —— { username, password }
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: '请输入用户名和密码' });

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !verifyPassword(password, user.salt, user.password_hash)) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }

  const token = signToken(user);
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

// GET /api/auth/me —— 校验并返回当前登录用户
router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, username, role FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(401).json({ error: '用户不存在' });
  res.json(user);
});

module.exports = router;
