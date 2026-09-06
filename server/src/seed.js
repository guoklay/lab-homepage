/**
 * 占位种子数据（内容留白）
 * 所有文字均为「示例」，后续可在此替换或通过后台管理维护。
 */
const db = require('./db');

const SITE = [
  ['site_name', '数据智能与知识计算实验室'],
  ['site_name_en', 'Data Intelligence & Knowledge Computing Lab'],
  ['university', '山西大学'],
  ['slogan', '数据驱动 · 智能创新 · 服务社会'],
  ['about', '本实验室依托XX大学计算机学科，围绕人工智能与大数据开展基础研究与产业应用。\n\n主要研究方向包括数据挖掘与机器学习、计算机视觉、自然语言处理、大数据与知识图谱等。\n\n（此处为简介占位内容，请根据实际情况修改。）'],
  ['address', '山西省太原市小店区坞城路92号 山西大学'],
  ['email', 'lab@example.edu.cn'],
  ['phone', '0351-0000 0000'],
  ['icp', '晋ICP备XXXXXXXX号'],
];

const MEMBERS = [
  { name: '张三（示例）', name_en: 'San Zhang', title: '教授 · 博士生导师', type: 'faculty', research_direction: '数据挖掘与机器学习', email: 'zhangsan@example.edu.cn', bio: '（个人简介占位）' },
  { name: '李四（示例）', name_en: 'Si Li', title: '副教授', type: 'faculty', research_direction: '计算机视觉与模式识别', email: 'lisi@example.edu.cn', bio: '（个人简介占位）' },
  { name: '王五（示例）', name_en: 'Wu Wang', title: '讲师', type: 'faculty', research_direction: '自然语言处理', email: 'wangwu@example.edu.cn', bio: '（个人简介占位）' },
  { name: '赵六（示例）', name_en: 'Liu Zhao', title: '博士研究生', type: 'phd', research_direction: '大数据与知识图谱', email: '', bio: '（个人简介占位）' },
  { name: '孙七（示例）', name_en: 'Qi Sun', title: '硕士研究生', type: 'master', research_direction: '数据挖掘', email: '', bio: '（个人简介占位）' },
];

const RESEARCH = [
  { name: '数据挖掘与机器学习', name_en: 'Data Mining & Machine Learning', description: '（研究方向简介占位）面向海量数据的模式发现与智能建模方法研究。' },
  { name: '计算机视觉与模式识别', name_en: 'Computer Vision & Pattern Recognition', description: '（研究方向简介占位）图像理解、三维重建与视觉智能。' },
  { name: '自然语言处理', name_en: 'Natural Language Processing', description: '（研究方向简介占位）语言模型、信息抽取与文本理解。' },
  { name: '大数据与知识图谱', name_en: 'Big Data & Knowledge Graph', description: '（研究方向简介占位）知识表示、图计算与数据集成。' },
];

const PUBLICATIONS = [
  { title: '【示例】基于深度学习的时序数据分析方法研究', authors: '张三, 李四, 王五', venue: '计算机学报', year: 2024, type: 'journal', abstract: '（摘要占位）', member_id: 1 },
  { title: '【示例】面向大规模图数据的社区发现算法', authors: '张三, 赵六', venue: 'AAAI Conference', year: 2023, type: 'conference', abstract: '（摘要占位）', member_id: 1 },
  { title: '【示例】一种知识图谱构建方法及系统', authors: '李四', venue: '发明专利', year: 2023, type: 'patent', abstract: '（摘要占位）', member_id: 2 },
];

const NEWS = [
  { title: '【示例】实验室召开2024年度学术年会', date: '2024-12-01', summary: '（新闻摘要占位）实验室年度学术年会顺利召开。', content: '（新闻正文占位）', category: 'general', pinned: 1 },
  { title: '【示例】实验室研究成果发表于《计算机学报》', date: '2024-10-15', summary: '（新闻摘要占位）', content: '（新闻正文占位）', category: 'achievement' },
  { title: '【示例】欢迎新同学加入实验室', date: '2024-09-01', summary: '（新闻摘要占位）', content: '（新闻正文占位）', category: 'general' },
];

