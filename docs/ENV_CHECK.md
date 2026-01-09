# 环境完整性检测指南

本文档说明如何手动检测项目运行所需的环境依赖，以及预期的检测结果。

## 检测方法

### 1. Python 3.12 检测（推荐）

**检测命令**：
```bash
python --version
# 或
python3 --version
```

**预期结果**：
```
Python 3.12.0
# 推荐版本：Python 3.12.x
# 支持版本：Python 3.10.x, 3.11.x, 3.12.x
# 不推荐：Python 3.13+ 和 3.14+（可能存在兼容性问题）
```

**如果未安装**：
- 下载地址：https://www.python.org/downloads/
- **推荐下载 Python 3.12.x 版本**
- 安装时请勾选 "Add Python to PATH"

**版本说明**：
- ✅ **推荐**：Python 3.12.x（最佳兼容性）
- ✅ **支持**：Python 3.10.x, 3.11.x
- ⚠️ **不推荐**：Python 3.13+ 和 3.14+（可能存在依赖包兼容性问题）

---

### 2. Node.js 18+ 检测

**检测命令**：
```bash
node --version
```

**预期结果**：
```
v18.0.0
# 或更高版本，如 v20.0.0, v21.0.0 等
```

**如果未安装**：
- 下载地址：https://nodejs.org/
- 选择 LTS 版本（推荐）

---

### 3. npm 检测

**检测命令**：
```bash
npm --version
```

**预期结果**：
```
9.5.0
# 或更高版本，npm 通常随 Node.js 一起安装
```

**如果未安装**：
- npm 通常随 Node.js 一起安装
- 如果 Node.js 已安装但 npm 不可用，请重新安装 Node.js

---

### 4. Docker 检测（可选，推荐）

**检测命令**：
```bash
docker --version
```

**预期结果**：
```
Docker version 24.0.0, build xxxxxx
# 或类似版本信息
```

**如果未安装**：
- Windows/Mac：https://www.docker.com/products/docker-desktop
- Linux：`sudo apt install docker.io`（Ubuntu/Debian）

---

### 5. Docker Compose 检测（可选，推荐）

**检测命令**：
```bash
docker-compose --version
# 或（新版本）
docker compose version
```

**预期结果**：
```
docker-compose version 1.29.0, build xxxxxx
# 或
Docker Compose version v2.20.0
```

**如果未安装**：
- Docker Desktop 通常包含 Docker Compose
- Linux：`sudo apt install docker-compose`（Ubuntu/Debian）

---

### 6. PostgreSQL 检测（可选）

**检测命令**：
```bash
psql --version
```

**预期结果**：
```
psql (PostgreSQL) 14.0
# 或更高版本
```

**注意**：如果已安装 Docker，可以使用 Docker 运行 PostgreSQL，无需本地安装。

---

## 项目结构检测

### 必需目录

检查以下目录是否存在：

```bash
# Windows
dir backend\app
dir frontend\src

# Linux/Mac
ls backend/app
ls frontend/src
```

**预期结果**：
- `backend/app/` 目录存在，包含 `main.py` 等文件
- `frontend/src/` 目录存在，包含 Vue 组件等文件

### 必需文件

检查以下关键文件是否存在：

```bash
# Windows
dir backend\requirements.txt
dir backend\app\main.py
dir backend\scripts\init_db.py
dir frontend\package.json
dir docker-compose.yml

# Linux/Mac
ls backend/requirements.txt
ls backend/app/main.py
ls backend/scripts/init_db.py
ls frontend/package.json
ls docker-compose.yml
```

**预期结果**：所有文件都存在

---

## 端口占用检测

### 检测端口是否被占用

**Windows**：
```bash
netstat -ano | findstr :8000
netstat -ano | findstr :5173
netstat -ano | findstr :5432
```

**Linux/Mac**：
```bash
lsof -i :8000
lsof -i :5173
lsof -i :5432
```

**预期结果**：
- 端口 8000（后端）：未被占用（首次启动时）
- 端口 5173（前端）：未被占用（首次启动时）
- 端口 5432（PostgreSQL）：未被占用（如果使用 Docker）

