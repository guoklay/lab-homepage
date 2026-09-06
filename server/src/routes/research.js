const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();

// GET /api/research
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM research_directions ORDER BY sort_order, id').all();
  res.json(rows);
});

// POST /api/research —— 新增研究方向（需登录）
router.post('/', requireAuth, (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: '方向名称不能为空' });
  const info = db
    .prepare('INSERT INTO research_directions (name, name_en, description, icon, sort_order) VALUES (?, ?, ?, ?, ?)')
    .run(b.name, b.name_en ?? '', b.description ?? '', b.icon ?? '', b.sort_order ?? 0);
  res.status(201).json({ id: Number(info.lastInsertRowid) });
});

// PUT /api/research/:id —— 更新研究方向（需登录）
router.put('/:id', requireAuth, (req, res) => {
  const exist = db.prepare('SELECT id FROM research_directions WHERE id = ?').get(req.params.id);
  if (!exist) return res.status(404).json({ error: 'Not Found' });
  const b = req.body || {};
  db.prepare('UPDATE research_directions SET name=?, name_en=?, description=?, icon=?, sort_order=? WHERE id=?')
    .run(b.name ?? '', b.name_en ?? '', b.description ?? '', b.icon ?? '', b.sort_order ?? 0, req.params.id);
  res.json(db.prepare('SELECT * FROM research_directions WHERE id = ?').get(req.params.id));
});

// DELETE /api/research/:id —— 删除研究方向（需登录）
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM research_directions WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Not Found' });
  res.json({ ok: true });
});

module.exports = router;
