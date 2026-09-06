const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();

// GET /api/site —— 站点信息（键值对转为对象）
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM site').all();
  const site = {};
  for (const r of rows) site[r.key] = r.value;
  res.json(site);
});

// PUT /api/site —— 批量更新站点信息（需登录），body 为 { key: value, ... }
router.put('/', requireAuth, (req, res) => {
  const data = req.body || {};
  const upsert = db.prepare('INSERT OR REPLACE INTO site (key, value) VALUES (?, ?)');
  db.exec('BEGIN');
  try {
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === 'string') upsert.run(k, v);
    }
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  const rows = db.prepare('SELECT key, value FROM site').all();
  const site = {};
  for (const r of rows) site[r.key] = r.value;
  res.json(site);
});

module.exports = router;
