# 实验室主页（Lab Homepage）

面向高校实验室 / 课题组的**前后端分离**主页框架，参考高校研究院官网风格（如山西大学大数据科学与产业研究院），整体为**暗色科技风**，兼顾稳定、专业严肃与亲和。

- **前端**：Vue 3 + Vite + Element Plus + Vue Router + Axios
- **后端**：Node.js + Express + SQLite（Node 内置 `node:sqlite`，零原生依赖、无需编译）
- **视觉**：暗色科技主题 + `@tsparticles` 粒子/连线背景 + 页面切换缓进缓出过渡
- **后台**：JWT 登录鉴权 + 成员/成果/新闻/项目/方向/站点信息的完整增删改查

## 目录结构

```
science_web/
├── server/                 # 后端（Express + SQLite）
│   └── src/
│       ├── index.js        # 服务入口，挂载路由
│       ├── db.js           # SQLite 建表
│       ├── seed.js         # 占位种子数据 + 默认管理员
│       ├── auth.js         # 密码哈希 + JWT 鉴权中间件
│       └── routes/         # 各资源 REST 路由（含 CRUD）
├── client/                 # 前端（Vue3 + Vite）
│   └── src/
│       ├── views/          # 公开页面
│       ├── admin/          # 后台管理（登录/布局/仪表盘/CRUD）
│       ├── components/     # 头部 / 页脚 / 标题 / 粒子背景
│       ├── router/         # 路由 + 登录守卫
│       ├── api/            # axios 封装与接口
│       └── assets/styles/  # 暗色主题变量与全局样式
└── package.json            # 根：一键启动脚本
```

## 环境要求

- Node.js ≥ 18（推荐 20/22/24）
- npm（无需 MySQL，SQLite 零配置）

## 快速开始

```bash
# 1. 安装全部依赖（根 + 后端 + 前端）
npm run install:all

# 2. 一键同时启动前后端
npm run dev
```

启动后访问：

- 前端页面：http://localhost:5173
- 后端接口：http://localhost:3001/api/health
- **后台管理**：http://localhost:5173/admin/login

> 前端开发服务器（Vite）会把 `/api` 请求代理到后端 3001 端口，因此无需跨域配置。

## 后台管理

默认账号（首次启动自动创建，请尽快修改）：

| 项 | 值 |
| --- | --- |
| 地址 | `/admin/login` |
| 用户名 | `admin` |
| 密码 | `admin123` |

- 修改密码 / 多账号：当前为单管理员，可直接在数据库 `users` 表维护，或后续扩展用户管理界面。
- JWT 密钥通过环境变量 `JWT_SECRET` 配置，生产环境务必设置。

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run install:all` | 安装根 / 后端 / 前端依赖 |
| `npm run dev` | 同时启动前后端（concurrently） |
| `npm run dev:server` | 仅启动后端（`node --watch` 自动重载） |
| `npm run dev:client` | 仅启动前端 |
| `npm run build` | 构建前端生产包到 `client/dist` |
| `npm run start` | 生产模式启动后端 |
| `npm --prefix server run seed` | 手动写入占位种子数据 / 管理员 |

## REST API

公开读取接口（GET），以及需登录的写接口（POST / PUT / DELETE，需 `Authorization: Bearer <token>`）：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/auth/login` | 登录，返回 token |
| GET | `/api/auth/me` | 当前登录用户（需登录） |
| GET | `/api/site` | 站点信息 |
| PUT | `/api/site` | 更新站点信息（需登录） |
| GET | `/api/members?type=&all=1` | 成员列表 |
| POST/PUT/DELETE | `/api/members[/:id]` | 成员增改删（需登录） |
| GET | `/api/research` | 研究方向 |
| POST/PUT/DELETE | `/api/research[/:id]` | 方向增改删（需登录） |
| GET | `/api/publications?year=&type=&q=` | 成果列表 |
| POST/PUT/DELETE | `/api/publications[/:id]` | 成果增改删（需登录） |
| GET | `/api/news?page=&pageSize=&category=` | 新闻列表（分页） |
| GET | `/api/news/:id` | 新闻详情 |
| POST/PUT/DELETE | `/api/news[/:id]` | 新闻增改删（需登录） |
| GET | `/api/projects?status=` | 项目列表 |
| POST/PUT/DELETE | `/api/projects[/:id]` | 项目增改删（需登录） |

## 修改内容

内容暂为占位，两种方式维护：

1. **后台管理**：登录后通过各模块页面增删改查（推荐）。
2. **初始化占位数据**：编辑 `server/src/seed.js`，删除 `server/data/lab.db` 后重启即可重新生成。

## 待办 / 后续方向

- [ ] 富文本 / Markdown 新闻正文编辑器
- [ ] 图片上传（成员头像、banner、配图）
- [ ] 地图组件（百度 / 高德）
- [ ] 多管理员 / 用户管理界面
- [ ] 备案号、公安备案等站点信息完善
- [ ] 生产部署（Nginx 反向代理 + PM2 守护后端）
