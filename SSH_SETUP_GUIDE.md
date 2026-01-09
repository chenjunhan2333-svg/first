# SSH 配置指南

## ✅ 步骤 1: SSH 密钥已生成

你的 SSH 密钥已经成功生成！

**公钥内容**（请复制下面的完整内容）：
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIxX4057dMcxiimFUvNmI9/BX43ggZENdB+dpXg/W25b chenjunhan2333@gmail.com
```

## 📋 步骤 2: 将公钥添加到 GitHub

1. **复制上面的公钥**（从 `ssh-ed25519` 开始到邮箱结束的整行）

2. **访问 GitHub 设置**
   - 打开：https://github.com/settings/keys
   - 或者：GitHub → Settings → SSH and GPG keys

3. **添加 SSH 密钥**
   - 点击 "New SSH key" 按钮
   - Title: 输入一个描述性名称，例如 "My Windows Computer" 或 "Lenovo Desktop"
   - Key: 粘贴刚才复制的公钥内容
   - Key type: 选择 "Authentication Key"
   - 点击 "Add SSH key"

4. **确认添加**
   - 可能需要输入 GitHub 密码确认

## ✅ 步骤 3: 测试 SSH 连接

添加完公钥后，运行以下命令测试连接：

```bash
ssh -T git@github.com
```

如果成功，你会看到类似这样的消息：
```
Hi chenjunhan2333-svg! You've successfully authenticated, but GitHub does not provide shell access.
```

## ✅ 步骤 4: 更改远程仓库地址为 SSH

运行以下命令：

```bash
git remote set-url origin git@github.com:chenjunhan2333-svg/first.git
```

## ✅ 步骤 5: 推送代码

```bash
git push origin main
```

现在应该可以成功推送了！

---

## 🔧 如果遇到问题

### 问题 1: "Permission denied (publickey)"
- 确认公钥已正确添加到 GitHub
- 确认使用的是正确的 GitHub 用户名
- 尝试重新添加公钥

### 问题 2: "Could not resolve hostname"
- 检查网络连接
- 确认可以访问 github.com

### 问题 3: SSH agent 问题
在 Windows 上，Git 通常会自动使用 SSH 密钥，不需要手动启动 agent。
如果遇到问题，可以尝试：
```bash
# 设置 SSH 配置文件
New-Item -ItemType Directory -Force -Path $env:USERPROFILE\.ssh
Add-Content -Path $env:USERPROFILE\.ssh\config -Value "Host github.com`n  HostName github.com`n  User git`n  IdentityFile ~/.ssh/id_ed25519"
```

---

## 📝 快速命令总结

```bash
# 1. 查看公钥（如果需要重新复制）
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub

# 2. 测试 SSH 连接
ssh -T git@github.com

# 3. 更改远程地址为 SSH
git remote set-url origin git@github.com:chenjunhan2333-svg/first.git

# 4. 验证远程地址
git remote -v

# 5. 推送代码
git push origin main
```

