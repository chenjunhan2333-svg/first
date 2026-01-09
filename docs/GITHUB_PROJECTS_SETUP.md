# GitHub Projects 和 Milestones 设置指南

本指南将帮助你如何在 GitHub 上创建 Projects（看板）和 Milestones（里程碑），用于项目管理。

## 一、创建 GitHub Project（看板）

### 步骤 1：进入 Projects 页面

1. 打开你的 GitHub 仓库：https://github.com/chenjunhan2333-svg/first
2. 点击仓库顶部的 **"Projects"** 标签
3. 或者直接访问：https://github.com/chenjunhan2333-svg/first/projects

### 步骤 2：创建新 Project

1. 点击 **"New project"** 按钮
2. 选择 **"New project"**（不是 "New board"）
3. 输入项目名称，例如：**"用户认证与权限管理系统"**
4. 选择项目模板：
   - **推荐**：选择 "Board"（看板视图）
   - 或者选择 "Table"（表格视图）
5. 点击 **"Create"**

### 步骤 3：配置看板列

根据项目需求，设置以下列：

#### 推荐列结构：

1. **待办（To Do）**
   - 计划开发的功能和任务
   - 状态：未开始

2. **进行中（In Progress）**
   - 正在开发的功能
   - 状态：开发中

3. **代码审查（Review）**
   - 等待审查的代码
   - 状态：待审查

4. **测试中（Testing）**
   - 正在测试的功能
   - 状态：测试中

5. **完成（Done）**
   - 已完成的功能
   - 状态：已完成

#### 添加列的方法：

1. 在 Project 页面，点击右侧的 **"+"** 按钮
2. 选择 **"New column"**
3. 输入列名称
4. 重复添加其他列

### 步骤 4：添加 Issue 和 Pull Request

#### 方法 1：从 Issue 添加

1. 打开一个 Issue
2. 在右侧边栏找到 **"Projects"**
3. 选择你的 Project
4. Issue 会自动添加到 "To Do" 列

#### 方法 2：从 Project 添加

1. 在 Project 页面，点击 **"Add item"**
2. 选择 **"Create issue"** 或选择已有的 Issue/PR
3. 填写 Issue 信息
4. Issue 会自动添加到 Project

#### 方法 3：使用 Issue 模板

1. 在仓库中点击 **"Issues"** → **"New issue"**
2. 使用 Issue 模板创建 Issue
3. 在 Issue 页面关联到 Project

### 步骤 5：移动卡片

1. 在 Project 看板中，找到要移动的卡片（Issue 或 PR）
2. 拖拽卡片到目标列
3. 卡片状态会自动更新

## 二、创建 Milestones（里程碑）

### 步骤 1：进入 Milestones 页面

1. 打开你的 GitHub 仓库
2. 点击 **"Issues"** 标签
3. 点击 **"Milestones"** 链接
4. 或者直接访问：https://github.com/chenjunhan2333-svg/first/milestones

### 步骤 2：创建新 Milestone

1. 点击 **"New milestone"** 按钮
2. 填写 Milestone 信息：

#### Milestone 信息示例：

**Title（标题）**：
- `v1.0.0 - 基础功能开发`
- `v1.1.0 - 功能增强`
- `v1.2.0 - 高级功能`

**Description（描述）**：
```
v1.0.0 版本目标：
- 用户注册和登录功能
- 用户管理功能（管理员）
- 权限控制实现
- 前端页面开发
- 基础测试完成
```

**Due date（截止日期）**：
- 选择预计完成日期

3. 点击 **"Create milestone"**

### 步骤 3：关联 Issue 到 Milestone

#### 方法 1：在 Issue 页面关联

1. 打开一个 Issue
2. 在右侧边栏找到 **"Milestone"**
3. 点击下拉菜单，选择对应的 Milestone
4. Issue 会自动关联到 Milestone

#### 方法 2：批量关联

1. 在 Issues 列表页面
2. 勾选多个 Issue
3. 点击上方的 **"Milestone"** 按钮
4. 选择要关联的 Milestone

### 步骤 4：查看 Milestone 进度

1. 在 Milestones 页面
2. 点击一个 Milestone
3. 可以看到：
   - 关联的 Issue 列表
   - 完成进度百分比
   - 已关闭和开放的 Issue 数量

