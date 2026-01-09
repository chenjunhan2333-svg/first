@echo off
chcp 65001 >nul
echo ========================================
echo 推送到 GitHub 脚本
echo ========================================
echo.

REM 检查是否有未提交的更改
git status --porcelain >nul 2>&1
if %errorlevel% equ 0 (
    echo 检查到有未提交的更改，请先提交...
    git status
    echo.
    set /p commit="是否现在提交? (y/n): "
    if /i "%commit%"=="y" (
        set /p commit_msg="请输入提交信息: "
        if "%commit_msg%"=="" set commit_msg=Update
        git add .
        git commit -m "%commit_msg%"
    ) else (
        echo 已取消
        pause
        exit /b 0
    )
)

echo.
echo 正在推送到 GitHub...
echo.

REM 尝试推送
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 网络连接问题
    echo 2. 需要身份验证（用户名和密码/Token）
    echo 3. 防火墙阻止了连接
    echo.
    echo 解决方案：
    echo.
    echo 方案 1: 使用 Personal Access Token
    echo   1. 访问 https://github.com/settings/tokens
    echo   2. 生成新的 token (classic)
    echo   3. 复制 token
    echo   4. 推送时，用户名输入你的 GitHub 用户名
    echo   5. 密码输入刚才复制的 token
    echo.
    echo 方案 2: 使用 GitHub Desktop
    echo   使用 GitHub Desktop 图形界面推送
    echo.
    echo 方案 3: 检查网络和代理
    echo   确保可以访问 https://github.com
    echo.
    echo 方案 4: 稍后重试
    echo   网络问题可能是暂时的，稍后重试
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo ========================================
    echo ✓ 推送成功！
    echo ========================================
    echo 代码已成功推送到: https://github.com/chenjunhan2333-svg/first
    echo.
    pause
    exit /b 0
)

