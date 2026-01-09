# 项目结构图

本文档包含项目的整体结构、模块关系和技术栈关系图，使用 Mermaid 图表格式。

## 1. 整体项目结构

```mermaid
graph TB
    subgraph "项目根目录 (cjh)"
        A[README.md]
        B[CHANGELOG.md]
        C[docker-compose.yml]
        D[.github/]
        E[backend/]
        F[frontend/]
        G[docs/]
    end
    
    D --> D1[workflows/ci.yml]
    D --> D2[ISSUE_TEMPLATE/]
    
    E --> E1[app/]
    E --> E2[tests/]
    E --> E3[alembic/]
    E --> E4[requirements.txt]
    
    F --> F1[src/]
    F --> F2[package.json]
    F --> F3[vite.config.ts]
    
    G --> G1[REQUIREMENTS.md]
    G --> G2[TEST_PLAN.md]
    G --> G3[API.md]
    G --> G4[PROJECT_MANAGEMENT.md]
    
    style A fill:#e1f5ff
    style E fill:#fff9c4
    style F fill:#c8e6c9
    style G fill:#f3e5f5
```

## 2. 后端结构图

```mermaid
graph TB
    subgraph "backend/"
        A[app/]
        B[tests/]
        C[alembic/]
        D[scripts/]
        E[logs/]
    end
    
    subgraph "app/"
        A1[main.py<br/>应用入口]
        A2[api/]
        A3[core/]
        A4[models/]
        A5[schemas/]
    end
    
    subgraph "api/v1/"
        A2 --> A21[auth.py<br/>认证接口]
        A2 --> A22[users.py<br/>用户管理接口]
    end
    
    subgraph "core/"
        A3 --> A31[config.py<br/>配置管理]
        A3 --> A32[database.py<br/>数据库连接]
        A3 --> A33[security.py<br/>安全工具]
    end
    
    subgraph "models/"
        A4 --> A41[user.py<br/>用户模型]
    end
    
    subgraph "schemas/"
        A5 --> A51[user.py<br/>数据验证]
    end
    
    subgraph "tests/"
        B --> B1[conftest.py<br/>测试配置]
        B --> B2[test_auth.py<br/>认证测试]
        B --> B3[test_users.py<br/>用户管理测试]
    end
    
    A1 --> A2
    A1 --> A3
    A2 --> A4
    A2 --> A5
    A3 --> A4
    
    style A1 fill:#ffcdd2
    style A21 fill:#c8e6c9
    style A22 fill:#c8e6c9
    style A31 fill:#fff9c4
    style A32 fill:#fff9c4
    style A33 fill:#fff9c4
```

## 3. 前端结构图

```mermaid
graph TB
    subgraph "frontend/"
        A[src/]
        B[package.json]
        C[vite.config.ts]
    end
    
    subgraph "src/"
        A1[main.ts<br/>应用入口]
        A2[App.vue<br/>根组件]
        A3[api/]
        A4[views/]
        A5[stores/]
        A6[router/]
        A7[layouts/]
        A8[types/]
        A9[__tests__/]
    end
    
    subgraph "api/"
        A3 --> A31[request.ts<br/>请求封装]
        A3 --> A32[auth.ts<br/>认证API]
        A3 --> A33[users.ts<br/>用户API]
    end
    
    subgraph "views/"
        A4 --> A41[Login.vue<br/>登录页]
        A4 --> A42[Register.vue<br/>注册页]
        A4 --> A43[Dashboard.vue<br/>首页]
        A4 --> A44[Users.vue<br/>用户管理]
    end
    
    subgraph "stores/"
        A5 --> A51[auth.ts<br/>认证状态]
    end
    
    subgraph "router/"
        A6 --> A61[index.ts<br/>路由配置]
    end
    
    subgraph "layouts/"
        A7 --> A71[MainLayout.vue<br/>主布局]
    end
    
    subgraph "types/"
        A8 --> A81[user.ts<br/>类型定义]
    end
    
    subgraph "__tests__/"
        A9 --> A91[Login.spec.ts]
        A9 --> A92[Register.spec.ts]
        A9 --> A93[stores/auth.spec.ts]
    end
    
    A1 --> A2
    A1 --> A6
    A2 --> A7
    A7 --> A4
    A4 --> A3
    A4 --> A5
    A3 --> A31
    
    style A1 fill:#ffcdd2
    style A31 fill:#fff9c4
    style A41 fill:#c8e6c9
    style A42 fill:#c8e6c9
    style A43 fill:#c8e6c9
    style A44 fill:#c8e6c9
    style A51 fill:#e1f5ff
```

