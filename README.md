# talki-video 视频播放器

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
- **模块化设计**: 按功能模块组织的清晰目录结构

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
- **Husky 8.0.3** - Git 钩子
- **lint-staged 15.2.0** - 暂存文件检查

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

# Git 相关
npm run commit           # 使用 commitizen 提交代码
npm run release          # 发布新版本
```

## 🏗️ 项目结构

```
talki-video-view/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   │   ├── authApi.ts     # 认证相关 API
│   │   ├── videoApi.ts    # 视频相关 API
│   │   └── searchApi.ts   # 搜索相关 API
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
│   │   └── splash/        # 启动页组件
│   ├── directives/        # 自定义指令
│   ├── plugins/           # 插件
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── types/             # 类型定义
│   │   ├── api.ts         # API 相关类型
│   │   └── global.d.ts    # 全局类型声明
│   ├── utils/             # 工具函数
│   │   ├── http.ts        # HTTP 请求工具
│   │   ├── format.ts      # 格式化工具
│   │   └── performance.ts # 性能监控工具
│   ├── views/             # 页面组件
│   │   ├── auth/          # 认证相关页面
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   └── ForgotPassword.vue
│   │   ├── search/        # 搜索相关页面
│   │   │   ├── Search.vue
│   │   │   └── SearchResultPage.vue
│   │   ├── player/        # 播放器相关页面
│   │   │   └── PlayPage.vue
│   │   ├── user/          # 用户相关页面
│   │   │   ├── Profile.vue
│   │   │   └── Message.vue
│   │   ├── system/        # 系统相关页面
│   │   │   ├── Splash.vue
│   │   │   └── NotFound.vue
│   │   └── Home.vue       # 首页
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
```

### 响应式断点

```scss
// 移动端
@media (max-width: 600px) { ... }

// 平板
@media (max-width: 1024px) { ... }

// 桌面端
@media (min-width: 1025px) { ... }
```

## 🔧 开发规范

### 代码风格

- 使用 ESLint + Prettier 统一代码风格
- TypeScript 严格模式，确保类型安全
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case
- 常量使用 UPPER_SNAKE_CASE

### 目录规范

- 按功能模块组织目录结构
- 页面组件按业务领域分组
- 通用组件和业务组件分离
- API 接口按功能模块划分

### Git 工作流

- 使用 Husky + lint-staged 确保代码质量
- 提交前自动运行 ESLint 和 Prettier
- 使用 commitizen 规范化提交信息

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 部署到服务器

构建完成后，将 `dist` 目录下的文件部署到 Web 服务器即可。

## 📝 更新日志

### v1.0.0 (2024-01-XX)

- ✨ 初始版本发布
- 🎯 完整的视频播放功能
- 🔐 用户认证系统
- 🔍 搜索功能
- 📱 响应式设计
- 🎨 Element Plus UI 组件库
- 🔧 TypeScript 类型安全
- 📦 模块化架构设计

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

**ThinCell 视频播放器** - 让视频播放更简单、更高效！
