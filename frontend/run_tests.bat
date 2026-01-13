@echo off
REM 前端测试运行脚本

echo ========================================
echo 前端测试运行脚本
echo ========================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未找到 Node.js，请先安装 Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] 检查 Node.js 版本...
node --version
echo.

REM 检查 node_modules 是否存在
if not exist "node_modules" (
    echo [2/3] 未找到 node_modules，正在安装依赖...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo [完成] 依赖安装成功
    echo.
) else (
    echo [2/3] 依赖已存在，跳过安装
    echo.
)

REM 运行测试
echo [3/3] 运行测试...
echo.

REM 检查参数
if "%1"=="coverage" (
    echo 运行测试并生成覆盖率报告...
    call npm run test:coverage -- --run
) else if "%1"=="ui" (
    echo 运行测试 UI...
    call npm run test:ui
) else (
    echo 运行测试...
    call npm run test -- --run
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [错误] 测试运行失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo 测试完成！
echo ========================================
echo.
echo 使用说明:
echo   run_tests.bat          - 运行测试
echo   run_tests.bat coverage - 运行测试并生成覆盖率报告
echo   run_tests.bat ui       - 运行测试 UI（交互式）
echo.
pause

