@echo off
REM 激活虚拟环境并运行测试

if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
    echo Virtual environment activated.
) else (
    echo Virtual environment not found. Creating one...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo Installing dependencies...
    pip install --upgrade pip
    pip install -r requirements.txt
)

echo Running tests...
pytest tests/ -v --cov=app --cov-report=html --cov-report=term

pause
