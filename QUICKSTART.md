# 快速启动指南

## 🚀 5 分钟快速启动

### 前置要求

- Docker 和 Docker Compose（推荐方式）
- 或 Python 3.12（推荐，支持 3.10-3.12）、Node.js 18+、PostgreSQL 14+（手动方式）

**注意**：推荐使用 Python 3.12，不推荐 Python 3.13+ 和 3.14+（可能存在兼容性问题）

### 方式一：使用 Docker Compose（最简单）

```bash
# 1. 启动数据库
docker-compose up -d postgres

# 2. 初始化后端（新终端）
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python scripts/init_db.py

# 3. 启动后端
uvicorn app.main:app --reload

# 4. 启动前端（新终端）
cd frontend
npm install
npm run dev
```

访问：`http://localhost:5173`

登录账号：`admin` / `admin123`

### 方式二：完全手动启动

#### 步骤 1：启动 PostgreSQL

```bash
# 使用 Docker
docker run -d \
  --name quartz_postgres \
  -e POSTGRES_USER=quartz_user \
  -e POSTGRES_PASSWORD=quartz_password \
  -e POSTGRES_DB=quartz_db \
  -p 5432:5432 \
  postgres:14-alpine

# 或使用本地 PostgreSQL
# 创建数据库和用户（见 docs/DEPLOYMENT.md）
```

#### 步骤 2：后端设置

```bash
cd backend

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量（可选）
# 默认使用：postgresql://quartz_user:quartz_password@localhost:5432/quartz_db

# 初始化数据库
python scripts/init_db.py

# 启动服务
uvicorn app.main:app --reload
```

后端将在 `http://localhost:8000` 启动

#### 步骤 3：前端设置

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端将在 `http://localhost:5173` 启动

#### 步骤 4：访问系统

1. 打开浏览器访问 `http://localhost:5173`
2. 使用默认账号登录：
   - 管理员：`admin` / `admin123`
   - 测试用户：`testuser` / `test123`

## 📝 验证安装

### 检查后端 API

```bash
# 健康检查
curl http://localhost:8000/health

# API 文档
# 浏览器访问：http://localhost:8000/api/docs
```

### 检查前端

```bash
# 访问前端页面
# http://localhost:5173
```

## 🔧 常见问题

### 1. 数据库连接失败

**问题**：`psycopg2.OperationalError: could not connect to server`

**解决**：
- 确保 PostgreSQL 正在运行
- 检查 `backend/.env` 中的数据库连接配置
- 验证数据库用户和密码是否正确

### 2. 端口被占用

**问题**：`Address already in use`

**解决**：
- 后端默认端口：8000，可在启动时修改：`uvicorn app.main:app --port 8001`
- 前端默认端口：5173，可在 `vite.config.ts` 中修改

### 3. 前端无法连接后端

**问题**：API 请求失败

**解决**：
- 检查后端是否正在运行
- 检查 `frontend/vite.config.ts` 中的代理配置
- 检查浏览器控制台的错误信息

### 4. 图片无法显示

**问题**：上传的图片无法显示

**解决**：
- 确保 `backend/static/images` 目录存在
- 检查文件权限
- 检查后端日志中的错误信息

## 📚 下一步

- 查看 [API 文档](docs/API.md) 了解接口详情
- 查看 [部署指南](docs/DEPLOYMENT.md) 了解生产环境部署
- 查看 [贡献指南](docs/CONTRIBUTING.md) 了解开发规范

## 💡 提示

- 首次启动建议使用 Docker Compose，可以快速启动数据库
- 开发时使用 `--reload` 参数可以自动重载代码
- 生产环境部署请参考 `docs/DEPLOYMENT.md`