## 4. 数据流图

```mermaid
graph LR
    subgraph "前端 (Vue 3)"
        A[用户界面]
        B[组件]
        C[状态管理 Pinia]
        D[API调用]
    end
    
    subgraph "网络层"
        E[Axios拦截器]
        F[请求/响应处理]
    end
    
    subgraph "后端 (FastAPI)"
        G[路由层]
        H[业务逻辑]
        I[数据验证 Pydantic]
        J[安全验证]
    end
    
    subgraph "数据层"
        K[SQLAlchemy ORM]
        L[PostgreSQL数据库]
    end
    
    A --> B
    B --> C
    B --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    H --> J
    I --> K
    J --> K
    K --> L
    
    style A fill:#c8e6c9
    style G fill:#fff9c4
    style L fill:#f3e5f5
```

## 5. 模块依赖关系图

```mermaid
graph TD
    subgraph "后端模块"
        A[main.py]
        B[api/v1/auth.py]
        C[api/v1/users.py]
        D[core/security.py]
        E[core/database.py]
        F[core/config.py]
        G[models/user.py]
        H[schemas/user.py]
    end
    
    A --> B
    A --> C
    B --> D
    B --> G
    B --> H
    C --> D
    C --> G
    C --> H
    D --> F
    E --> F
    B --> E
    C --> E
    
    style A fill:#ffcdd2
    style D fill:#fff9c4
    style E fill:#fff9c4
    style G fill:#e1f5ff
    style H fill:#e1f5ff
```

## 6. 认证授权流程图

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant A as API路由
    participant S as Security模块
    participant D as 数据库
    
    Note over U,D: 登录流程
    U->>F: 输入用户名密码
    F->>A: POST /auth/login
    A->>D: 查询用户
    D-->>A: 返回用户数据
    A->>S: 验证密码
    S-->>A: 验证结果
    A->>S: 生成JWT Token
    S-->>A: 返回Token
    A-->>F: 返回Token
    F->>F: 保存Token
    
    Note over U,D: 访问受保护资源
    U->>F: 访问页面
    F->>F: 从localStorage获取Token
    F->>A: GET /users (带Token)
    A->>S: 验证Token
    S->>D: 查询用户
    D-->>S: 返回用户
    S->>S: 检查权限
    S-->>A: 返回用户对象
    A->>D: 查询数据
    D-->>A: 返回数据
    A-->>F: 返回结果
    F-->>U: 显示数据
```

## 7. 测试结构图

```mermaid
graph TB
    subgraph "测试架构"
        A[CI/CD Pipeline]
        B[后端测试]
        C[前端测试]
        D[代码质量检查]
        E[安全扫描]
    end
    
    subgraph "后端测试"
        B --> B1[单元测试<br/>pytest]
        B --> B2[集成测试]
        B --> B3[覆盖率报告]
    end
    
    subgraph "前端测试"
        C --> C1[组件测试<br/>Vitest]
        C --> C2[状态管理测试]
        C --> C3[覆盖率报告]
    end
    
    subgraph "代码质量"
        D --> D1[Black格式化]
        D --> D2[Flake8检查]
        D --> D3[ESLint检查]
        D --> D4[TypeScript检查]
    end
    
    subgraph "安全扫描"
        E --> E1[Bandit扫描]
        E --> E2[pip-audit]
        E --> E3[npm audit]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    
    style A fill:#ffcdd2
    style B1 fill:#c8e6c9
    style C1 fill:#c8e6c9
