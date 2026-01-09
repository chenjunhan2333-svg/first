# 部署指南

## 阿里云部署

### 1. 服务器准备

- **推荐配置**：
  - CPU: 2核+
  - 内存: 4GB+
  - 系统: Ubuntu 22.04 LTS
  - 磁盘: 40GB+ SSD

### 2. 环境安装

#### 安装 Python 3.12（推荐）

```bash
sudo apt update
# Ubuntu 22.04+ 可以直接安装
sudo apt install python3.12 python3.12-venv python3-pip

# 或使用 deadsnakes PPA（如果需要特定版本）
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12 python3.12-venv python3.12-distutils
```

**注意**：推荐使用 Python 3.12，支持 3.10-3.12，不推荐 3.13+ 和 3.14+（可能存在兼容性问题）

#### 安装 PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### 安装 Node.js 18+

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 安装 Nginx（用于反向代理）

```bash
sudo apt install nginx
```

### 3. 数据库配置

```bash
# 切换到 postgres 用户
sudo -u postgres psql

# 创建数据库和用户
CREATE DATABASE quartz_db;
CREATE USER quartz_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE quartz_db TO quartz_user;
\q
```

### 4. 后端部署

```bash
# 克隆项目
git clone <your-repo-url>
cd cjh/backend

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
nano .env  # 修改数据库连接等信息

# 初始化数据库
python scripts/init_db.py

# 使用 systemd 创建服务（可选）
sudo nano /etc/systemd/system/quartz-backend.service
```

服务文件内容：
```ini
[Unit]
Description=Quartz Backend API
After=network.target

[Service]
User=www-data
WorkingDirectory=/path/to/cjh/backend
Environment="PATH=/path/to/cjh/backend/venv/bin"
ExecStart=/path/to/cjh/backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

启动服务：
```bash
sudo systemctl daemon-reload
sudo systemctl enable quartz-backend
sudo systemctl start quartz-backend
```

### 5. 前端部署

```bash
cd ../frontend

# 安装依赖
npm install

# 构建生产版本
npm run build

# 配置 Nginx
sudo nano /etc/nginx/sites-available/quartz
```

Nginx 配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /path/to/cjh/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 代理
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 静态文件（图片）
    location /static {
        alias /path/to/cjh/backend/static;
    }
}
```

启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/quartz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL 证书（使用 Let's Encrypt）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 7. 防火墙配置

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 8. 数据备份

设置定期备份脚本：

```bash
# 创建备份脚本
sudo nano /usr/local/bin/backup-quartz.sh
```

脚本内容：
```bash
#!/bin/bash
BACKUP_DIR="/backup/quartz"
DATE=$(date +%Y%m%d_%H%M%S)

# 备份数据库
pg_dump -U quartz_user quartz_db > "$BACKUP_DIR/db_$DATE.sql"

# 备份上传的图片
tar -czf "$BACKUP_DIR/images_$DATE.tar.gz" /path/to/cjh/backend/static/images

# 删除 7 天前的备份
find $BACKUP_DIR -type f -mtime +7 -delete
```

设置定时任务：
```bash
sudo crontab -e
# 添加：0 2 * * * /usr/local/bin/backup-quartz.sh
```

## Docker 部署（推荐用于生产环境）

### 使用 Docker Compose

```bash
# 修改 docker-compose.yml 中的环境变量
# 然后运行
docker-compose up -d

# 初始化数据库
docker-compose exec backend python scripts/init_db.py
```

### 构建自定义镜像

```bash
# 构建后端镜像
cd backend
docker build -t quartz-backend:latest .

# 构建前端镜像（需要先构建前端）
cd ../frontend
npm run build
# 创建 Dockerfile（见下方）
docker build -t quartz-frontend:latest .
```

前端 Dockerfile 示例：
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

## 监控与日志

### 日志查看

```bash
# 后端日志
sudo journalctl -u quartz-backend -f

# Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 性能监控

建议使用：
- **Prometheus + Grafana**：监控系统指标
- **Sentry**：错误追踪
- **ELK Stack**：日志分析

## 安全建议

1. **更改默认密码**：首次部署后立即更改默认管理员密码
2. **使用强密码**：数据库密码、JWT Secret 等
3. **定期更新**：保持系统和依赖包更新
4. **限制访问**：使用防火墙限制不必要的端口
5. **HTTPS**：生产环境必须使用 HTTPS
6. **备份**：定期备份数据库和文件


