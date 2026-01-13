# 前端测试指南

## 运行测试

### 方法一：使用测试脚本（推荐）

在 Windows 上，直接运行：

```bash
.\run_tests.bat
```

或者运行测试并生成覆盖率报告：

```bash
.\run_tests.bat coverage
```

或者运行测试 UI（交互式界面）：

```bash
.\run_tests.bat ui
```

### 方法二：使用 npm 脚本

1. **运行测试**：
   ```bash
   npm run test
   ```

2. **运行测试（单次运行，不监听）**：
   ```bash
   npm run test -- --run
   ```

3. **运行测试并生成覆盖率报告**：
   ```bash
   npm run test:coverage
   ```

4. **运行测试 UI（交互式界面）**：
   ```bash
   npm run test:ui
   ```

## 测试配置

测试使用 **Vitest** 作为测试框架，配置在 `vite.config.ts` 中：

- **测试环境**：jsdom（模拟浏览器环境）
- **覆盖率工具**：v8
- **覆盖率报告格式**：text、json、html

## 测试结构

```
frontend/
├── src/
│   ├── __tests__/
│   │   ├── setup.ts              # 测试设置（Element Plus 配置）
│   │   ├── api/
│   │   │   ├── auth.spec.ts      # 认证 API 测试
│   │   │   ├── users.spec.ts     # 用户管理 API 测试
│   │   │   └── request.spec.ts   # 请求拦截器测试
│   │   ├── stores/
│   │   │   └── auth.spec.ts      # 认证 Store 测试
│   │   ├── views/
│   │   │   ├── Dashboard.spec.ts # 仪表板测试
│   │   │   └── Users.spec.ts     # 用户管理页面测试
│   │   ├── Login.spec.ts         # 登录页面测试
│   │   └── Register.spec.ts      # 注册页面测试
│   └── ...
└── vite.config.ts                # Vite 和 Vitest 配置
```

## 测试覆盖率

当前测试覆盖率：**78.52%**

### 各模块覆盖率

- **API 模块**：89.39%
  - `auth.ts`: 100%
  - `users.ts`: 100%
  - `request.ts`: 81.57%

- **Views 模块**：92.31%
  - `Dashboard.vue`: 99.25%
  - `Login.vue`: 97.85%
  - `Register.vue`: 95.45%
  - `Users.vue`: 83.64%

- **Stores 模块**：82.14%

- **Router 模块**：81.13%

## 测试命令详解

### 基本测试命令

```bash
# 运行所有测试（监听模式，文件变化时自动重新运行）
npm run test

# 运行所有测试（单次运行）
npm run test -- --run

# 运行特定测试文件
npm run test -- src/__tests__/Login.spec.ts

# 运行匹配模式的测试
npm run test -- --grep "Login"
```

### 覆盖率命令

```bash
# 生成覆盖率报告
npm run test:coverage

# 生成覆盖率报告（单次运行）
npm run test:coverage -- --run

# 设置覆盖率阈值
npm run test:coverage -- --coverage.thresholds.lines=80
```

### 测试 UI

```bash
# 打开测试 UI（交互式界面）
npm run test:ui
```

测试 UI 提供了：
- 实时测试结果
- 测试文件浏览器
- 覆盖率可视化
- 测试日志查看

## 编写测试

### 基本测试示例

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('应该渲染组件', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.exists()).toBe(true)
  })
})
```

### Mock 示例

```typescript
import { vi } from 'vitest'

// Mock API
vi.mock('@/api/auth', () => ({
  login: vi.fn().mockResolvedValue({ access_token: 'token' }),
}))

// Mock Store
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    loginUser: vi.fn(),
  }),
}))
```

## 常见问题

### 测试找不到模块

**原因**：路径别名未配置或测试环境未正确设置。

**解决方法**：
1. 检查 `vite.config.ts` 中的 `resolve.alias` 配置
2. 确保 `src/__tests__/setup.ts` 正确配置了 Element Plus

### Element Plus 组件未渲染

**原因**：Element Plus 未在测试环境中正确注册。

**解决方法**：
- 测试设置文件 `src/__tests__/setup.ts` 已经配置了 Element Plus
- 确保测试使用 `mount` 而不是 `shallowMount`（如果需要完整渲染）

### 覆盖率不达标

**解决方法**：
1. 检查未覆盖的代码行
2. 添加相应的测试用例
3. 使用 `npm run test:coverage` 查看详细报告

### 测试运行缓慢

**解决方法**：
1. 使用 `--run` 参数单次运行测试（不监听文件变化）
2. 只运行特定测试文件
3. 检查是否有不必要的异步操作

## 测试最佳实践

1. **测试命名**：使用描述性的测试名称，说明测试的内容
2. **测试隔离**：每个测试应该独立，不依赖其他测试
3. **Mock 外部依赖**：Mock API 调用、路由、Store 等
4. **测试覆盖率**：优先覆盖核心功能和关键路径
5. **清理工作**：在 `beforeEach` 和 `afterEach` 中清理状态

## 查看覆盖率报告

运行 `npm run test:coverage` 后，覆盖率报告会生成在：

- **HTML 报告**：`coverage/index.html`（在浏览器中打开查看详细报告）
- **终端输出**：测试运行时的输出
- **JSON 报告**：`coverage/coverage-final.json`

打开 `coverage/index.html` 可以查看：
- 每个文件的覆盖率
- 未覆盖的代码行
- 分支覆盖率
- 函数覆盖率

