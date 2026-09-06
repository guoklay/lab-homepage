# 贡献指南

欢迎参与本项目。协作流程如下：

## 环境与启动

1. 安装 Node.js ≥ 18（推荐 20/22/24）。
2. 安装依赖：`npm run install:all`
3. 启动开发：`npm run dev`（前端 http://localhost:5173，后端 http://localhost:3001）

## 提交代码

1. Fork 本仓库并 clone 到本地，基于 `main` 新建分支。
2. 提交前确保 `npm run build` 通过。
3. 遵循现有代码风格（Vue 3 组合式 API + CommonJS 后端），提交信息简明清晰。
4. 发起 Pull Request，说明改动的目的与内容。

## 注意事项

- **不要提交** `server/data/`、`server/uploads/`、`node_modules/`、`client/dist/`、`.env`（均已加入 `.gitignore`）。
- 敏感配置通过环境变量提供，参考 `.env.example`（如 `JWT_SECRET`）。
- 首次启动会自动写入占位种子数据，并创建默认管理员 `admin / admin123`，请尽快修改。

## 目录结构

详见 [README.md](README.md)。
