const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();

// GET /api/news?page=&pageSize=&category=
router.get('/', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const pageSize = Math.max(1, parseInt(req.query.pageSize, 10) || 10);
  const { category } = req.query;

  const where = category ? 'WHERE category = ?' : '';
  const params = category ? [category] : [];

  const total = db.prepare(`SELECT COUNT(*) AS c FROM news ${where}`).get(...params).c;
  const rows = db
    .prepare(`SELECT * FROM news ${where} ORDER BY pinned DESC, date DESC, sort_order, id LIMIT ? OFFSET ?`)
    .all(...params, pageSize, (page - 1) * pageSize);

  res.json({ total, page, pageSize, list: rows });
});

// GET /api/news/:id
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not Found' });
  res.json(row);
});

// POST /api/news —— 新增新闻（需登录）
router.post('/', requireAuth, (req, res) => {
  const b = req.body || {};
  if (!b.title) return res.status(400).json({ error: '标题不能为空' });
  const info = db
    .prepare(
      'INSERT INTO news (title, date, summary, content, category, pinned, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .run(b.title, b.date ?? '', b.summary ?? '', b.content ?? '', b.category ?? 'general', b.pinned ?? 0 ? 1 : 0, b.sort_order ?? 0);
  res.status(201).json({ id: Number(info.lastInsertRowid) });
});

// PUT /api/news/:id —— 更新新闻（需登录）
router.put('/:id', requireAuth, (req, res) => {
  const exist = db.prepare('SELECT id FROM news WHERE id = ?').get(req.params.id);
  if (!exist) return res.status(404).json({ error: 'Not Found' });
  const b = req.body || {};
  db.prepare(
    'UPDATE news SET title=?, date=?, summary=?, content=?, category=?, pinned=?, sort_order=? WHERE id=?'
  ).run(
    b.title ?? '', b.date ?? '', b.summary ?? '', b.content ?? '', b.category ?? 'general',
    b.pinned ?? 0 ? 1 : 0, b.sort_order ?? 0, req.params.id
  );
  res.json(db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id));
});

// DELETE /api/news/:id —— 删除新闻（需登录）
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Not Found' });
  res.json({ ok: true });
});

module.exports = router;