```

## 8. 部署架构图

```mermaid
graph TB
    subgraph "开发环境"
        A[开发者]
        B[本地前端<br/>Vite Dev Server]
        C[本地后端<br/>Uvicorn]
        D[本地数据库<br/>PostgreSQL]
    end
    
    subgraph "生产环境"
        E[用户]
        F[Nginx<br/>反向代理]
        G[前端构建<br/>静态文件]
        H[后端服务<br/>FastAPI]
        I[生产数据库<br/>PostgreSQL]
    end
    
    subgraph "CI/CD"
        J[GitHub Actions]
        K[自动化测试]
        L[自动化部署]
    end
    
    A --> B
    A --> C
    C --> D
    
    E --> F
    F --> G
    F --> H
    H --> I
    
    J --> K
    K --> L
    L --> G
    L --> H
    
    style A fill:#e1f5ff
    style E fill:#c8e6c9
    style J fill:#fff9c4
```

## 9. 技术栈关系图

```mermaid
graph TB
    subgraph "前端技术栈"
        A[Vue 3]
        B[TypeScript]
        C[Element Plus]
        D[Pinia]
        E[Vue Router]
        F[Axios]
        G[Vitest]
    end
    
    subgraph "后端技术栈"
        H[FastAPI]
        I[Python 3.12]
        J[SQLAlchemy]
        K[PostgreSQL]
        L[Alembic]
        M[Pydantic]
        N[JWT]
        O[pytest]
    end
    
    subgraph "开发工具"
        P[Docker]
        Q[Git]
        R[GitHub Actions]
        S[Black/Flake8]
        T[ESLint/Prettier]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    
    H --> I
    H --> J
    H --> M
    J --> K
    J --> L
    H --> N
    I --> O
    
    P --> H
    P --> K
    Q --> R
    I --> S
    B --> T
    
    style A fill:#c8e6c9
    style H fill:#fff9c4
    style K fill:#f3e5f5
    style R fill:#ffcdd2
