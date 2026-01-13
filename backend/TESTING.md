# 后端测试指南

## 运行测试

### 方法一：使用测试脚本（推荐）

在 Windows 上，直接运行：

```bash
.\run_tests.bat
```

这个脚本会自动：
1. 检查并激活虚拟环境
2. 如果虚拟环境不存在，会创建并安装依赖
3. 运行所有测试并生成覆盖率报告

### 方法二：手动激活虚拟环境

1. **激活虚拟环境**：

   Windows (PowerShell):
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

   Windows (CMD):
   ```cmd
   venv\Scripts\activate.bat
   ```

   Linux/Mac:
   ```bash
   source venv/bin/activate
   ```

2. **运行测试**：

   ```bash
   pytest tests/ -v
   ```

   或使用覆盖率：

   ```bash
   pytest tests/ -v --cov=app --cov-report=html --cov-report=term
   ```

### 方法三：直接使用虚拟环境中的 Python

```bash
.\venv\Scripts\python.exe -m pytest tests/ -v
```

## 测试配置

测试配置在 `pytest.ini` 文件中，包括：
- 测试路径：`tests/`
- 覆盖率要求：≥ 60%
- 覆盖率报告格式：HTML、XML、终端输出

## 测试结构

```
backend/
├── tests/
│   ├── conftest.py      # 测试配置和 fixtures
│   ├── test_auth.py     # 认证 API 测试
│   └── test_users.py    # 用户管理 API 测试
└── pytest.ini           # pytest 配置
```

## 常见问题

### ModuleNotFoundError: No module named 'fastapi'

**原因**：没有激活虚拟环境或依赖未安装。

**解决方法**：
1. 确保虚拟环境已激活（见方法二）
2. 如果依赖未安装，运行：
   ```bash
   pip install -r requirements.txt
   ```

### 测试失败

如果测试失败，检查：
1. 虚拟环境是否正确激活
2. 所有依赖是否已安装
3. 数据库连接配置是否正确（测试使用内存 SQLite，无需真实数据库）

## 覆盖率报告

运行测试后，覆盖率报告会生成在：
- HTML 报告：`htmlcov/index.html`
- XML 报告：`coverage.xml`
- 终端输出：测试运行时的输出

打开 `htmlcov/index.html` 可以查看详细的覆盖率报告。

