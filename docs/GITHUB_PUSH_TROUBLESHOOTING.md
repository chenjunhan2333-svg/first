# GitHub 推送问题排查指南

## 问题：推送失败 - Connection was reset / Failed to connect

### 常见错误信息
- `fatal: unable to access 'https://github.com/...': Recv failure: Connection was reset`
- `fatal: unable to access 'https://github.com/...': Failed to connect to github.com port 443`

## 解决方案

### 方案 1: 使用 Personal Access Token（推荐）

GitHub 已不再支持使用密码推送，需要使用 Personal Access Token。

#### 步骤：

1. **生成 Token**
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 设置名称：例如 "Local Development"
   - 选择权限：至少勾选 `repo`（完整仓库访问权限）
   - 点击 "Generate token"
   - **重要**：立即复制 token（只显示一次）

2. **使用 Token 推送**
   ```bash
   git push origin main
   ```
   - 用户名：输入你的 GitHub 用户名（chenjunhan2333-svg）
   - 密码：输入刚才复制的 token（不是你的 GitHub 密码）

3. **保存凭据（可选）**
   Windows 会自动保存凭据到 Windows 凭据管理器。

### 方案 2: 配置 Git 使用 Token

#### 方法 A: 在 URL 中包含 Token（不推荐，但快速）
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/chenjunhan2333-svg/first.git
git push origin main
```

#### 方法 B: 使用 Git Credential Manager
```bash
# 配置使用 Windows Credential Manager
git config --global credential.helper manager-core

# 推送时会提示输入用户名和 token
git push origin main
```

### 方案 3: 使用 SSH（推荐用于长期使用）

#### 步骤：

1. **生成 SSH 密钥**（如果还没有）
   ```bash
   ssh-keygen -t ed25519 -C "chenjunhan2333@gmail.com"
   ```
   - 按回车使用默认路径
   - 可以设置密码（可选）

2. **复制公钥**
   ```bash
   type %USERPROFILE%\.ssh\id_ed25519.pub
   ```
   复制输出的内容

3. **添加到 GitHub**
   - 访问：https://github.com/settings/keys
   - 点击 "New SSH key"
   - Title: 例如 "My Computer"
   - Key: 粘贴刚才复制的公钥
   - 点击 "Add SSH key"

4. **测试连接**
   ```bash
   ssh -T git@github.com
   ```
   应该看到：`Hi chenjunhan2333-svg! You've successfully authenticated...`

5. **更改远程地址为 SSH**
   ```bash
   git remote set-url origin git@github.com:chenjunhan2333-svg/first.git
   ```

6. **推送**
   ```bash
   git push origin main
   ```

### 方案 4: 检查网络和代理

#### 检查网络连接
```bash
ping github.com
```

#### 检查代理设置
```bash
# 查看当前代理设置
git config --global --get http.proxy
git config --global --get https.proxy

# 如果有代理，取消设置
git config --global --unset http.proxy
git config --global --unset https.proxy

# 或者设置正确的代理
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080
```

#### 增加超时和缓冲区
```bash
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 0
```

### 方案 5: 使用 GitHub Desktop

如果命令行推送一直失败，可以使用 GitHub Desktop：
1. 下载安装 GitHub Desktop
2. 登录你的 GitHub 账号
3. 打开项目仓库
4. 点击 "Push origin" 按钮

### 方案 6: 使用 GitHub CLI

如果安装了 GitHub CLI (`gh`)：
```bash
gh auth login
gh repo sync
```

## 快速诊断命令

```bash
# 检查远程仓库地址
git remote -v

# 检查 Git 配置
git config --list

# 测试 GitHub 连接
curl -I https://github.com

# 查看详细错误信息
GIT_CURL_VERBOSE=1 GIT_TRACE=1 git push origin main
```

## 常见问题

### Q: 为什么不能使用密码？
A: GitHub 从 2021 年 8 月起不再支持使用密码进行 Git 操作，必须使用 Personal Access Token 或 SSH。

### Q: Token 在哪里使用？
A: 在 Git 提示输入密码时，输入 token 而不是密码。

### Q: Token 会过期吗？
A: 可以设置过期时间。建议设置为较长时间（如 90 天或 1 年），或者设置为不过期（仅用于个人开发）。

### Q: 如何撤销 Token？
A: 访问 https://github.com/settings/tokens，找到对应的 token 并删除。

## 推荐配置

### 长期使用（推荐 SSH）
```bash
# 1. 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 添加公钥到 GitHub

# 3. 更改远程地址
git remote set-url origin git@github.com:chenjunhan2333-svg/first.git
```

### 临时使用（Token）
```bash
# 使用 Personal Access Token
git push origin main
# 用户名: chenjunhan2333-svg
# 密码: <你的 token>
```

## 联系支持

如果以上方法都无法解决，可以：
1. 检查 GitHub 状态：https://www.githubstatus.com/
2. 查看 GitHub 文档：https://docs.github.com/en/get-started
3. 联系 GitHub 支持

