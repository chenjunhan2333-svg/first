#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "高纯石英矿石图像分类系统 - 快速启动"
echo "========================================"
echo

# 检查 Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}[错误] 未检测到 Python3，请先安装 Python 3.12${NC}"
    echo -e "${YELLOW}[提示] 推荐使用 Python 3.12，支持 3.10-3.12，不推荐 3.13+${NC}"
    exit 1
fi
# 显示 Python 版本信息
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo -e "${GREEN}[信息] 检测到 Python ${PYTHON_VERSION}${NC}"
echo -e "${YELLOW}[提示] 推荐使用 Python 3.12，当前版本 ${PYTHON_VERSION}${NC}"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}[错误] 未检测到 Node.js，请先安装 Node.js 18+${NC}"
    exit 1
fi

# 检查 Docker
USE_DOCKER=0
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    USE_DOCKER=1
else
    echo -e "${YELLOW}[警告] 未检测到 Docker，将使用本地 PostgreSQL（如果已安装）${NC}"
fi

# 函数：清理函数
cleanup() {
    echo
    echo -e "${YELLOW}正在停止服务...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    if [ $USE_DOCKER -eq 1 ]; then
        docker-compose down 2>/dev/null
    fi
    exit 0
}

# 捕获退出信号
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}[1/5] 启动数据库...${NC}"
if [ $USE_DOCKER -eq 1 ]; then
    docker-compose up -d postgres
    if [ $? -ne 0 ]; then
        echo -e "${RED}[错误] 数据库启动失败${NC}"
        exit 1
    fi
    echo -e "${GREEN}[成功] 数据库已启动${NC}"
    sleep 3
else
    echo -e "${YELLOW}[提示] 请确保 PostgreSQL 已安装并运行${NC}"
    echo -e "${YELLOW}[提示] 数据库配置: quartz_db / quartz_user / quartz_password${NC}"
fi

echo
echo -e "${GREEN}[2/5] 设置后端环境...${NC}"
cd backend || exit 1

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "创建 Python 虚拟环境..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo -e "${RED}[错误] 虚拟环境创建失败${NC}"
        cd ..
        exit 1
    fi
fi

# 激活虚拟环境
source venv/bin/activate

# 检查依赖
if ! python -c "import fastapi" 2>/dev/null; then
    echo "安装后端依赖..."
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo -e "${RED}[错误] 依赖安装失败${NC}"
        cd ..
        exit 1
    fi
fi

echo
echo -e "${GREEN}[3/5] 初始化数据库...${NC}"
python scripts/init_db.py
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}[警告] 数据库初始化可能失败，请检查数据库连接${NC}"
fi

echo
echo -e "${GREEN}[4/5] 启动后端服务...${NC}"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
sleep 3

echo
echo -e "${GREEN}[5/5] 启动前端服务...${NC}"
cd ../frontend || exit 1

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "安装前端依赖（首次运行可能需要几分钟）..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}[错误] 前端依赖安装失败${NC}"
        cd ..
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
fi

npm run dev &
FRONTEND_PID=$!

cd ..

echo
echo "========================================"
echo -e "${GREEN}启动完成！${NC}"
echo "========================================"
echo
echo "前端地址: http://localhost:5173"
echo "后端 API: http://localhost:8000"
echo "API 文档: http://localhost:8000/api/docs"
echo
echo "默认账号:"
echo "  管理员: admin / admin123"
echo "  测试用户: testuser / test123"
echo
echo -e "${YELLOW}按 Ctrl+C 停止所有服务${NC}"
echo

# 等待用户中断
wait


