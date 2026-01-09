@echo off
chcp 65001 >nul
title 后端服务启动
echo ============================================================
echo 后端服务启动
echo ============================================================
echo.

cd /d %~dp0

:: 检查虚拟环境
if not exist "venv\Scripts\activate.bat" (
    echo [错误] 虚拟环境不存在！
    echo.
    echo 请先运行以下命令创建虚拟环境：
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    echo.
    pause
    exit /b 1
)

:: 激活虚拟环境
echo [1/3] 激活虚拟环境...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo [错误] 虚拟环境激活失败
    pause
    exit /b 1
)
echo [成功] 虚拟环境已激活
echo.

:: 检查依赖
echo [2/3] 检查依赖...
python -c "import fastapi" 2>nul
if errorlevel 1 (
    echo [警告] FastAPI 未安装，正在安装依赖...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo [错误] 依赖安装失败
        echo.
        echo 请检查 requirements.txt 和网络连接
        pause
        exit /b 1
    )
) else (
    :: 检查 email-validator（Pydantic EmailStr 需要）
    python -c "import email_validator" 2>nul
    if errorlevel 1 (
        echo [警告] email-validator 未安装，正在安装...
        pip install email-validator
    )
    :: 检查 bcrypt 兼容性
    python -c "from passlib.context import CryptContext; ctx = CryptContext(schemes=['bcrypt'])" 2>nul
    if errorlevel 1 (
        echo [警告] bcrypt 兼容性问题检测到
        echo [提示] 如果遇到 bcrypt 错误，请运行: fix_bcrypt.bat
    )
)
echo [成功] 依赖检查通过
echo.

:: 启动服务
echo [3/3] 启动后端服务...
echo.
echo 服务地址: http://localhost:8000
echo API 文档: http://localhost:8000/api/docs
echo.
echo 按 Ctrl+C 停止服务
echo ============================================================
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

pause

