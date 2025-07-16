# ThinCell 视频播放器

一个基于 Vue 3 + TypeScript + Vite 构建的现代化视频播放器应用。

## 🚀 特性

- **现代化技术栈**: Vue 3 + TypeScript + Vite + Pinia
- **响应式设计**: 支持移动端和桌面端
- **视频播放**: 基于 ArtPlayer 的强大视频播放功能
- **用户认证**: 完整的登录、注册、密码重置流程
- **状态管理**: 使用 Pinia 进行状态管理
- **路由管理**: Vue Router 4 路由管理
- **UI 组件**: Element Plus 组件库
- **代码规范**: ESLint + Prettier 代码格式化
- **性能监控**: 内置性能监控工具
- **错误处理**: 全局错误边界和错误处理
- **类型安全**: 完整的 TypeScript 类型定义

## 📦 技术栈

### 核心框架
- **Vue 3.3.11** - 渐进式 JavaScript 框架
- **TypeScript 5.3.3** - JavaScript 的超集
- **Vite 5.0.7** - 下一代前端构建工具

### 状态管理
- **Pinia 2.1.7** - Vue 的状态管理库

### 路由
- **Vue Router 4.5.1** - Vue.js 官方路由管理器

### UI 组件
- **Element Plus 2.4.3** - Vue 3 组件库
- **@element-plus/icons-vue 2.3.1** - Element Plus 图标

### 视频播放
- **ArtPlayer 4.6.0** - 现代视频播放器
- **HLS.js 1.4.12** - HLS 流媒体播放
- **artplayer-plugin-vtt-thumbnail 1.0.3** - VTT 缩略图插件

### 工具库
- **Axios 1.6.2** - HTTP 客户端
- **Lodash 4.17.21** - JavaScript 工具库
- **@vueuse/core 10.7.0** - Vue 组合式 API 工具集
- **Swiper 11.2.8** - 移动端滑动组件

### 开发工具
- **ESLint 8.55.0** - 代码检查工具
- **Prettier 3.1.0** - 代码格式化工具
- **Sass 1.69.5** - CSS 预处理器
- **Vitest 1.0.4** - 单元测试框架

## 🛠️ 开发环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0

## 📦 安装和运行

### 1. 克隆项目

```bash
git clone <repository-url>
cd thincell-video-view
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

复制环境变量示例文件：

```bash
cp env.example .env
```

编辑 `.env` 文件，配置必要的环境变量：

```env
# API配置
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=ThinCell视频播放器
VITE_APP_VERSION=1.0.0

# 开发环境配置
VITE_DEV_MODE=true
VITE_ENABLE_MOCK=true

# 生产环境配置
VITE_ENABLE_ANALYTICS=false
VITE_SENTRY_DSN=

# 第三方服务配置
VITE_OSS_BASE_URL=https://earth-blogs.oss-cn-beijing.aliyuncs.com
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 📜 可用脚本

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run build:preview    # 构建预览版本
npm run preview          # 预览构建结果

# 代码质量
npm run lint             # 运行 ESLint 检查并自动修复
npm run lint:check       # 仅检查代码，不自动修复
npm run format           # 格式化代码
npm run format:check     # 检查代码格式
npm run type-check       # TypeScript 类型检查

# 测试
npm run test             # 运行单元测试
npm run test:ui          # 运行测试 UI
npm run test:coverage    # 生成测试覆盖率报告