```

## 10. 目录树结构（文本格式）

```
cjh/
├── .github/                    # GitHub配置
│   ├── workflows/              # CI/CD工作流
│   │   └── ci.yml             # 持续集成配置
│   └── ISSUE_TEMPLATE/        # Issue模板
│       ├── bug_report.md
│       └── feature_request.md
│
├── backend/                    # 后端代码
│   ├── app/                    # 应用主目录
│   │   ├── api/               # API路由
│   │   │   └── v1/
│   │   │       ├── auth.py    # 认证接口
│   │   │       └── users.py   # 用户管理接口
│   │   ├── core/              # 核心功能
│   │   │   ├── config.py     # 配置管理
│   │   │   ├── database.py   # 数据库连接
│   │   │   └── security.py   # 安全工具
│   │   ├── models/            # 数据模型
│   │   │   └── user.py       # 用户模型
│   │   ├── schemas/           # 数据验证
│   │   │   └── user.py       # 用户验证
│   │   └── main.py            # 应用入口
│   ├── tests/                 # 测试代码
│   │   ├── conftest.py       # 测试配置
│   │   ├── test_auth.py      # 认证测试
│   │   └── test_users.py     # 用户管理测试
│   ├── alembic/               # 数据库迁移
│   │   ├── versions/         # 迁移版本
│   │   └── env.py            # 迁移环境
│   ├── scripts/               # 工具脚本
│   │   └── init_db.py        # 数据库初始化
│   ├── logs/                  # 日志文件
│   ├── requirements.txt       # Python依赖
│   └── Dockerfile             # Docker配置
│
├── frontend/                   # 前端代码
│   ├── src/                   # 源代码
│   │   ├── api/              # API调用
│   │   │   ├── request.ts    # 请求封装
│   │   │   ├── auth.ts       # 认证API
│   │   │   └── users.ts      # 用户API
│   │   ├── views/            # 页面组件
│   │   │   ├── Login.vue     # 登录页
│   │   │   ├── Register.vue  # 注册页
│   │   │   ├── Dashboard.vue # 首页
│   │   │   └── Users.vue     # 用户管理
│   │   ├── stores/           # 状态管理
│   │   │   └── auth.ts       # 认证状态
│   │   ├── router/           # 路由配置
│   │   │   └── index.ts      # 路由定义
│   │   ├── layouts/          # 布局组件
│   │   │   └── MainLayout.vue
│   │   ├── types/            # 类型定义
│   │   │   └── user.ts
│   │   ├── __tests__/        # 测试文件
│   │   │   ├── Login.spec.ts
│   │   │   ├── Register.spec.ts
│   │   │   └── stores/
│   │   ├── App.vue            # 根组件
│   │   └── main.ts           # 入口文件
│   ├── package.json          # 项目配置
│   └── vite.config.ts        # Vite配置
│
├── docs/                      # 项目文档
│   ├── REQUIREMENTS.md       # 需求文档
│   ├── TEST_PLAN.md         # 测试计划
│   ├── API.md               # API文档
│   ├── DEPLOYMENT.md        # 部署文档
│   ├── PROJECT_MANAGEMENT.md # 项目管理
│   ├── USER_FLOW_DIAGRAMS.md # 用户流程图
│   └── PROJECT_STRUCTURE.md # 项目结构图
│
├── docker-compose.yml         # Docker编排
├── README.md                  # 项目说明
└── CHANGELOG.md              # 更新日志
```

## 11. 路由结构图

```mermaid
graph TD
    A[应用入口] --> B{路由守卫}
    B -->|未登录| C[/login 登录页]
    B -->|已登录| D[主布局]
    
    C --> E[/register 注册页]
    E --> C
    
    D --> F[/ 首页 Dashboard]
    D --> G[/users 用户管理]
    
    G -->|管理员| H[显示用户列表]
    G -->|普通用户| I[跳转到首页]
    
    H --> J[创建用户]
    H --> K[删除用户]
    H --> L[查看统计]
    
    style C fill:#fff9c4
    style E fill:#fff9c4
    style F fill:#c8e6c9
    style H fill:#c8e6c9
    style I fill:#ffcdd2
```

## 12. 状态管理结构图

```mermaid
graph TB
    A[Pinia Store] --> B[auth Store]
    
    B --> C[token: string | null]
    B --> D[user: User | null]
    B --> E[isAuthenticated: computed]
    B --> F[loginUser: function]
    B --> G[fetchUserInfo: function]
    B --> H[logout: function]
    
    F --> I[调用 login API]
    I --> J[保存 Token]
    J --> G
    
    G --> K[调用 getCurrentUser API]
    K --> D
    
    H --> L[清除 Token]
    H --> M[清除 User]
    
    style B fill:#e1f5ff
    style C fill:#fff9c4
    style D fill:#fff9c4
    style E fill:#c8e6c9
```

## 图表说明

### 颜色含义
- **蓝色 (#e1f5ff)**: 入口或核心模块
- **绿色 (#c8e6c9)**: 功能模块或成功状态
- **黄色 (#fff9c4)**: 配置或工具模块
- **红色 (#ffcdd2)**: 错误处理或异常流程
- **紫色 (#f3e5f5)**: 数据存储或数据库

### 查看方式
1. **GitHub/GitLab**: 直接查看，Mermaid图表会自动渲染
2. **VS Code**: 安装 "Markdown Preview Mermaid Support" 扩展
3. **在线查看**: 访问 https://mermaid.live/ 粘贴代码查看
4. **导出图片**: 使用 mermaid-cli 或在线工具导出为 PNG/SVG

### 更新说明
- 项目结构会根据实际代码更新而更新
- 新增模块时请在此文档中添加相应图表
- 保持图表与实际代码结构一致



