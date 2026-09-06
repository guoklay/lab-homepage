/**
 * 后端服务入口
 * 启动 Express，挂载各 REST 路由
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

require('./db'); // 建表
const { seedIfEmpty, ensureAdmin } = require('./seed');
seedIfEmpty(); // 首次启动写入占位数据
ensureAdmin(); // 确保存在管理员账号

const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const siteRouter = require('./routes/site');
const membersRouter = require('./routes/members');
const publicationsRouter = require('./routes/publications');
const newsRouter = require('./routes/news');
const projectsRouter = require('./routes/projects');
const researchRouter = require('./routes/research');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 上传文件静态托管
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 业务路由
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/site', siteRouter);
app.use('/api/members', membersRouter);
app.use('/api/publications', publicationsRouter);
app.use('/api/news', newsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/research', researchRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 统一错误处理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`✅ 后端服务已启动: http://localhost:${PORT}`);
});