**如果端口被占用**：
- 可以修改配置文件中的端口号
- 或关闭占用端口的程序

---

## 完整检测清单

### 必需依赖（必须全部安装）

- [ ] Python 3.12 已安装（推荐）
  - 检测：`python --version`
  - 预期：显示版本号 3.12.x（推荐）或 3.10.x、3.11.x（支持）
  - 不推荐：3.13+ 和 3.14+（可能存在兼容性问题）

- [ ] Node.js 18+ 已安装
  - 检测：`node --version`
  - 预期：显示版本号 v18.0.0 或更高

- [ ] npm 已安装
  - 检测：`npm --version`
  - 预期：显示版本号

### 可选依赖（推荐安装）

- [ ] Docker 已安装
  - 检测：`docker --version`
  - 预期：显示版本信息

- [ ] Docker Compose 已安装
  - 检测：`docker-compose --version` 或 `docker compose version`
  - 预期：显示版本信息

### 项目结构（必须完整）

- [ ] 后端目录存在
  - 检测：`backend/app/main.py` 文件存在

- [ ] 前端目录存在
  - 检测：`frontend/package.json` 文件存在

- [ ] 配置文件存在
  - 检测：`docker-compose.yml` 文件存在

### 端口状态（首次启动前应全部可用）

- [ ] 端口 8000 可用
  - 检测：`netstat -ano | findstr :8000`（Windows）
  - 预期：无输出或显示 "LISTENING"（如果服务已启动）

- [ ] 端口 5173 可用
  - 检测：`netstat -ano | findstr :5173`（Windows）
  - 预期：无输出或显示 "LISTENING"（如果服务已启动）

- [ ] 端口 5432 可用（如果使用本地 PostgreSQL）
  - 检测：`netstat -ano | findstr :5432`（Windows）
  - 预期：无输出

---

## 快速检测脚本（可选）

如果你想快速检测所有环境，可以创建一个简单的检测脚本：

### Windows (check.bat)

```batch
@echo off
echo 检测 Python...
python --version
echo.
echo 检测 Node.js...
node --version
echo.
echo 检测 npm...
npm --version
echo.
echo 检测 Docker...
docker --version
echo.
echo 检测 Docker Compose...
docker-compose --version
echo.
echo 检测端口...
netstat -ano | findstr :8000
netstat -ano | findstr :5173
pause
```

### Linux/Mac (check.sh)

```bash
#!/bin/bash
echo "检测 Python..."
python3 --version
echo
echo "检测 Node.js..."
node --version
echo
echo "检测 npm..."
npm --version
echo
echo "检测 Docker..."
docker --version
echo
echo "检测 Docker Compose..."
docker-compose --version
echo
echo "检测端口..."
lsof -i :8000
lsof -i :5173
```

---

## 常见问题

### Q: Python 命令不存在？

**A**: 
- 检查是否添加到 PATH 环境变量
- 尝试使用 `python3` 命令
- 重新安装 Python 并勾选 "Add to PATH"

### Q: Node.js 已安装但命令不存在？

**A**: 
- 重启命令行窗口
- 检查 PATH 环境变量
- 重新安装 Node.js

### Q: Docker 命令需要管理员权限？

**A**: 
- Windows/Mac：确保 Docker Desktop 正在运行
- Linux：将用户添加到 docker 组：`sudo usermod -aG docker $USER`

### Q: 端口被占用怎么办？

**A**: 
- 查找占用进程：`netstat -ano | findstr :8000`（Windows）
- 结束进程或修改配置文件中的端口号

---

## 检测通过标准

**可以启动项目的条件**：
- ✅ Python 3.12 已安装（推荐，支持 3.10-3.12）
- ✅ Node.js 18+ 已安装
- ✅ npm 已安装
- ✅ 项目目录结构完整
- ✅ 端口 8000、5173 可用（或已启动服务）

**推荐但非必需**：
- ⚠️ Docker 和 Docker Compose（用于快速启动数据库）
- ⚠️ 本地 PostgreSQL（如果没有 Docker）

满足上述条件后，即可运行 `start.bat`（Windows）或 `./start.sh`（Linux/Mac）启动项目。


