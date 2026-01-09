# 故障排除指南

## 常见问题及解决方案

### 0. 后端服务无法启动

**错误现象**：
- 前端显示 `ECONNREFUSED` 错误
- 无法访问 http://localhost:8000
- 后端服务窗口立即关闭或报错
- 登录时提示网络错误

**快速诊断**：
```bash
# 运行诊断脚本
check_backend.bat

# 或手动启动查看错误
cd backend
start_backend.bat
```

**常见原因和解决方案**：

#### 原因 1：虚拟环境未创建或依赖未安装
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### 原因 2：端口 8000 被占用
```bash
# 查找占用进程
netstat -ano | findstr :8000

# 结束进程（替换 PID 为实际进程号）
taskkill /F /PID <PID>

# 或修改端口（在 start_backend.bat 中）
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

#### 原因 3：数据库连接失败
检查数据库是否已启动：
```bash
docker-compose up -d postgres
```

或检查 `backend/.env` 中的数据库连接配置。

#### 原因 4：Python 模块导入错误
```bash
cd backend
venv\Scripts\activate
python -c "from app.main import app"
```

如果报错，检查：
- 所有依赖是否已安装：`pip list`
- 代码是否有语法错误
- 文件路径是否正确

#### 原因 5：权限问题
- 确保有写入 `logs/`、`uploads/`、`static/` 目录的权限
- 以管理员身份运行（如果需要）

**推荐解决步骤**：
1. 运行 `check_backend.bat` 诊断问题
2. 使用 `backend\start_backend.bat` 手动启动查看详细错误
3. 根据错误信息修复问题
4. 如果问题持续，检查后端服务窗口中的错误信息

---

### 1. Pillow 安装失败

**错误信息**：
```
ERROR: Failed to build 'Pillow' when getting requirements to build wheel
KeyError: '__version__'
```

**原因**：
- Windows 上 Pillow 需要编译，缺少编译工具
- pip、setuptools 版本过旧
- Pillow 版本兼容性问题

**解决方案**：

#### 方案一：升级构建工具（推荐）
```bash
cd backend
venv\Scripts\activate
python -m pip install --upgrade pip setuptools wheel
pip install Pillow
```

#### 方案二：使用预编译版本
```bash
pip install --only-binary :all: Pillow
```

#### 方案三：安装 Visual C++ Build Tools
1. 下载并安装：https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. 选择 "C++ 生成工具" 工作负载
3. 重新运行安装命令

#### 方案四：使用 conda（如果已安装）
```bash
conda install pillow
```

#### 方案五：暂时跳过（如果不需要图像处理）
如果当前不需要图像处理功能，可以：
1. 注释掉 `requirements.txt` 中的 `Pillow` 和 `opencv-python`
2. 继续安装其他依赖
3. 后续需要时再安装

---

### 2. psycopg2 安装失败

**错误信息**：
```
error: Microsoft Visual C++ 14.0 or greater is required
```

**解决方案**：
```bash
# 使用预编译的二进制版本（已包含在 requirements.txt 中）
pip install psycopg2-binary
```

如果还是失败，参考 Pillow 的解决方案安装 Visual C++ Build Tools。

---

### 3. 端口被占用

**错误信息**：
```
Address already in use
```

**解决方案**：

**Windows**：
```bash
# 查找占用端口的进程
netstat -ano | findstr :8000

# 结束进程（替换 PID 为实际进程号）
taskkill /F /PID <PID>
```

**Linux/Mac**：
```bash
# 查找占用端口的进程
lsof -i :8000

# 结束进程
kill -9 <PID>
```

或修改配置文件中的端口号。

---

### 4. 数据库连接失败

**错误信息**：
```
psycopg2.OperationalError: could not connect to server
```

**解决方案**：

1. **检查 Docker 是否运行**：
```bash
docker ps
```

2. **检查数据库容器**：
```bash
docker-compose ps
```

3. **重启数据库**：
```bash
docker-compose restart postgres
```

4. **检查环境变量**：
确保 `backend/.env` 中的数据库连接信息正确：
```
DATABASE_URL=postgresql://quartz_user:quartz_password@localhost:5432/quartz_db
```

---

### 5. 虚拟环境激活失败

**错误信息**：
```
'venv\Scripts\activate.bat' 不是内部或外部命令
```

**解决方案**：

1. **重新创建虚拟环境**：
```bash
cd backend
rmdir /s /q venv
python -m venv venv
venv\Scripts\activate
```

2. **检查 Python 安装**：
```bash
python --version
```

---

### 6. npm 安装依赖失败

**错误信息**：
```
npm ERR! code ELIFECYCLE
```

**解决方案**：

1. **清除缓存**：
```bash
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. **使用国内镜像**：
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

3. **检查 Node.js 版本**：
确保 Node.js 版本 >= 18

---

### 7. 前端无法连接后端

**错误信息**：
```
Network Error
Failed to fetch
```

**解决方案**：

1. **检查后端是否运行**：
访问 http://localhost:8000/docs

2. **检查代理配置**：
查看 `frontend/vite.config.ts` 中的代理设置

3. **检查 CORS 配置**：
查看 `backend/app/core/config.py` 中的 CORS_ORIGINS

---

### 8. 数据库迁移失败

**错误信息**：
```
alembic.util.exc.CommandError: Target database is not up to date
```

**解决方案**：

1. **升级到最新版本**：
```bash
cd backend
alembic upgrade head
```

2. **如果数据库为空，重新初始化**：
```bash
python scripts/init_db.py
```

---

### 9. 权限错误（Linux/Mac）

**错误信息**：
```
Permission denied
```

**解决方案**：

```bash
# 添加执行权限
chmod +x start.sh
chmod +x stop.sh

# Docker 权限（Linux）
sudo usermod -aG docker $USER
# 然后重新登录
```

---

### 10. 内存不足

**错误信息**：
```
Out of memory
```

**解决方案**：

1. **关闭其他程序**
2. **减少 Docker 内存分配**（Docker Desktop 设置）
3. **使用更轻量的数据库**（如 SQLite，仅用于开发）

---

## 获取帮助

如果以上方案都无法解决问题：

1. **查看详细错误日志**：
   - 后端：查看终端输出
   - 前端：查看浏览器控制台（F12）

2. **检查系统要求**：
   - Python 3.12（推荐，支持 3.10-3.12，不推荐 3.13+）
   - Node.js 18+
   - 足够的内存和磁盘空间

3. **重新开始**：
   ```bash
   # 清理环境
   cd backend
   rmdir /s /q venv
   cd ../frontend
   rmdir /s /q node_modules
   
   # 重新安装
   # 按照 README.md 的步骤重新操作
   ```

---

## 快速修复脚本

如果遇到 Pillow 安装问题，可以使用：

```bash
cd backend
backend\install_deps.bat
```

这个脚本会分步安装依赖，更容易定位问题。

