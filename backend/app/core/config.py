"""
应用配置管理
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """应用配置"""

    # 数据库配置
    DATABASE_URL: str = "postgresql://quartz_user:quartz_password@localhost:5432/quartz_db"

    # 安全配置
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # 文件上传配置（已移除图片上传功能，保留配置以备将来使用）
    # UPLOAD_DIR: str = "uploads"
    # MAX_UPLOAD_SIZE: int = 10485760  # 10MB
    # ALLOWED_EXTENSIONS: List[str] = ["jpg", "jpeg", "png", "webp"]

    # 日志配置
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "logs/app.log"

    # CORS 配置
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    # 阿里云 OSS 配置（可选）
    ALIYUN_OSS_ENDPOINT: str = ""
    ALIYUN_OSS_ACCESS_KEY_ID: str = ""
    ALIYUN_OSS_ACCESS_KEY_SECRET: str = ""
    ALIYUN_OSS_BUCKET_NAME: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()



