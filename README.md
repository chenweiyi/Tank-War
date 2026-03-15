# Tank War 坦克大战

A classic tank battle game built with Vue 3 + TypeScript + Canvas 2D.

一个使用 Vue 3 + TypeScript + Canvas 2D 开发的经典坦克大战游戏。

---

## 🎮 Demo

[Play Online](https://tank-war.vercel.app) (Deployed on Vercel)

---

## 👥 Team

- **@cwy** - Creator & Lead Developer
- **@kk** - AI Assistant (WSL/Ubuntu Environment)
- **@Tom** - AI Assistant (Windows Native Environment)

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Vue 3.3+ (Composition API)
- **Language**: TypeScript 5.2+
- **Build Tool**: Vite 5.0+
- **Canvas**: Canvas 2D API

### UI & Styling
- **UI Components**: Element Plus
- **CSS Framework**: UnoCSS (atomic CSS)

### Code Quality
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitizen + commitlint
- **Testing**: Vitest

---

## 🏗️ Architecture

```
src/
├── game/                    # Core game logic
│   ├── Stage.ts            # Game loop & scene management
│   ├── Tank.ts             # Tank base class
│   ├── Player1.ts          # Player 1 controller
│   ├── Player2.ts          # Player 2 controller
│   ├── Enemy.ts            # Enemy AI
│   ├── Bullet.ts           # Bullet system
│   ├── Brick.ts            # Destructible walls
│   ├── King.ts             # Base camp
│   ├── Prop.ts             # Power-up items
│   ├── config.ts           # Game configuration
│   └── maps/               # Level designs (3 levels)
├── components/
│   └── GameCanvas.vue      # Main game canvas component
├── helper/
│   └── CountDown.ts        # Countdown timer system
└── assets/
    └── images/
        └── graphics.png    # Sprite sheet
```

### Core Systems

1. **Stage.ts** - Central orchestrator managing game loop, entity spawning, collision detection, and level progression
2. **Event System** - Custom EventBus for pause/resume/gameover events
3. **Collision Detection** - AABB (Axis-Aligned Bounding Box) collision system
4. **Input Handling** - Keyboard input with key buffering for smooth multi-key presses
5. **Enemy AI** - Random movement patterns with auto-shooting behavior

---

## 📜 Timeline

- **2023-11-28**: Initial concept
- **2023-11-30**: Project initialization
- **2023-12-03**: Canvas system, 2 players, movement & shooting
- **2023-12-05**: Enemy tanks added
- **2023-12-07**: Enemy AI with shooting capability
- **2023-12-09**: Configuration system, multi-key input handling
- **2023-12-11**: Explode power-up item
- **2023-12-12**: Adobe brick (destructible wall)
- **2023-12-22**: Map system with collision logic
- **2023-12-24**: Base camp (King), event bus system
- **2024-03-01**: Vercel deployment configuration
- **2024-03-07**: Score system & gameover improvements
- **2026-03-13**: Multi-level support (3 levels)

---

## 🎯 Features

### Implemented ✅
- [x] Single player mode
- [x] Local 2-player co-op
- [x] Enemy AI with multiple spawn waves
- [x] 3 different level maps
- [x] Destructible environment (bricks)
- [x] Power-up items (explode bomb)
- [x] Base camp protection
- [x] Score tracking
- [x] Pause/Resume system
- [x] Level progression

### In Progress 🟡
- [ ] Bug fixes and stability improvements
- [ ] UI polish and animations

### Planned 📋
- [ ] Sound effects & background music
- [ ] More enemy types with advanced AI
- [ ] Additional power-up items
- [ ] More level maps
- [ ] Save/load game progress
- [ ] Leaderboard system
- [ ] Online multiplayer (future consideration)

---

## 🛠️ Development

### Prerequisites
- Node.js 18+ (recommended: 22+)
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd Tank-War

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run tests
pnpm run test

# Lint code
pnpm run lint
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start Vite dev server |
| `pnpm run build` | Type-check + production build |
| `pnpm run preview` | Preview production build |
| `pnpm run test` | Run Vitest tests |
| `pnpm run lint` | Lint staged files |
| `pnpm run cz` | Commit with Commitizen |

---

## 🎮 Game Controls

### Player 1
- **Move**: WASD
- **Shoot**: F

### Player 2
- **Move**: Arrow Keys
- **Shoot**: Enter

### System
- **Pause/Resume**: P
- **Restart**: R (after gameover)

---

## 📦 Deployment

This project is configured for deployment on Vercel.

```bash
# Build and deploy
pnpm run build
vercel deploy
```

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Inspired by the classic Battle City (Tank 1990) game.

Built with ❤️ by a father for his son.
