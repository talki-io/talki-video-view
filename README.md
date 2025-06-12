# Thincell Video Player

基于Vue 3的现代化视频播放器项目。

## 技术栈

### 核心框架
- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia (状态管理)
- Vue Router

### 播放器功能
- ArtPlayer (主播放器)
- HLS.js (流媒体支持)

### UI组件
- Element Plus
- SCSS/Sass
- BEM命名规范

### 开发工具
- ESLint
- Prettier
- TypeScript
- Vite

## 项目结构

```
thincell-video/
├── src/
│   ├── assets/          # 静态资源
│   │   └── styles/     # 样式文件
│   ├── components/      # 公共组件
│   │   ├── common/     # 通用组件
│   │   ├── global/     # 全局组件
│   │   ├── layout/     # 布局组件
│   │   ├── player/     # 播放器相关组件
│   │   └── splash/     # 启动页组件
│   ├── composables/    # 组合式函数
│   ├── stores/         # Pinia状态管理
│   ├── types/          # TypeScript类型定义
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   ├── router/         # 路由配置
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── public/             # 公共资源
├── index.html          # HTML模板
├── vite.config.ts      # Vite配置
├── tsconfig.json       # TypeScript配置
└── package.json        # 项目依赖
```

## 功能特性

- [x] 视频播放控制（播放/暂停、音量、全屏等）
- [x] HLS流媒体支持
- [x] 响应式布局
- [x] 美观的UI设计
- [x] 图片懒加载
- [x] 分类导航
- [x] 启动页动画
- [ ] 画质切换
- [x] 播放速度控制
- [ ] 主题切换
- [ ] 视频列表
- [ ] 用户系统

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交代码
4. 创建 Pull Request

## 许可证

[MIT](LICENSE)
