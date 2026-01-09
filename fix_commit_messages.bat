@echo off
chcp 65001 >nul
echo ========================================
echo 修复提交信息中的中文乱码
echo ========================================
echo.

echo 需要修改以下提交信息为英文：
echo.
echo 1. 105a093 - style: format backend code with Black and add config file
echo 2. 1a5f700 - feat: implement role 1 (project manager) and role 5 (test engineer) features
echo 3. a8aed53 - chore: remove CI/CD workflow, static code analysis tools and bug tracking features
echo 4. d0a92ac - docs: add project summary and GitHub Projects/Milestones setup guide
echo.

echo 开始交互式 rebase...
echo.

REM 设置编辑器为 notepad
set GIT_EDITOR=notepad

REM 开始 rebase
git rebase -i 9900f87

if %errorlevel% neq 0 (
    echo.
    echo Rebase 失败或已取消
    pause
    exit /b 1
)

echo.
echo ========================================
echo Rebase 完成
echo ========================================
echo.
echo 请检查提交历史：
git log --oneline -5
echo.
echo 如果提交信息已正确修改，运行以下命令推送到远程：
echo   git push origin main --force
echo.
echo 注意：force push 会覆盖远程历史！
echo.
pause

