@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Quartz Classification System - Start Services

echo ========================================
echo Quartz Classification System
echo Starting Services
echo ========================================
echo.

set PROJECT_ROOT=%CD%

echo [1/3] Starting database...
docker --version >nul 2>&1
if not errorlevel 1 (
    docker-compose up -d postgres >nul 2>&1
    if errorlevel 1 (
        echo [Warning] Docker database startup failed, continuing...
    ) else (
        echo [OK] Database started (Docker)
        timeout /t 2 >nul
    )
) else (
    echo [Info] Docker not found, assuming PostgreSQL is running locally
)
echo.

echo [2/3] Starting backend service...
set BACKEND_PATH=%PROJECT_ROOT%\backend

if not exist "%BACKEND_PATH%" (
    echo [Error] Backend directory not found: %BACKEND_PATH%
    pause
    exit /b 1
)

if not exist "%BACKEND_PATH%\venv\Scripts\activate.bat" (
    echo [Error] Virtual environment not found
    echo [Hint] Run check_env.bat first to set up the environment
    pause
    exit /b 1
)

netstat -ano | findstr :8000 | findstr LISTENING >nul 2>&1
if not errorlevel 1 (
    echo [Info] Port 8000 is already in use
    echo [Hint] If backend is not accessible, run: stop_port_8000.bat
    timeout /t 2 >nul
) else (
    if exist "%BACKEND_PATH%\venv\Scripts\uvicorn.exe" (
        start "Backend Service" cmd /k "cd /d %BACKEND_PATH% && call venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
    ) else (
        start "Backend Service" cmd /k "cd /d %BACKEND_PATH% && call venv\Scripts\activate.bat && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
    )
    echo [OK] Backend service starting...
    timeout /t 3 >nul
)
echo.

echo [3/3] Starting frontend service...
set FRONTEND_PATH=%PROJECT_ROOT%\frontend

if not exist "%FRONTEND_PATH%" (
    echo [Error] Frontend directory not found: %FRONTEND_PATH%
    pause
    exit /b 1
)

if not exist "%FRONTEND_PATH%\node_modules" (
    echo [Warning] node_modules not found
    echo [Hint] Run check_env.bat first to install dependencies
    echo [Info] Attempting to install now...
    cd /d "%FRONTEND_PATH%"
    call npm install
    if errorlevel 1 (
        echo [Error] Frontend dependency installation failed
        cd /d "%PROJECT_ROOT%"
        pause
        exit /b 1
    )
    cd /d "%PROJECT_ROOT%"
)

netstat -ano | findstr :5173 | findstr LISTENING >nul 2>&1
if not errorlevel 1 (
    echo [Info] Port 5173 is already in use
    echo [Hint] Frontend may already be running
    timeout /t 2 >nul
) else (
    start "Frontend Service" cmd /k "cd /d %FRONTEND_PATH% && npm run dev"
    echo [OK] Frontend service starting...
)
echo.

echo ========================================
echo Services Started
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/api/docs
echo.
echo Default accounts:
echo   Admin: admin / admin123
echo   Test User: testuser / test123
echo.
echo Services are running in separate windows.
echo Close those windows to stop the services.
echo.
echo Press any key to close this window...
pause >nul