## 三、推荐的 Milestones

根据项目规划，建议创建以下 Milestones：

### Milestone 1: v1.0.0 - 基础功能开发

**截止日期**：2024-01-15  
**目标**：
- ✅ 用户注册功能
- ✅ 用户登录功能
- ✅ JWT 认证实现
- ✅ 用户管理功能（管理员）
- ✅ 权限控制实现
- ✅ 前端页面开发
- ✅ API 文档编写
- ✅ 单元测试编写

**关联 Issue**：
- 创建相关的 Issue 并关联到此 Milestone

### Milestone 2: v1.1.0 - 功能增强

**截止日期**：2024-02-01  
**目标**：
- 用户资料管理
- 密码重置功能
- 邮箱验证
- 用户活动日志
- 性能优化

### Milestone 3: v1.2.0 - 高级功能

**截止日期**：2024-03-01  
**目标**：
- 角色管理
- 权限管理
- 审计日志
- 数据导出

## 四、Project 和 Milestone 的配合使用

### 工作流程

1. **创建 Issue**
   - 使用 Issue 模板创建功能请求或 Bug 报告
   - 关联到对应的 Milestone

2. **添加到 Project**
   - 将 Issue 添加到 Project 的 "To Do" 列
   - 开始开发时，移动到 "In Progress" 列

3. **创建 Pull Request**
   - 开发完成后创建 PR
   - PR 会自动关联到相关的 Issue
   - 将 PR 添加到 Project 的 "Review" 列

4. **代码审查**
   - 审查通过后，移动到 "Testing" 列
   - 测试通过后，移动到 "Done" 列

5. **关闭 Issue**
   - PR 合并后，关联的 Issue 会自动关闭
   - Milestone 的进度会自动更新

## 五、最佳实践

### Project 管理

1. **定期更新**
   - 每天更新卡片状态
   - 及时移动已完成的任务

2. **使用标签**
   - 为 Issue 添加标签（bug, enhancement, feature 等）
   - 方便筛选和分类

3. **添加描述**
   - 为每个卡片添加详细描述
   - 包含验收标准

### Milestone 管理

1. **合理设置截止日期**
   - 根据实际开发进度调整
   - 不要设置过于紧张的截止日期

2. **定期检查进度**
   - 每周检查 Milestone 进度
   - 及时调整计划

3. **及时关闭 Milestone**
   - 所有 Issue 完成后，关闭 Milestone
   - 创建新的 Milestone 用于下一阶段

## 六、快速操作清单

### 创建 Project

- [ ] 进入 Projects 页面
- [ ] 创建新 Project（Board 视图）
- [ ] 设置列：待办、进行中、代码审查、测试中、完成
- [ ] 添加第一个 Issue 到 Project

### 创建 Milestones

- [ ] 进入 Milestones 页面
- [ ] 创建 v1.0.0 Milestone
- [ ] 创建 v1.1.0 Milestone
- [ ] 创建 v1.2.0 Milestone
- [ ] 为每个 Milestone 设置描述和截止日期

### 关联 Issue

- [ ] 创建或选择 Issue
- [ ] 关联到对应的 Milestone
- [ ] 添加到 Project
- [ ] 设置合适的标签

## 七、参考文档

- GitHub Projects 文档：https://docs.github.com/en/issues/planning-and-tracking-with-projects
- GitHub Milestones 文档：https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work
- 项目进度计划：`docs/PROJECT_SCHEDULE.md`
- 版本发布规划：`docs/RELEASE_PLAN.md`

## 八、常见问题

### Q: 如何删除 Project？
A: 在 Project 设置中，滚动到底部，点击 "Delete project"。

### Q: 如何删除 Milestone？
A: 在 Milestone 页面，点击 Milestone，然后点击 "Delete milestone"。

### Q: 如何批量移动 Issue？
A: 在 Issues 列表页面，勾选多个 Issue，然后使用顶部的操作按钮批量操作。

### Q: Project 和 Milestone 有什么区别？
A: 
- **Project**：用于任务管理和工作流跟踪（看板视图）
- **Milestone**：用于版本规划和进度跟踪（时间视图）

---

**创建日期**：2024-01-09  
**最后更新**：2024-01-09

