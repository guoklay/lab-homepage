/**
 * SQLite 数据库初始化与建表
 * 使用 Node 内置 node:sqlite（零原生依赖，无需编译，稳定跨平台）
 */
const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'lab.db');

// 确保数据目录存在
fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

/** 兼容已有数据库：若表缺少某列则补充 */
function ensureColumn(table, column, ddl) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!cols.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${ddl}`);
  }
}

/** 建表（幂等）+ 列迁移 */
function migrate() {
  db.exec(`
    -- 站点信息（键值对）：名称、简介、联系方式、备案号等
    CREATE TABLE IF NOT EXISTS site (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    );

    -- 后台管理员账号
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt          TEXT NOT NULL,
      role          TEXT DEFAULT 'admin',
      created_at    TEXT DEFAULT ''
    );

    -- 团队成员：type = faculty(教师) / phd(博士生) / master(硕士生) / undergrad(本科生) / visiting(访问学者) / alumni(校友)
    CREATE TABLE IF NOT EXISTS members (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      name              TEXT NOT NULL,
      name_en           TEXT DEFAULT '',
      title             TEXT DEFAULT '',
      type              TEXT DEFAULT 'faculty',
      research_direction TEXT DEFAULT '',
      email             TEXT DEFAULT '',
      avatar            TEXT DEFAULT '',
      bio               TEXT DEFAULT '',
      sort_order        INTEGER DEFAULT 0,
      active            INTEGER DEFAULT 1
    );

    -- 科研成果：type = journal(期刊) / conference(会议) / patent(专利)
    CREATE TABLE IF NOT EXISTS publications (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT NOT NULL,
      authors    TEXT DEFAULT '',
      venue      TEXT DEFAULT '',
      year       INTEGER DEFAULT 0,
      type       TEXT DEFAULT 'journal',
      abstract   TEXT DEFAULT '',
      doi        TEXT DEFAULT '',
      link       TEXT DEFAULT '',
      pages      TEXT DEFAULT '',
      keywords   TEXT DEFAULT '',
      member_id  INTEGER,
      sort_order INTEGER DEFAULT 0
    );

    -- 新闻动态
    CREATE TABLE IF NOT EXISTS news (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT NOT NULL,
      date       TEXT DEFAULT '',
      summary    TEXT DEFAULT '',
      content    TEXT DEFAULT '',
      category   TEXT DEFAULT 'general',
      pinned     INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0
    );

    -- 科研项目
    CREATE TABLE IF NOT EXISTS projects (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      description TEXT DEFAULT '',
      category    TEXT DEFAULT '',
      status      TEXT DEFAULT 'ongoing',
      start_year  INTEGER DEFAULT 0,
      end_year    INTEGER DEFAULT 0,
      funding     TEXT DEFAULT '',
      sort_order  INTEGER DEFAULT 0
    );

    -- 研究方向
    CREATE TABLE IF NOT EXISTS research_directions (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      name_en     TEXT DEFAULT '',
      description TEXT DEFAULT '',
      icon        TEXT DEFAULT '',
      sort_order  INTEGER DEFAULT 0
    );

    -- 项目-成员关联（多对多）
    CREATE TABLE IF NOT EXISTS project_members (
      project_id INTEGER NOT NULL,
      member_id  INTEGER NOT NULL,
      PRIMARY KEY (project_id, member_id)
    );
  `);

  // 兼容已有数据库：补充新增列
  ensureColumn('publications', 'member_id', 'member_id INTEGER');
  ensureColumn('publications', 'pages', "pages TEXT DEFAULT ''");
  ensureColumn('publications', 'keywords', "keywords TEXT DEFAULT ''");
  ensureColumn('projects', 'funding', "funding TEXT DEFAULT ''");
}

migrate();

module.exports = db;
