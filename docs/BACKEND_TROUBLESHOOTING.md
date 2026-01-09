# 后端服务启动问题排查指南

## 快速诊断

### 步骤 1：运行诊断工具

```bash
check_backend.bat
```

### 步骤 2：使用调试模式启动

```bash
cd backend
debug_start.bat
```

这个脚本会：
- 检查虚拟环境
- 验证所有依赖
- 测试代码导入
- 检查端口占用
- 显示详细的启动信息

## 常见错误及解决方案

### 错误 1：ModuleNotFoundError

**错误信息**：
```
ModuleNotFoundError: No module named 'xxx'
```

**解决方案**：
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

### 错误 2：ImportError

**错误信息**：
```
ImportError: cannot import name 'xxx' from 'app.xxx'
```

**可能原因**：
- 代码语法错误
- 循环导入
- 模块路径问题

**解决方案**：
1. 检查错误信息中提到的文件
2. 运行调试脚本查看详细错误：
   ```bash
   cd backend
   debug_start.bat
   ```

### 错误 3：数据库连接失败

**错误信息**：
```
psycopg2.OperationalError: could not connect to server
```

**解决方案**：
1. 检查数据库是否运行：
   ```bash
   docker-compose ps
   ```
2. 启动数据库：
   ```bash
   docker-compose up -d postgres
   ```
3. 检查数据库配置（`backend/.env`）

### 错误 4：端口被占用

**错误信息**：
```
Address already in use
```

**解决方案**：
```bash
# 查找占用端口的进程
netstat -ano | findstr :8000

# 结束进程（替换 PID）
taskkill /F /PID <PID>

# 或修改端口（在启动命令中）
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

### 错误 5：bcrypt 兼容性问题

**错误信息**：
```
AttributeError: module 'bcrypt' has no attribute '__about__'
```

**解决方案**：
```bash
cd backend
fix_bcrypt.bat
```

## 手动启动步骤（用于查看详细错误）

### Windows

```bash
# 1. 进入后端目录
cd backend

# 2. 激活虚拟环境
venv\Scripts\activate

# 3. 检查依赖
python -c "import fastapi; import uvicorn; print('Dependencies OK')"

# 4. 测试导入
python -c "from app.main import app; print('Import OK')"

# 5. 启动服务
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 查看详细错误

如果启动失败，错误信息会直接显示在终端中。常见错误包括：

1. **依赖缺失**：安装缺失的包
2. **导入错误**：检查代码语法和导入路径
3. **数据库错误**：检查数据库连接
4. **配置错误**：检查 `.env` 文件

## 验证服务是否运行

### 方法 1：浏览器访问

打开浏览器访问：
- http://localhost:8000/health
- http://localhost:8000/api/docs

### 方法 2：命令行测试

```bash
curl http://localhost:8000/health
```

应该返回：
```json
{"status":"healthy"}
```

## 如果问题持续存在

1. **查看后端服务窗口**：`start.bat` 会打开一个单独的后端服务窗口，查看其中的错误信息

2. **检查日志文件**：查看 `backend/logs/app.log`（如果存在）

3. **重新创建虚拟环境**：
   ```bash
   cd backend
   rmdir /s /q venv
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **检查 Python 版本**：
   ```bash
   python --version
   ```
   应该是 Python 3.12（推荐）或 3.10-3.11

## 获取帮助

如果以上方法都无法解决问题，请提供：
1. 完整的错误信息（从后端服务窗口复制）
2. Python 版本：`python --version`
3. 已安装的依赖：`pip list`
4. 运行 `debug_start.bat` 的完整输出