# Git 相关
npm run commit           # 使用 commitizen 提交代码
npm run release          # 发布新版本
```

## 🏗️ 项目结构

```
thincell-video-view/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   │   ├── authApi.ts     # 认证相关 API
│   │   ├── videoApi.ts    # 视频相关 API
│   │   ├── searchApi.ts   # 搜索相关 API
│   │   ├── types.ts       # API 类型定义
│   │   └── index.ts       # API 模块入口
│   ├── assets/            # 静态资源
│   │   ├── images/        # 图片资源
│   │   └── styles/        # 样式文件
│   │       ├── global.scss    # 全局样式
│   │       ├── variables.scss # 样式变量
│   │       └── mixins/        # 样式混入
│   ├── components/        # 组件
│   │   ├── common/        # 通用组件
│   │   ├── global/        # 全局组件
│   │   ├── layout/        # 布局组件
│   │   ├── player/        # 播放器组件
│   │   ├── profile/       # 用户相关组件
│   │   ├── search/        # 搜索相关组件
│   │   ├── splash/        # 启动页组件
│   │   └── index.ts       # 组件统一导出
│   ├── constants/         # 常量定义
│   │   └── index.ts       # 项目常量
│   ├── directives/        # 自定义指令
│   ├── plugins/           # 插件
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── test/              # 测试配置
│   │   └── setup.ts       # 测试设置
│   ├── types/             # 类型定义
│   ├── utils/             # 工具函数
│   │   ├── http.ts        # HTTP 请求工具
│   │   ├── format.ts      # 格式化工具
│   │   ├── performance.ts # 性能监控工具
│   │   └── index.ts       # 工具函数统一导出
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 应用入口
├── .vscode/               # VSCode 配置
├── .husky/                # Git 钩子
├── env.d.ts               # 环境变量类型
├── env.example            # 环境变量示例
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json     # Node.js TypeScript 配置
├── vite.config.ts         # Vite 配置
├── vitest.config.ts       # Vitest 测试配置
├── .eslintrc.cjs          # ESLint 配置
├── .prettierrc            # Prettier 配置
├── .editorconfig          # 编辑器配置
├── .nvmrc                 # Node.js 版本
└── README.md              # 项目文档
```

## 🎨 设计系统

### 颜色系统

```scss
// 主色调
--primary-color: #409eff
--theme-color: #ff5c8a

// 功能色
--success-color: #67c23a
--warning-color: #e6a23c
--danger-color: #f56c6c
--info-color: #909399

// 文字色
--text-color: #333
--text-color-secondary: #666
--text-color-placeholder: #999
--text-color-disabled: #c0c4cc

// 边框色
--border-color: #dcdfe6
--border-color-light: #e4e7ed
--border-color-lighter: #ebeef5

// 背景色
--background-color: #f5f7fa
--background-color-light: #fafafa
--background-color-white: #ffffff
```

### 间距系统

```scss
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-xxl: 48px
```

### 字体系统

```scss
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-md: 16px
--font-size-lg: 18px
--font-size-xl: 20px
--font-size-xxl: 24px
```

## 🔧 开发指南

### 代码规范

项目使用 ESLint + Prettier 进行代码规范管理：

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查

### 组件开发规范

1. **组件命名**: 使用 PascalCase
2. **文件命名**: 使用 PascalCase.vue
3. **Props 定义**: 使用 TypeScript 接口
4. **事件定义**: 使用 defineEmits
5. **样式**: 使用 SCSS + CSS 变量

### API 开发规范

1. **接口定义**: 在 `src/api/types.ts` 中定义类型
2. **接口实现**: 在对应的 API 文件中实现
3. **错误处理**: 统一的错误处理机制
4. **请求拦截**: 自动添加认证信息

### 状态管理规范

1. **Store 命名**: 使用 camelCase
2. **状态定义**: 使用 ref 和 computed
3. **方法定义**: 使用函数式 API
4. **类型安全**: 完整的 TypeScript 类型

## 🧪 测试

项目使用 Vitest 进行单元测试：

```bash
# 运行所有测试
npm run test

# 运行测试 UI
npm run test:ui

# 生成覆盖率报告
npm run test:coverage
```

### 测试文件结构

```
src/
├── test/
│   └── setup.ts          # 测试设置
├── components/
│   └── __tests__/        # 组件测试
└── utils/
    └── __tests__/        # 工具函数测试
```

## 📱 响应式设计

项目支持多设备响应式设计：

- **移动端**: < 768px
- **平板端**: 768px - 1024px
- **桌面端**: > 1024px

### 断点定义

```scss
$breakpoint-xs: 480px
$breakpoint-sm: 768px
$breakpoint-md: 992px
$breakpoint-lg: 1200px
$breakpoint-xl: 1920px
```

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 部署到服务器

1. 将 `dist` 目录上传到服务器
2. 配置 Nginx 或其他 Web 服务器
3. 确保路由支持 History 模式

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://your-api-server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔍 性能优化

### 代码分割

- 路由级别的代码分割
- 组件级别的懒加载
- 第三方库的按需加载

### 资源优化

- 图片懒加载
- 资源压缩
- CDN 加速

### 缓存策略

- 浏览器缓存
- Service Worker 缓存
- API 响应缓存

## 🐛 调试

### 开发工具

- Vue DevTools
- Chrome DevTools
- 性能监控工具

### 错误处理

- 全局错误边界
- 错误上报机制
- 开发环境错误提示

## 📄 许可证

MIT License

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系方式

- 项目维护者: ThinCell Team
- 邮箱: [your-email@example.com]
- 项目地址: [repository-url]

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！
