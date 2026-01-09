# 项目管理文档

## 1. 分支策略

### 1.1 分支命名规范
- `main`：主分支，生产环境代码，只接受来自 `release` 或 `hotfix` 的合并
- `develop`：开发分支，集成所有功能，日常开发的主分支
- `feature/功能名称`：功能开发分支，从 `develop` 创建，完成后合并回 `develop`
- `bugfix/问题描述`：Bug修复分支，从 `develop` 创建，完成后合并回 `develop`
- `hotfix/问题描述`：紧急修复分支，从 `main` 创建，完成后合并回 `main` 和 `develop`
- `release/版本号`：发布准备分支，从 `develop` 创建，用于版本发布前的测试和修复

### 1.2 分支工作流

```
main (生产环境)
  ↑
  | (合并)
release/v1.0.0
  ↑
  | (合并)
develop (开发环境)
  ↑
  | (合并)
feature/user-management
```

### 1.3 分支创建规则
1. 从 `develop` 创建功能分支：`git checkout -b feature/功能名称 develop`
2. 功能完成后合并到 `develop`：通过 Pull Request 合并
3. 发布时从 `develop` 创建 `release` 分支
4. 紧急修复从 `main` 创建 `hotfix` 分支

### 1.4 分支保护规则
- `main` 分支：必须通过 Pull Request 合并，至少需要 1 个代码审查
- `develop` 分支：必须通过 Pull Request 合并，CI 必须通过
- 禁止直接推送到 `main` 和 `develop` 分支

## 2. 代码评审规则

### 2.1 Pull Request 要求
1. **标题规范**：使用 Conventional Commits 格式
   - `feat: 添加用户注册功能`
   - `fix: 修复登录验证问题`
   - `docs: 更新 API 文档`
   - `style: 代码格式调整`
   - `refactor: 重构用户管理模块`
   - `test: 添加用户注册测试用例`
   - `chore: 更新依赖版本`

2. **描述要求**：
   - 清晰描述变更内容
   - 说明变更原因
   - 列出相关 Issue
   - 添加测试说明

3. **代码要求**：
   - 所有 CI 检查必须通过
   - 代码覆盖率不能降低
   - 通过所有静态代码分析检查
   - 无安全漏洞警告

### 2.2 代码审查检查清单
- [ ] 代码符合项目编码规范
- [ ] 代码逻辑正确，无明显的 bug
- [ ] 添加了必要的测试用例
- [ ] 更新了相关文档
- [ ] 无安全漏洞
- [ ] 性能影响可接受
- [ ] 向后兼容性（如适用）

### 2.3 审查流程
1. 创建 Pull Request
2. 自动触发 CI 检查
3. 至少 1 位团队成员审查代码
4. 根据审查意见修改代码
5. 审查通过后合并

## 3. 合并策略

### 3.1 合并方式
- **Squash and Merge**：功能分支合并到 `develop` 时使用，保持提交历史整洁
- **Merge Commit**：`release` 和 `hotfix` 合并到 `main` 时使用，保留完整历史
- **Rebase and Merge**：不推荐，除非特殊情况

### 3.2 合并时机
- 功能完成并通过测试
- 代码审查通过
- CI 检查全部通过
- 无冲突或已解决冲突

### 3.3 合并后操作
- 删除已合并的分支
- 更新相关 Issue 状态
- 通知相关人员

## 4. 提交信息规范（Conventional Commits）

### 4.1 格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 4.2 类型（type）
- `feat`：新功能
- `fix`：修复 bug
- `docs`：文档变更
- `style`：代码格式（不影响代码运行）
- `refactor`：重构（既不是新功能也不是 bug 修复）
- `perf`：性能优化
- `test`：测试相关
- `chore`：构建过程或辅助工具的变动

### 4.3 示例
```
feat(auth): 添加用户注册功能

- 实现用户注册 API 端点
- 添加邮箱验证
- 添加密码强度检查

Closes #123
```

## 5. GitHub Projects 使用

### 5.1 看板结构
- **待办（To Do）**：计划开发的功能
- **进行中（In Progress）**：正在开发的功能
- **代码审查（Review）**：等待审查的 PR
- **测试中（Testing）**：正在测试的功能
- **完成（Done）**：已完成的功能

### 5.2 Milestones 使用
- 每个版本创建一个 Milestone
- 将相关 Issue 和 PR 关联到 Milestone
- 定期更新 Milestone 进度

## 6. 版本管理

### 6.1 版本号规范（Semantic Versioning）
- **主版本号（MAJOR）**：不兼容的 API 修改
- **次版本号（MINOR）**：向下兼容的功能性新增
- **修订号（PATCH）**：向下兼容的问题修正

### 6.2 版本发布流程
1. 创建 `release/v版本号` 分支
2. 更新版本号和 CHANGELOG
3. 进行发布前测试
4. 创建 Release Tag
5. 合并到 `main` 和 `develop`
6. 部署到生产环境

## 7. 沟通规范

### 7.1 Issue 使用
- 使用 Issue 跟踪 bug 和功能请求
- 使用标签分类 Issue
- 及时更新 Issue 状态

### 7.2 讨论区使用
- 技术讨论使用 Discussions
- 问题咨询使用 Discussions
- 重要决策记录在 Discussions

## 8. 文档维护

### 8.1 文档更新要求
- 代码变更时同步更新相关文档
- API 变更必须更新 API 文档
- 重要功能变更更新 README

### 8.2 文档审查
- 文档变更也需要代码审查
- 确保文档准确性和完整性