const PROJECTS = [
  { name: '【示例】国家自然科学基金面上项目', description: '（项目简介占位）', category: '国家级', status: 'ongoing', start_year: 2024, end_year: 2027, funding: '80万元' },
  { name: '【示例】省部级科技攻关项目', description: '（项目简介占位）', category: '省部级', status: 'ongoing', start_year: 2023, end_year: 2026, funding: '50万元' },
  { name: '【示例】企业横向合作项目', description: '（项目简介占位）', category: '横向', status: 'completed', start_year: 2022, end_year: 2024, funding: '30万元' },
];

// 项目-成员关联（占位，成员 ID 按插入顺序 1..5）
const PROJECT_MEMBERS = [
  { project: 1, members: [1, 2, 3] },
  { project: 2, members: [1, 4] },
  { project: 3, members: [2, 5] },
];

/** 若数据库为空则写入占位数据，返回是否执行了初始化 */
function seedIfEmpty() {
  const { c } = db.prepare('SELECT COUNT(*) AS c FROM members').get();
  if (c > 0) return false;

  const insertSite = db.prepare('INSERT OR REPLACE INTO site (key, value) VALUES (?, ?)');
  const insertMember = db.prepare(
    'INSERT INTO members (name, name_en, title, type, research_direction, email, bio) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const insertResearch = db.prepare(
    'INSERT INTO research_directions (name, name_en, description) VALUES (?, ?, ?)'
  );
  const insertPub = db.prepare(
    'INSERT INTO publications (title, authors, venue, year, type, abstract, member_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const insertNews = db.prepare(
    'INSERT INTO news (title, date, summary, content, category, pinned) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const insertProject = db.prepare(
    'INSERT INTO projects (name, description, category, status, start_year, end_year, funding) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const insertProjectMember = db.prepare('INSERT INTO project_members (project_id, member_id) VALUES (?, ?)');

  db.exec('BEGIN');
  try {
    SITE.forEach(([k, v]) => insertSite.run(k, v));
    MEMBERS.forEach((m) => insertMember.run(m.name, m.name_en, m.title, m.type, m.research_direction, m.email, m.bio));
    RESEARCH.forEach((r) => insertResearch.run(r.name, r.name_en, r.description));
    PUBLICATIONS.forEach((p) => insertPub.run(p.title, p.authors, p.venue, p.year, p.type, p.abstract, p.member_id ?? null));
    NEWS.forEach((n) => insertNews.run(n.title, n.date, n.summary, n.content, n.category, n.pinned ?? 0));
    PROJECTS.forEach((p) => insertProject.run(p.name, p.description, p.category, p.status, p.start_year, p.end_year, p.funding ?? ''));
    PROJECT_MEMBERS.forEach((pm) => pm.members.forEach((mid) => insertProjectMember.run(pm.project, mid)));
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return true;
}

/** 若尚无管理员账号，则创建默认管理员 admin / admin123（请尽快修改） */
function ensureAdmin() {
  const { c } = db.prepare('SELECT COUNT(*) AS c FROM users').get();
  if (c > 0) return false;
  const { hashPassword } = require('./auth');
  const { salt, hash } = hashPassword('admin123');
  db.prepare('INSERT INTO users (username, password_hash, salt, role, created_at) VALUES (?, ?, ?, ?, ?)')
    .run('admin', hash, salt, 'admin', new Date().toISOString());
  return true;
}

if (require.main === module) {
  const seeded = seedIfEmpty();
  const admin = ensureAdmin();
  console.log(seeded ? '✅ 已写入占位种子数据' : '⚠️  数据库已有数据，跳过内容初始化');
  console.log(admin ? '✅ 已创建默认管理员 admin / admin123（请尽快修改）' : 'ℹ️  已存在管理员账号');
}

module.exports = { seedIfEmpty, ensureAdmin };
