# Tank War 坦克大战

一个使用 Vue 3 + TypeScript + Canvas 2D 开发的经典坦克大战游戏。

A classic tank battle game built with Vue 3 + TypeScript + Canvas 2D.

---

## 🎮 在线演示

[立即游玩](https://tank-war.vercel.app) (部署于 Vercel)

---

## 👥 开发团队

- **@cwy** - 创始人 & 主程
- **@kk** - AI 助手 (WSL/Ubuntu 环境)
- **@Tom** - AI 助手 (Windows 原生环境)

---

## 🚀 技术栈

### 前端核心
- **框架**: Vue 3.3+ (Composition API)
- **语言**: TypeScript 5.2+
- **构建工具**: Vite 5.0+
- **渲染**: Canvas 2D API

### UI 与样式
- **UI 组件库**: Element Plus
- **CSS 框架**: UnoCSS (原子化 CSS)

### 代码质量
- **代码检查**: ESLint + Prettier
- **Git 钩子**: Husky + lint-staged
- **提交规范**: Commitizen + commitlint
- **测试框架**: Vitest

---

## 🏗️ 项目架构

```
src/
├── game/                    # 游戏核心逻辑
│   ├── Stage.ts            # 游戏主循环 & 场景管理
│   ├── Tank.ts             # 坦克基类
│   ├── Player1.ts          # 玩家 1 控制器
│   ├── Player2.ts          # 玩家 2 控制器
│   ├── Enemy.ts            # 敌人 AI
│   ├── Bullet.ts           # 子弹系统
│   ├── Brick.ts            # 可破坏墙体
│   ├── King.ts             # 大本营
│   ├── Prop.ts             # 道具系统
│   ├── config.ts           # 游戏配置
│   └── maps/               # 关卡设计 (3 个关卡)
├── components/
│   └── GameCanvas.vue      # 主游戏画布组件
├── helper/
│   └── CountDown.ts        # 倒计时系统
└── assets/
    └── images/
        └── graphics.png    # 精灵图表
```

### 核心系统

1. **Stage.ts** - 游戏核心编排器，管理游戏循环、实体生成、碰撞检测、关卡推进
2. **事件系统** - 自定义 EventBus 处理暂停/恢复/游戏结束事件
3. **碰撞检测** - AABB (轴对齐包围盒) 碰撞系统
4. **输入处理** - 键盘输入带键位缓冲，支持多键同时按压
5. **敌人 AI** - 随机移动模式 + 自动射击行为

---

## 📜 开发时间线

- **2023-11-28**: 初始创意
- **2023-11-30**: 项目初始化
- **2023-12-03**: 画布系统、双玩家、移动与射击
- **2023-12-05**: 添加敌人坦克
- **2023-12-07**: 敌人 AI 支持射击
- **2023-12-09**: 配置文件系统、多键位输入处理
- **2023-12-11**: 爆炸道具
- **2023-12-12**: 土砖 (可破坏墙体)
- **2023-12-22**: 地图系统与碰撞逻辑
- **2023-12-24**: 大本营、全局事件系统
- **2024-03-01**: Vercel 部署配置
- **2024-03-07**: 计分系统与游戏结束优化
- **2026-03-13**: 多关卡支持 (3 个关卡)

---

## 🎯 功能特性

### 已完成 ✅
- [x] 单人模式
- [x] 本地双人合作
- [x] 敌人 AI 多波次生成
- [x] 3 个不同关卡地图
- [x] 可破坏环境 (土砖)
- [x] 道具系统 (爆炸炸弹)
- [x] 大本营保护机制
- [x] 计分系统
- [x] 暂停/恢复系统
- [x] 关卡递进

### 进行中 🟡
- [ ] Bug 修复与稳定性优化
- [ ] UI 美化与动画效果

### 计划中 📋
- [ ] 音效与背景音乐
- [ ] 更多敌人类型与高级 AI
- [ ] 更多道具类型
- [ ] 更多关卡地图
- [ ] 游戏进度保存/加载
- [ ] 排行榜系统
- [ ] 在线多人联机 (未来考虑)

---

## 🛠️ 开发指南

### 环境要求
- Node.js 18+ (推荐：22+)
- pnpm (推荐) 或 npm

### 快速开始

```bash
# 克隆仓库
git clone <repository-url>
cd Tank-War

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 生产环境构建
pnpm run build

# 预览生产构建
pnpm run preview

# 运行测试
pnpm run test

# 代码检查
pnpm run lint
```

### 命令速查

| 命令 | 说明 |
|---------|-------------|
| `pnpm run dev` | 启动 Vite 开发服务器 |
| `pnpm run build` | 类型检查 + 生产构建 |
| `pnpm run preview` | 预览生产构建 |
| `pnpm run test` | 运行 Vitest 测试 |
| `pnpm run lint` | 检查暂存文件 |
| `pnpm run cz` | 使用 Commitizen 提交 |

---

## 🎮 游戏操作

### 玩家 1
- **移动**: WASD
- **射击**: F

### 玩家 2
- **移动**: 方向键
- **射击**: Enter

### 系统
- **暂停/恢复**: P
- **重新开始**: R (游戏结束后)

---

## 📦 部署

项目已配置 Vercel 部署。

```bash
# 构建并部署
pnpm run build
vercel deploy
```

---

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

灵感来源于经典游戏《坦克大战》(Battle City / Tank 1990)。

这是一位父亲为儿子制作的游戏 ❤️

---

## 📞 联系

如有问题或建议，欢迎通过 GitHub Issues 联系我们。
