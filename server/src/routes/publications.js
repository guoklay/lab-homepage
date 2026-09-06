const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();

// GET /api/publications?year=&type=&q=&member_id=
router.get('/', (req, res) => {
  const { year, type, q, member_id } = req.query;
  const conditions = [];
  const params = [];

  if (year) {
    conditions.push('year = ?');
    params.push(year);
  }
  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }
  if (member_id) {
    conditions.push('member_id = ?');
    params.push(member_id);
  }
  if (q) {
    conditions.push('(title LIKE ? OR authors LIKE ? OR venue LIKE ?)');
    const like = `%${q}%`;
    params.push(like, like, like);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const rows = db
    .prepare(`SELECT * FROM publications ${where} ORDER BY year DESC, sort_order, id`)
    .all(...params);
  res.json(rows);
});

// GET /api/publications/:id
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM publications WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not Found' });
  res.json(row);
});

// POST /api/publications —— 新增成果（需登录）
router.post('/', requireAuth, (req, res) => {
  const b = req.body || {};
  if (!b.title) return res.status(400).json({ error: '标题不能为空' });
  const info = db
    .prepare(
      'INSERT INTO publications (title, authors, venue, year, type, abstract, doi, link, pages, keywords, member_id, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run(
      b.title, b.authors ?? '', b.venue ?? '', b.year ?? 0, b.type ?? 'journal', b.abstract ?? '',
      b.doi ?? '', b.link ?? '', b.pages ?? '', b.keywords ?? '', b.member_id ? b.member_id : null, b.sort_order ?? 0
    );
  res.status(201).json({ id: Number(info.lastInsertRowid) });
});

// PUT /api/publications/:id —— 更新成果（需登录）
router.put('/:id', requireAuth, (req, res) => {
  const exist = db.prepare('SELECT id FROM publications WHERE id = ?').get(req.params.id);
  if (!exist) return res.status(404).json({ error: 'Not Found' });
  const b = req.body || {};
  db.prepare(
    'UPDATE publications SET title=?, authors=?, venue=?, year=?, type=?, abstract=?, doi=?, link=?, pages=?, keywords=?, member_id=?, sort_order=? WHERE id=?'
  ).run(
    b.title ?? '', b.authors ?? '', b.venue ?? '', b.year ?? 0, b.type ?? 'journal', b.abstract ?? '',
    b.doi ?? '', b.link ?? '', b.pages ?? '', b.keywords ?? '', b.member_id ? b.member_id : null, b.sort_order ?? 0, req.params.id
  );
  res.json(db.prepare('SELECT * FROM publications WHERE id = ?').get(req.params.id));
});

// DELETE /api/publications/:id —— 删除成果（需登录）
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM publications WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Not Found' });
  res.json({ ok: true });
});

module.exports = router;
