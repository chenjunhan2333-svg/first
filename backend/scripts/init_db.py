"""
初始化数据库脚本
创建默认管理员用户
"""
import sys
from pathlib import Path

# 添加项目根目录到路径
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.user import User, UserRole
from app.core.security import get_password_hash


def init_db():
    """初始化数据库"""
    # 创建所有表
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    try:
        # 检查是否已存在管理员
        admin = db.query(User).filter(User.username == "admin").first()
        if not admin:
            # 创建默认管理员
            admin_user = User(
                username="admin",
                email="admin@example.com",
                hashed_password=get_password_hash("admin123"),
                full_name="系统管理员",
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(admin_user)
            db.commit()
            print("✅ 默认管理员用户创建成功")
            print("   用户名: admin")
            print("   密码: admin123")
        else:
            print("ℹ️  管理员用户已存在")
        
        # 创建测试用户（可选）
        test_user = db.query(User).filter(User.username == "testuser").first()
        if not test_user:
            test_user = User(
                username="testuser",
                email="test@example.com",
                hashed_password=get_password_hash("test123"),
                full_name="测试用户",
                role=UserRole.USER,
                is_active=True,
            )
            db.add(test_user)
            db.commit()
            print("✅ 测试用户创建成功")
            print("   用户名: testuser")
            print("   密码: test123")
        
    except Exception as e:
        db.rollback()
        error_msg = str(e)
        print(f"❌ 初始化失败: {error_msg}")
        
        # 提供具体的错误解决建议
        if "bcrypt" in error_msg.lower() or "password cannot be longer" in error_msg.lower():
            print("\n[解决方案]")
            print("1. 运行修复脚本: backend\\fix_bcrypt.bat")
            print("2. 或手动修复:")
            print("   cd backend")
            print("   venv\\Scripts\\activate")
            print("   pip uninstall -y bcrypt")
            print("   pip install bcrypt==4.1.2")
        
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    print("开始初始化数据库...")
    init_db()
    print("✅ 数据库初始化完成")


