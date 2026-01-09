# API 文档

## 基础信息

- **Base URL**: `http://localhost:8000/api/v1`
- **API 文档**: `http://localhost:8000/api/docs` (Swagger UI)

## 认证

大部分 API 需要 Bearer Token 认证：

```
Authorization: Bearer <access_token>
```

## 接口列表

### 认证相关

#### 登录
```
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=admin123
```

响应：
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

#### 获取当前用户信息
```
GET /auth/me
Authorization: Bearer <token>
```

### 用户管理（仅管理员）

#### 创建用户
```
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "full_name": "新用户",
  "role": "user"
}
```

#### 获取用户列表
```
GET /users?skip=0&limit=100
Authorization: Bearer <token>
```

### 图像管理

#### 上传图像
```
POST /images/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image_file>
latitude: 39.9042 (可选)
longitude: 116.4074 (可选)
location_name: "北京" (可选)
capture_time: "2024-01-01T12:00:00Z" (可选)
```

#### 获取图像列表
```
GET /images?skip=0&limit=20&category=high_purity_quartz&purity_level=high
Authorization: Bearer <token>
```

响应：
```json
{
  "total": 100,
  "items": [
    {
      "id": 1,
      "filename": "image.jpg",
      "file_path": "/static/images/1/uuid.jpg",
      "detection_result": {
        "category": "high_purity_quartz",
        "purity_level": "high",
        "category_confidence": 0.95
      }
    }
  ]
}
```

#### 获取图像详情
```
GET /images/{image_id}
Authorization: Bearer <token>
```

#### 保存检测结果（未来用于 YOLO 集成）
```
POST /images/{image_id}/detection
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "high_purity_quartz",
  "purity_level": "high",
  "category_confidence": 0.95,
  "defects": [
    {
      "type": "crack",
      "bbox": [100, 100, 200, 200],
      "confidence": 0.9
    }
  ],
  "processing_time_ms": 250,
  "model_version": "yolov8_v1.0"
}
```

#### 删除图像
```
DELETE /images/{image_id}
Authorization: Bearer <token>
```

## 错误响应

```json
{
  "detail": "错误信息"
}
```

常见状态码：
- `200`: 成功
- `201`: 创建成功
- `400`: 请求参数错误
- `401`: 未认证
- `403`: 无权限
- `404`: 资源不存在
- `500`: 服务器错误








