#!/bin/bash

echo "正在停止所有服务..."

# 停止 Docker 容器
docker-compose down 2>/dev/null

# 停止后端进程
lsof -ti:8000 | xargs kill -9 2>/dev/null

# 停止前端进程
lsof -ti:5173 | xargs kill -9 2>/dev/null

echo "所有服务已停止"








