@echo off
chcp 65001 >nul
echo ========================================
echo 项目上传到 GitHub 脚本
echo ========================================
echo.

REM 设置 Git 用户信息
echo [1/6] 配置 Git 用户信息...
git config user.name "chenjunhan2333-svg"
git config user.email "chenjunhan2333@gmail.com"
if %errorlevel% neq 0 (
    echo 错误: Git 用户信息配置失败
    pause
    exit /b 1
)
echo ✓ Git 用户信息配置成功
echo.

REM 更新远程仓库地址
echo [2/6] 更新远程仓库地址...
git remote remove origin 2>nul
git remote add origin https://github.com/chenjunhan2333-svg/first.git
if %errorlevel% neq 0 (
    echo 错误: 远程仓库配置失败
    pause
    exit /b 1
)
echo ✓ 远程仓库地址已更新为: https://github.com/chenjunhan2333-svg/first.git
echo.

REM 添加所有更改
echo [3/6] 添加所有更改到暂存区...
git add .
if %errorlevel% neq 0 (
    echo 错误: 添加文件失败
    pause
    exit /b 1
)
echo ✓ 文件已添加到暂存区
echo.

REM 提交更改
echo [4/6] 提交更改...
set /p commit_msg="请输入提交信息 (直接回车使用默认信息): "
if "%commit_msg%"=="" set commit_msg=Initial commit: 用户认证与权限管理系统
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo 警告: 提交可能失败或没有更改需要提交
    echo 继续执行推送...
)
echo ✓ 更改已提交
echo.

REM 检查当前分支
echo [5/6] 检查当前分支...
git branch --show-current > temp_branch.txt
set /p current_branch=<temp_branch.txt
del temp_branch.txt
echo 当前分支: %current_branch%
echo.

REM 推送到 GitHub
echo [6/6] 推送到 GitHub...
echo 正在推送到远程仓库...
git push -u origin %current_branch%
if %errorlevel% neq 0 (
    echo.
    echo 错误: 推送失败
    echo.
    echo 可能的原因:
    echo 1. 远程仓库不存在或没有权限
    echo 2. 需要先拉取远程更改: git pull origin %current_branch% --allow-unrelated-histories
    echo 3. 网络连接问题
    echo.
    echo 如果这是第一次推送，可能需要先拉取远程更改
    set /p pull_first="是否先拉取远程更改? (y/n): "
    if /i "%pull_first%"=="y" (
        echo 正在拉取远程更改...
        git pull origin %current_branch% --allow-unrelated-histories --no-edit
        if %errorlevel% equ 0 (
            echo 正在重新推送...
            git push -u origin %current_branch%
        )
    )
)
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo ✓ 上传成功！
    echo ========================================
    echo 项目已成功上传到: https://github.com/chenjunhan2333-svg/first
    echo.
) else (
    echo ========================================
    echo ✗ 上传失败
    echo ========================================
    echo 请检查错误信息并重试
    echo.
)

pause

