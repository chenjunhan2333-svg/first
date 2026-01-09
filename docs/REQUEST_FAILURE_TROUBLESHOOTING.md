# 请求失败问题排查指南

## 问题症状
- 所有操作都出现"请求失败"
- 无法上传图像
- 无法获取数据列表

## 排查步骤

### 1. 检查后端服务是否运行

**Windows:**
```bash
netstat -ano | findstr :8000
```

**Linux/Mac:**
```bash
lsof -i :8000
```

如果端口 8000 没有进程在监听，说明后端服务没有运行。

**解决方案:**
- 运行 `start.bat` 或手动启动后端服务
- 检查后端服务窗口是否有错误信息

### 2. 检查后端服务健康状态

在浏览器中访问：
```
http://localhost:8000/health
```

应该返回：
```json
{"status": "healthy"}
```

如果无法访问，说明后端服务有问题。

### 3. 检查 API 文档是否可访问

在浏览器中访问：
```
http://localhost:8000/api/docs
```

如果无法访问，说明路由注册有问题。

### 4. 检查前端代理配置

确认 `frontend/vite.config.ts` 中的代理配置正确：
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
}
```

### 5. 检查浏览器控制台

打开浏览器开发者工具（F12），查看：
- **Console 标签**: 查看 JavaScript 错误
- **Network 标签**: 查看请求详情
  - 请求状态码（200, 401, 404, 500 等）
  - 请求 URL 是否正确
  - 响应内容是什么

### 6. 检查后端日志

查看后端服务窗口或日志文件 `backend/logs/app.log`，查找错误信息。

### 7. 常见错误及解决方案

#### 错误: "网络错误，请检查网络连接"
- **原因**: 后端服务未运行或无法连接
- **解决**: 启动后端服务，检查防火墙设置

#### 错误: "请求失败 (404)"
- **原因**: 路由路径不匹配
- **解决**: 检查路由定义，确认路径正确

#### 错误: "请求失败 (401)"
- **原因**: Token 过期或无效
- **解决**: 重新登录

#### 错误: "请求失败 (500)"
- **原因**: 服务器内部错误
- **解决**: 查看后端日志，检查数据库连接、文件权限等

#### 错误: "无法连接到服务器"
- **原因**: 后端服务未运行或代理配置错误
- **解决**: 
  1. 确认后端服务在运行
  2. 检查 `vite.config.ts` 中的代理配置
  3. 尝试直接访问 `http://localhost:8000/api/v1/health`

### 8. 手动测试 API

使用 curl 或 Postman 测试 API：

```bash
# 测试健康检查
curl http://localhost:8000/health

# 测试登录（需要替换用户名和密码）
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"

# 测试获取图像列表（需要替换 token）
curl http://localhost:8000/api/v1/images \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 9. 重启服务

如果以上步骤都无法解决问题，尝试：
1. 停止所有服务（`stop.bat`）
2. 清理浏览器缓存
3. 重新启动服务（`start.bat`）

## 获取详细错误信息

### 前端
1. 打开浏览器开发者工具（F12）
2. 切换到 **Network** 标签
3. 执行失败的操作
4. 点击失败的请求，查看：
   - **Headers**: 请求头、响应头
   - **Response**: 响应内容
   - **Preview**: 格式化的响应内容

### 后端
1. 查看后端服务窗口的输出
2. 或查看日志文件：`backend/logs/app.log`

## 联系支持

如果问题仍然存在，请提供以下信息：
1. 浏览器控制台的完整错误信息（Console 和 Network 标签）
2. 后端服务的错误日志
3. 具体的操作步骤（哪一步失败）
4. 错误发生的频率（每次都失败还是偶尔失败）






