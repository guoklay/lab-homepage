const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();

// GET /api/members?type=faculty|phd|master|undergrad|visiting|alumni&all=1（all=1 时含已隐藏成员，供后台使用）
router.get('/', (req, res) => {
  const { type, all } = req.query;
  let sql = 'SELECT * FROM members';
  const conds = [];
  const params = [];
  if (!all) conds.push('active = 1');
  if (type) {
    conds.push('type = ?');
    params.push(type);
  }
  if (conds.length) sql += ' WHERE ' + conds.join(' AND ');
  sql += ' ORDER BY sort_order, id';
  res.json(db.prepare(sql).all(...params));
});

// GET /api/members/:id
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not Found' });
  res.json(row);
});

// POST /api/members —— 新增成员（需登录）
router.post('/', requireAuth, (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: '姓名不能为空' });
  const info = db
    .prepare(
      'INSERT INTO members (name, name_en, title, type, research_direction, email, avatar, bio, sort_order, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run(b.name, b.name_en ?? '', b.title ?? '', b.type ?? 'faculty', b.research_direction ?? '', b.email ?? '', b.avatar ?? '', b.bio ?? '', b.sort_order ?? 0, b.active ?? 1 ? 1 : 0);
  res.status(201).json({ id: Number(info.lastInsertRowid) });
});

// PUT /api/members/:id —— 更新成员（需登录）
router.put('/:id', requireAuth, (req, res) => {
  const exist = db.prepare('SELECT id FROM members WHERE id = ?').get(req.params.id);
  if (!exist) return res.status(404).json({ error: 'Not Found' });
  const b = req.body || {};
  db.prepare(
    'UPDATE members SET name=?, name_en=?, title=?, type=?, research_direction=?, email=?, avatar=?, bio=?, sort_order=?, active=? WHERE id=?'
  ).run(
    b.name ?? '', b.name_en ?? '', b.title ?? '', b.type ?? 'faculty', b.research_direction ?? '', b.email ?? '',
    b.avatar ?? '', b.bio ?? '', b.sort_order ?? 0, b.active ?? 1 ? 1 : 0, req.params.id
  );
  res.json(db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id));
});

// DELETE /api/members/:id —— 删除成员（需登录）
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Not Found' });
  res.json({ ok: true });
});

module.exports = router;
