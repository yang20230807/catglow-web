# CatGlow 前端设计文档

> 版本：v0.1.0  
> 日期：2026-03-29  
> 状态：框架选型阶段

---

## 1. 项目概述

- **项目名**：CatGlow Web
- **类型**：内容Feed流平台（类似抖音）
- **核心功能**：推荐Feed、搜索
- **开发模式**：前期框架搭建 + 功能逐步补齐

---

## 2. 技术选型

### 2.1 核心框架

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.x | 核心框架，组件化生态成熟 |
| TypeScript | 5.x | 类型安全，开发体验好 |
| Vite | 5.x | 构建工具，快 |

### 2.2 状态管理

| 技术 | 说明 |
|------|------|
| Zustand | 轻量状态管理，比Redux简单太多，适合Feed场景 |
| React Query | 数据请求+缓存，推荐系统必备 |

### 2.3 UI组件库

| 技术 | 说明 |
|------|------|
| TailwindCSS | 原子化CSS，快速样式开发 |
| Headless UI | 无样式组件库，搭配Tailwind完美 |
| Lucide React | 图标库，轻量 |

### 2.4 视频相关

| 技术 | 说明 |
|------|------|
| react-player | 视频播放器，适配多格式 |
| @autoplay/Autoplay | 自动播放逻辑 |

### 2.5 路由

| 技术 | 说明 |
|------|------|
| React Router | 6.x，标准路由方案 |

---

## 3. 项目结构

```
src/
├── api/              # 接口层
│   └── feed.ts       # Feed相关API
├── components/       # 组件
│   ├── Feed/         # Feed流组件
│   ├── VideoCard/    # 视频卡片
│   └── Layout/       # 布局组件
├── hooks/            # 自定义Hooks
├── pages/            # 页面
│   ├── Home/         # 首页（推荐Feed）
│   └── Search/       # 搜索页
├── store/            # Zustand状态
├── styles/           # 全局样式
├── types/            # TypeScript类型
└── utils/            # 工具函数
```

---

## 4. 关键页面

### 4.1 首页（推荐Feed）

类似抖音的垂直滚动Feed：
- 全屏视频卡片
- 上下滑动切换
- 视频自动播放
- 右侧互动栏（点赞、评论、分享）
- 底部作者信息

### 4.2 搜索页

- 搜索框
- 热门搜索
- 搜索结果（视频列表）

---

## 5. 接口文档

> ⚠️ 接口尚未定义，以下为前端预期结构，待后端确认

### 5.1 获取推荐Feed

```
GET /api/feed/recommend

Query:
  - page: number    # 页码
  - pageSize: number # 每页条数，默认10

Response:
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "string",
        "title": "string",
        "videoUrl": "string",
        "coverUrl": "string",
        "author": {
          "id": "string",
          "nickname": "string",
          "avatar": "string"
        },
        "likeCount": 0,
        "commentCount": 0,
        "shareCount": 0
      }
    ],
    "hasMore": true
  }
}
```

### 5.2 搜索

```
GET /api/search

Query:
  - keyword: string  # 搜索词
  - page: number     # 页码
  - pageSize: number # 每页条数

Response:
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [...],
    "hasMore": true
  }
}
```

### 5.3 视频详情

```
GET /api/video/:id

Response:
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "string",
    "title": "string",
    "videoUrl": "string",
    "coverUrl": "string",
    "author": {...},
    "likeCount": 0,
    "commentCount": 0,
    "shareCount": 0,
    "description": "string",
    "createdAt": "string"
  }
}
```

---

## 6. 关键技术点

### 6.1 无限滚动 / 翻页加载

使用 React Query 的 `useInfiniteQuery`，搭配 Intersection Observer 检测滚动位置。

### 6.2 视频自动播放

- 使用 `react-player` 组件
- 进入可视区域时自动播放
- 离开时暂停
- 静音自动播放（浏览器策略）

### 6.3 性能优化

- 图片懒加载
- 视频预加载（当前视频播放时预加载下一个）
- 列表虚拟化（数据量大时）
- React.memo 减少不必要的重渲染

---

## 7. 下一步计划

- [ ] 初始化项目（Vite + React + TS）
- [ ] 搭建基础架构（路由、状态管理、API层）
- [ ] 开发首页Feed流（静态数据）
- [ ] 对接后端接口
- [ ] 开发搜索页

---

## 8. 依赖清单

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "zustand": "^4.x",
    "@tanstack/react-query": "^5.x",
    "react-player": "^2.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

---

_文档持续更新中_
