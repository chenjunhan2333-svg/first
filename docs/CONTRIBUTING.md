# 贡献指南

## 开发环境设置

### 1. 后端开发环境

```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置数据库连接等信息

# 初始化数据库
python scripts/init_db.py

# 运行数据库迁移（如果使用 Alembic）
alembic upgrade head

# 启动开发服务器
uvicorn app.main:app --reload
```

### 2. 前端开发环境

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 3. 数据库设置（使用 Docker）

```bash
# 在项目根目录运行
docker-compose up -d postgres

# 查看数据库日志
docker-compose logs postgres
```

## 代码规范

### Python 后端

- 使用 `black` 格式化代码：`black .`
- 使用 `flake8` 检查代码：`flake8 .`
- 使用 `mypy` 进行类型检查：`mypy app/`
- 遵循 PEP 8 代码风格

### TypeScript 前端

- 使用 `prettier` 格式化代码：`npm run format`
- 使用 `eslint` 检查代码：`npm run lint`
- 遵循 Vue 3 Composition API 最佳实践

## 测试

### 后端测试

```bash
cd backend
pytest
pytest --cov=app tests/  # 带覆盖率
```

### 前端测试

```bash
cd frontend
npm run test
npm run test:coverage  # 带覆盖率
```

## Git 工作流

1. 从 `main` 分支创建功能分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 提交代码
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   ```

3. 推送并创建 Pull Request

## 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

示例：
```
feat: 添加图像上传功能
fix: 修复登录 token 过期问题
docs: 更新 API 文档
```

## 添加新功能时的注意事项

### 添加 YOLO 模型功能（未来）

1. **后端**：
   - 在 `backend/app/services/` 创建 `model_service.py`
   - 实现模型加载和推理逻辑
   - 添加 API 端点 `/api/v1/images/{id}/detect`

2. **前端**：
   - 在图像详情页添加"开始检测"按钮
   - 调用检测 API 并展示结果

3. **移动端**：
   - 集成模型文件到 Android 项目
   - 实现本地推理逻辑
   - 将结果同步到后端

## 问题反馈

如遇到问题，请创建 Issue 并包含：
- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息（OS、Python/Node 版本等）








