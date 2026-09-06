const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();

/** 同步项目的参与成员（多对多） */
function syncMembers(projectId, memberIds) {
  db.prepare('DELETE FROM project_members WHERE project_id = ?').run(projectId);
  if (Array.isArray(memberIds)) {
    const ins = db.prepare('INSERT OR IGNORE INTO project_members (project_id, member_id) VALUES (?, ?)');
    for (const mid of memberIds) {
      if (mid) ins.run(projectId, mid);
    }
  }
}

// GET /api/projects?status=ongoing|completed
router.get('/', (req, res) => {
  const { status } = req.query;
  const rows = status
    ? db.prepare('SELECT * FROM projects WHERE status = ? ORDER BY sort_order, start_year DESC, id').all(status)
    : db.prepare('SELECT * FROM projects ORDER BY sort_order, start_year DESC, id').all();
  const ids = db.prepare('SELECT member_id FROM project_members WHERE project_id = ?');
  res.json(rows.map((r) => ({ ...r, member_ids: ids.all(r.id).map((x) => x.member_id) })));
});

// GET /api/projects/:id —— 含参与成员列表
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not Found' });
  const members = db
    .prepare(
      'SELECT m.* FROM members m JOIN project_members pm ON pm.member_id = m.id WHERE pm.project_id = ? ORDER BY m.sort_order, m.id'
    )
    .all(req.params.id);
  res.json({ ...row, members });
});

// POST /api/projects —— 新增项目（需登录）
router.post('/', requireAuth, (req, res) => {
  const b = req.body || {};
  if (!b.name) return res.status(400).json({ error: '项目名称不能为空' });
  const info = db
    .prepare(
      'INSERT INTO projects (name, description, category, status, start_year, end_year, funding, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run(b.name, b.description ?? '', b.category ?? '', b.status ?? 'ongoing', b.start_year ?? 0, b.end_year ?? 0, b.funding ?? '', b.sort_order ?? 0);
  const id = Number(info.lastInsertRowid);
  syncMembers(id, b.member_ids);
  res.status(201).json({ id });
});

// PUT /api/projects/:id —— 更新项目（需登录）
router.put('/:id', requireAuth, (req, res) => {
  const exist = db.prepare('SELECT id FROM projects WHERE id = ?').get(req.params.id);
  if (!exist) return res.status(404).json({ error: 'Not Found' });
  const b = req.body || {};
  db.prepare(
    'UPDATE projects SET name=?, description=?, category=?, status=?, start_year=?, end_year=?, funding=?, sort_order=? WHERE id=?'
  ).run(
    b.name ?? '', b.description ?? '', b.category ?? '', b.status ?? 'ongoing', b.start_year ?? 0,
    b.end_year ?? 0, b.funding ?? '', b.sort_order ?? 0, req.params.id
  );
  syncMembers(req.params.id, b.member_ids);
  res.json(db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id));
});

// DELETE /api/projects/:id —— 删除项目（需登录）
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Not Found' });
  db.prepare('DELETE FROM project_members WHERE project_id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
