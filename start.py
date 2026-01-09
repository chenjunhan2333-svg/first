#!/usr/bin/env python3
"""
跨平台快速启动脚本
支持 Windows、Linux、macOS
"""
import os
import sys
import subprocess
import time
import platform
from pathlib import Path

# 颜色支持（Windows 需要额外处理）
if platform.system() == "Windows":
    try:
        import colorama
        colorama.init()
    except ImportError:
        pass

GREEN = "\033[0;32m"
RED = "\033[0;31m"
YELLOW = "\033[1;33m"
NC = "\033[0m"  # No Color


def print_step(step, message):
    """打印步骤信息"""
    print(f"{GREEN}[{step}] {message}{NC}")


def print_error(message):
    """打印错误信息"""
    print(f"{RED}[错误] {message}{NC}")


def print_warning(message):
    """打印警告信息"""
    print(f"{YELLOW}[警告] {message}{NC}")


def check_command(cmd, name, version_flag="--version"):
    """检查命令是否可用"""
    try:
        result = subprocess.run(
            [cmd, version_flag],
            capture_output=True,
            text=True,
            timeout=5
        )
        return result.returncode == 0
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def run_command(cmd, cwd=None, check=True, shell=False):
    """运行命令"""
    if platform.system() == "Windows":
        shell = True
    
    try:
        result = subprocess.run(
            cmd,
            cwd=cwd,
            shell=shell,
            check=check,
            capture_output=not check  # 如果 check=False，显示输出
        )
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        return False


def main():
    """主函数"""
    print("=" * 50)
    print("高纯石英矿石图像分类系统 - 快速启动")
    print("=" * 50)
    print()

    # 检查环境
    print_step("检查", "环境依赖...")
    
    if not check_command("python3", "Python3") and not check_command("python", "Python"):
        print_error("未检测到 Python，请先安装 Python 3.12")
        print_warning("推荐使用 Python 3.12，支持 3.10-3.12，不推荐 3.13+")
        sys.exit(1)
    
    python_cmd = "python3" if check_command("python3", "Python3") else "python"
    # 显示 Python 版本
    try:
        version_result = subprocess.run([python_cmd, "--version"], capture_output=True, text=True, timeout=5)
        if version_result.returncode == 0:
            version = version_result.stdout.strip()
            print_step("信息", f"检测到 {version}")
            print_warning("推荐使用 Python 3.12，当前版本可能不是最优选择")
    except:
        pass
    
    if not check_command("node", "Node.js"):
        print_error("未检测到 Node.js，请先安装 Node.js 18+")
        sys.exit(1)
    
    # 检查 Docker
    use_docker = check_command("docker", "Docker") and check_command("docker-compose", "Docker Compose")
    if not use_docker:
        print_warning("未检测到 Docker，将使用本地 PostgreSQL（如果已安装）")
    
    # 1. 启动数据库
    print()
    print_step("1/5", "启动数据库...")
    if use_docker:
        if not run_command(["docker-compose", "up", "-d", "postgres"], check=False):
            print_error("数据库启动失败")
            sys.exit(1)
        print_step("成功", "数据库已启动")
        time.sleep(3)
    else:
        print_warning("请确保 PostgreSQL 已安装并运行")
        print_warning("数据库配置: quartz_db / quartz_user / quartz_password")
    
    # 2. 设置后端环境
    print()
    print_step("2/5", "设置后端环境...")
    backend_dir = Path("backend")
    
    if not backend_dir.exists():
        print_error("backend 目录不存在")
        sys.exit(1)
    
    venv_dir = backend_dir / "venv"
    
    # 创建虚拟环境
    if not venv_dir.exists():
        print("创建 Python 虚拟环境...")
        if not run_command([python_cmd, "-m", "venv", "venv"], cwd=backend_dir):
            print_error("虚拟环境创建失败")
            sys.exit(1)
    
    # 激活虚拟环境并安装依赖
    if platform.system() == "Windows":
        pip_cmd = str(venv_dir / "Scripts" / "pip.exe")
        python_venv = str(venv_dir / "Scripts" / "python.exe")
    else:
        pip_cmd = str(venv_dir / "bin" / "pip")
        python_venv = str(venv_dir / "bin" / "python")
    
    # 检查依赖
    try:
        subprocess.run([python_venv, "-c", "import fastapi"], 
                      capture_output=True, check=True, timeout=5)
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
        print("安装后端依赖...")
        if not run_command([pip_cmd, "install", "-r", "requirements.txt"], cwd=backend_dir):
            print_error("依赖安装失败")
            sys.exit(1)
    
    # 3. 初始化数据库
    print()
    print_step("3/5", "初始化数据库...")
    if not run_command([python_venv, "scripts/init_db.py"], cwd=backend_dir, check=False):
        print_warning("数据库初始化可能失败，请检查数据库连接")
    
    # 4. 启动后端服务
    print()
    print_step("4/5", "启动后端服务...")
    if platform.system() == "Windows":
        uvicorn_cmd = str(venv_dir / "Scripts" / "uvicorn.exe")
    else:
        uvicorn_cmd = str(venv_dir / "bin" / "uvicorn")
    
    backend_process = subprocess.Popen(
        [uvicorn_cmd, "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
        cwd=backend_dir
    )
    time.sleep(3)
    
    # 5. 启动前端服务
    print()
    print_step("5/5", "启动前端服务...")
    frontend_dir = Path("frontend")
    
    if not frontend_dir.exists():
        print_error("frontend 目录不存在")
        backend_process.terminate()
        sys.exit(1)
    
    # 检查 node_modules
    if not (frontend_dir / "node_modules").exists():
        print("安装前端依赖（首次运行可能需要几分钟）...")
        if not run_command(["npm", "install"], cwd=frontend_dir):
            print_error("前端依赖安装失败")
            backend_process.terminate()
            sys.exit(1)
    
    frontend_process = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd=frontend_dir
    )
    
    # 显示启动信息
    print()
    print("=" * 50)
    print(f"{GREEN}启动完成！{NC}")
    print("=" * 50)
    print()
    print("前端地址: http://localhost:5173")
    print("后端 API: http://localhost:8000")
    print("API 文档: http://localhost:8000/api/docs")
    print()
    print("默认账号:")
    print("  管理员: admin / admin123")
    print("  测试用户: testuser / test123")
    print()
    print(f"{YELLOW}按 Ctrl+C 停止所有服务{NC}")
    print()
    
    # 等待用户中断
    try:
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print()
        print("正在停止服务...")
        backend_process.terminate()
        frontend_process.terminate()
        if use_docker:
            run_command(["docker-compose", "down"], check=False)
        print("服务已停止")


if __name__ == "__main__":
    main()


