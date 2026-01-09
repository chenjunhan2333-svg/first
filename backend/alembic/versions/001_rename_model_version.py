"""rename model_version to detection_model_version

Revision ID: 001_rename_model_version
Revises: 
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001_rename_model_version'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # 重命名列（如果表已存在）
    try:
        op.alter_column('detection_results', 'model_version',
                       new_column_name='detection_model_version',
                       existing_type=sa.String(50),
                       existing_nullable=True)
    except Exception:
        # 如果列不存在或表不存在，忽略错误
        pass


def downgrade() -> None:
    # 回滚重命名
    try:
        op.alter_column('detection_results', 'detection_model_version',
                       new_column_name='model_version',
                       existing_type=sa.String(50),
                       existing_nullable=True)
    except Exception:
        pass







