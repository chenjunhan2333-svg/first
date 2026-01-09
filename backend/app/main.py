"""
FastAPI 应用主入口
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import os

from app.core.config import settings
from app.api.v1 import api_router

# 确保必要的目录存在
os.makedirs("logs", exist_ok=True)

# 配置日志
logger.add(
    settings.LOG_FILE,
    rotation="10 MB",
    retention="7 days",
    level=settings.LOG_LEVEL,
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",
)

app = FastAPI(
    title="高纯石英矿石图像分类系统 API",
    description="用户认证与权限管理系统 API（基础版本，专注于五个角色的核心功能）",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    redirect_slashes=False,  # 禁用自动重定向，避免 307 重定向时丢失 Authorization header
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 静态文件服务（已移除图片上传功能，保留以备将来使用）
# app.mount("/static", StaticFiles(directory="static"), name="static")

# 注册路由
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "高纯石英矿石图像分类系统 API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "note": "当前为基础版本，专注于用户认证与权限管理功能",
    }


@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
