# Python 版本说明

## 推荐版本

**推荐使用：Python 3.12.x**

本项目经过测试，**Python 3.12** 具有最佳的兼容性和稳定性。

## 支持版本

- ✅ **Python 3.12.x**（推荐，最佳兼容性）
- ✅ **Python 3.11.x**（支持）
- ✅ **Python 3.10.x**（支持）

## 不推荐版本

- ⚠️ **Python 3.13+**：可能存在依赖包兼容性问题
- ⚠️ **Python 3.14+**：可能存在依赖包兼容性问题，特别是 Pillow 等需要编译的包

## 版本选择原因

### 为什么推荐 Python 3.12？

1. **依赖兼容性最佳**：
   - Pillow、OpenCV 等图像处理库在 3.12 上编译和运行最稳定
   - FastAPI、SQLAlchemy 等框架完全支持
   - 所有项目依赖都经过 3.12 测试

2. **性能优化**：
   - Python 3.12 相比 3.10-3.11 有性能提升
   - 启动速度更快
   - 内存使用更优化

3. **长期支持**：
   - Python 3.12 是稳定版本
   - 社区支持完善
   - 文档和教程丰富

### 为什么不推荐 Python 3.13+ 和 3.14+？

1. **依赖包兼容性**：
   - 部分依赖包（如 Pillow）可能还未完全支持最新版本
   - 编译工具链可能不兼容
   - 可能出现 `KeyError: '__version__'` 等错误

2. **稳定性**：
   - 新版本可能存在未知 bug
   - 项目依赖可能还未适配

3. **开发环境**：
   - 团队协作时版本统一更重要
   - 生产环境部署更稳定

## 检查当前 Python 版本

```bash
python --version
# 或
python3 --version
```

**预期输出**：
```
Python 3.12.0
```

## 安装 Python 3.12

### Windows

1. 访问：https://www.python.org/downloads/
2. 下载 Python 3.12.x 版本
3. 安装时**务必勾选** "Add Python to PATH"
4. 验证安装：`python --version`

### Linux (Ubuntu/Debian)

```bash
# 使用 deadsnakes PPA
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12 python3.12-venv python3.12-distutils

# 创建软链接（可选）
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1
```

### Mac

```bash
# 使用 Homebrew
brew install python@3.12

# 或从官网下载安装包
# https://www.python.org/downloads/
```

## 如果已安装其他版本

### 方案一：使用 pyenv（推荐）

```bash
# 安装 pyenv
# Windows: https://github.com/pyenv-win/pyenv-win
# Linux/Mac: https://github.com/pyenv/pyenv

# 安装 Python 3.12
pyenv install 3.12.0

# 设置为项目本地版本
cd /path/to/project
pyenv local 3.12.0
```

### 方案二：多版本共存

Windows 上可以同时安装多个 Python 版本，使用完整路径：

```bash
# 使用 Python 3.12
C:\Python312\python.exe -m venv venv
```

Linux/Mac 上：

```bash
# 使用 python3.12 命令
python3.12 -m venv venv
```

## 验证安装

创建虚拟环境并测试：

```bash
# 创建虚拟环境
python -m venv test_venv

# 激活虚拟环境
# Windows:
test_venv\Scripts\activate
# Linux/Mac:
source test_venv/bin/activate

# 验证版本
python --version

# 测试安装依赖
pip install --upgrade pip
pip install fastapi

# 清理测试环境
deactivate
rmdir /s /q test_venv  # Windows
# 或
rm -rf test_venv  # Linux/Mac
```

## 常见问题

### Q: 我已经安装了 Python 3.14，可以继续使用吗？

**A**: 不推荐。建议降级到 Python 3.12，因为：
- 可能存在依赖包兼容性问题
- Pillow 等包可能无法正常编译
- 项目未在 3.14 上测试

### Q: Python 3.10 可以吗？

**A**: 可以，但推荐使用 3.12。3.10 是支持的最低版本，但 3.12 有更好的性能和兼容性。

### Q: 如何切换 Python 版本？

**A**: 
1. 卸载旧版本（可选）
2. 安装 Python 3.12
3. 重新创建虚拟环境：`python -m venv venv`
4. 重新安装依赖：`pip install -r requirements.txt`

### Q: 虚拟环境中的 Python 版本不对？

**A**: 删除旧的虚拟环境，用正确的 Python 版本重新创建：

```bash
# 删除旧环境
rmdir /s /q venv  # Windows
rm -rf venv  # Linux/Mac

# 用 Python 3.12 重新创建
python -m venv venv
```

## 总结

- ✅ **推荐**：Python 3.12.x
- ✅ **支持**：Python 3.10.x, 3.11.x
- ⚠️ **不推荐**：Python 3.13+, 3.14+

选择 Python 3.12 可以获得最佳的开发体验和项目兼容性。







