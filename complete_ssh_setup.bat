@echo off
chcp 65001 >nul
echo ========================================
echo SSH 配置完成脚本
echo ========================================
echo.

echo [步骤 1] 显示你的 SSH 公钥
echo ----------------------------------------
echo 请复制下面的公钥内容，然后添加到 GitHub
echo ----------------------------------------
echo.
type "%USERPROFILE%\.ssh\id_ed25519.pub"
echo.
echo ----------------------------------------
echo.

pause

echo.
echo [步骤 2] 测试 SSH 连接
echo ----------------------------------------
echo 请确保你已经将公钥添加到 GitHub
echo 访问: https://github.com/settings/keys
echo.
set /p ready="是否已经添加公钥到 GitHub? (y/n): "
if /i not "%ready%"=="y" (
    echo.
    echo 请先完成以下步骤:
    echo 1. 访问 https://github.com/settings/keys
    echo 2. 点击 "New SSH key"
    echo 3. 粘贴上面的公钥内容
    echo 4. 点击 "Add SSH key"
    echo.
    echo 完成后重新运行此脚本
    pause
    exit /b 0
)

echo.
echo 正在测试 SSH 连接...
ssh -T git@github.com

if %errorlevel% neq 0 (
    echo.
    echo SSH 连接测试失败
    echo 请检查:
    echo 1. 公钥是否已正确添加到 GitHub
    echo 2. 网络连接是否正常
    pause
    exit /b 1
)

echo.
echo [步骤 3] 验证远程仓库地址
echo ----------------------------------------
git remote -v
echo.

echo [步骤 4] 推送到 GitHub
echo ----------------------------------------
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ 推送成功！
    echo ========================================
    echo 代码已成功推送到: https://github.com/chenjunhan2333-svg/first
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ 推送失败
    echo ========================================
    echo 请检查错误信息
    echo.
)

pause

