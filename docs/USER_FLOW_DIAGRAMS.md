# 用户流程图

本文档包含系统的各种用户流程图，使用 Mermaid 图表格式，可在 GitHub/GitLab 等平台自动渲染。

## 1. 用户注册流程

```mermaid
flowchart TD
    A[访问注册页面] --> B[填写注册表单]
    B --> C{表单验证}
    C -->|验证失败| D[显示错误信息]
    D --> B
    C -->|验证通过| E[提交注册请求]
    E --> F{检查用户名/邮箱}
    F -->|已存在| G[返回错误信息]
    G --> B
    F -->|不存在| H[创建用户账号]
    H --> I[返回成功信息]
    I --> J[跳转到登录页面]
    
    style A fill:#e1f5ff
    style J fill:#c8e6c9
    style G fill:#ffcdd2
```

## 2. 用户登录流程

```mermaid
flowchart TD
    A[访问登录页面] --> B[输入用户名和密码]
    B --> C{表单验证}
    C -->|验证失败| D[显示错误信息]
    D --> B
    C -->|验证通过| E[提交登录请求]
    E --> F{验证用户信息}
    F -->|用户名/密码错误| G[返回401错误]
    G --> B
    F -->|用户被禁用| H[返回403错误]
    H --> B
    F -->|验证成功| I[生成JWT Token]
    I --> J[保存Token到本地存储]
    J --> K[获取用户信息]
    K --> L[跳转到首页]
    
    style A fill:#e1f5ff
    style L fill:#c8e6c9
    style G fill:#ffcdd2
    style H fill:#ffcdd2
```

## 3. 用户访问受保护页面流程

```mermaid
flowchart TD
    A[用户访问页面] --> B{检查Token}
    B -->|无Token| C[跳转到登录页]
    B -->|有Token| D{验证Token}
    D -->|Token无效| E[清除Token]
    E --> C
    D -->|Token有效| F{检查页面权限}
    F -->|需要管理员权限| G{用户是管理员?}
    G -->|否| H[跳转到首页]
    G -->|是| I[显示页面]
    F -->|普通用户可访问| I
    
    style A fill:#e1f5ff
    style I fill:#c8e6c9
    style C fill:#fff9c4
    style H fill:#fff9c4
```

## 4. 管理员用户管理流程

```mermaid
flowchart TD
    A[管理员登录] --> B[访问用户管理页面]
    B --> C{选择操作}
    C -->|创建用户| D[打开创建对话框]
    D --> E[填写用户信息]
    E --> F{表单验证}
    F -->|失败| G[显示错误]
    G --> E
    F -->|成功| H[提交创建请求]
    H --> I{检查权限}
    I -->|非管理员| J[返回403错误]
    I -->|管理员| K{检查用户名/邮箱}
    K -->|已存在| L[返回错误]
    L --> E
    K -->|不存在| M[创建用户]
    M --> N[刷新用户列表]
    
    C -->|删除用户| O[点击删除按钮]
    O --> P[显示确认对话框]
    P --> Q{用户确认}
    Q -->|取消| B
    Q -->|确认| R{检查删除权限}
    R -->|不能删除管理员| S[返回错误]
    R -->|不能删除自己| S
    R -->|可以删除| T[删除用户]
    T --> N
    
    C -->|查看用户列表| U[加载用户列表]
    U --> V[显示用户信息]
    
    style A fill:#e1f5ff
    style N fill:#c8e6c9
    style J fill:#ffcdd2
    style S fill:#ffcdd2
```

## 5. 完整用户旅程图

```mermaid
stateDiagram-v2
    [*] --> 未注册用户
    未注册用户 --> 注册页面: 点击注册
    注册页面 --> 注册成功: 提交表单
    注册成功 --> 登录页面: 自动跳转
    未注册用户 --> 登录页面: 点击登录
    登录页面 --> 登录成功: 验证通过
    登录成功 --> 首页: 跳转
    首页 --> 用户管理: 管理员访问
    首页 --> 查看统计: 查看数据
    用户管理 --> 创建用户: 点击创建
    用户管理 --> 删除用户: 点击删除
    用户管理 --> 首页: 返回
    首页 --> 登录页面: Token过期
    登录页面 --> [*]: 退出
```

## 6. API请求流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant I as 拦截器
    participant B as 后端API
    participant D as 数据库
    participant S as 安全模块
    
    U->>F: 输入用户名密码
    F->>I: 发送登录请求
    I->>B: POST /api/v1/auth/login
    B->>D: 查询用户
    D-->>B: 返回用户数据
    B->>S: 验证密码
    S-->>B: 验证结果
    B->>S: 生成JWT Token
    S-->>B: 返回Token
    B-->>F: 返回Token
    F->>F: 保存Token到localStorage
    F->>I: 获取用户信息
    I->>I: 添加Authorization头
    I->>B: GET /api/v1/auth/me
    B->>S: 验证Token
    S-->>B: 用户信息
    B->>D: 查询用户详情
    D-->>B: 返回用户数据
    B-->>F: 返回用户信息
    F-->>U: 显示首页
```

## 7. 权限控制流程

```mermaid
flowchart TD
    A[用户请求] --> B{Token存在?}
    B -->|否| C[返回401]
    B -->|是| D[验证Token]
    D -->|无效| C
    D -->|有效| E{获取用户信息}
    E -->|失败| C
    E -->|成功| F{检查用户状态}
    F -->|已禁用| G[返回403]
    F -->|正常| H{检查路由权限}
    H -->|需要管理员| I{用户是管理员?}
    I -->|否| J[返回403或跳转]
    I -->|是| K[允许访问]
    H -->|普通用户可访问| K
    K --> L[执行请求]
    
    style A fill:#e1f5ff
    style K fill:#c8e6c9
    style C fill:#ffcdd2
    style G fill:#ffcdd2
    style J fill:#ffcdd2
```

## 8. 错误处理流程

```mermaid
flowchart TD
    A[API请求] --> B{请求成功?}
    B -->|是| C[返回数据]
    B -->|否| D{错误类型}
    D -->|401未授权| E[清除Token]
    E --> F[跳转登录页]
    D -->|403禁止访问| G[显示权限错误]
    D -->|404未找到| H[显示资源不存在]
    D -->|400请求错误| I[显示错误详情]
    D -->|500服务器错误| J[显示服务器错误]
    D -->|网络错误| K[显示连接失败]
    
    style A fill:#e1f5ff
    style C fill:#c8e6c9
    style F fill:#fff9c4
    style G fill:#ffcdd2
    style H fill:#ffcdd2
    style I fill:#ffcdd2
    style J fill:#ffcdd2
    style K fill:#ffcdd2
```

## 9. Token刷新流程

```mermaid
flowchart TD
    A[用户操作] --> B[发送API请求]
    B --> C{Token是否过期?}
    C -->|未过期| D[正常处理请求]
    C -->|已过期| E[拦截器捕获401]
    E --> F[清除本地Token]
    F --> G[清除用户状态]
    G --> H[显示登录过期提示]
    H --> I[跳转到登录页]
    I --> J[用户重新登录]
    J --> K[获取新Token]
    K --> L[保存新Token]
    L --> M[继续原操作]
    
    style A fill:#e1f5ff
    style D fill:#c8e6c9
    style I fill:#fff9c4
    style E fill:#ffcdd2
```

## 10. 数据同步流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant C as 组件
    participant S as Store
    participant A as API
    participant B as 后端
    participant D as 数据库
    
    U->>C: 触发操作
    C->>S: 调用Action
    S->>A: 发送请求
    A->>B: HTTP请求
    B->>D: 数据库操作
    D-->>B: 返回结果
    B-->>A: 返回数据
    A-->>S: 更新State
    S-->>C: 响应式更新
    C-->>U: 界面更新
```

## 图表说明

### 颜色含义
- **蓝色 (#e1f5ff)**: 起始节点或用户操作
- **绿色 (#c8e6c9)**: 成功状态或正常流程
- **黄色 (#fff9c4)**: 警告或跳转状态
- **红色 (#ffcdd2)**: 错误状态或异常流程

### 查看方式
1. **GitHub/GitLab**: 直接查看，Mermaid图表会自动渲染
2. **VS Code**: 安装 "Markdown Preview Mermaid Support" 扩展
3. **在线查看**: 访问 https://mermaid.live/ 粘贴代码查看
4. **导出图片**: 使用 mermaid-cli 或在线工具导出为 PNG/SVG

### 更新说明
- 流程图会根据系统功能更新而更新
- 如有新的用户流程，请在此文档中添加
- 保持流程图与实际代码逻辑一致



