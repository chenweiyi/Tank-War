# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Type-check + build for production (vue-tsc && vite build)
npm run preview    # Preview production build
npm run test       # Run tests (Vitest)
npm run lint       # Lint staged files
```

Run a single test file: `npx vitest run src/helper/CountDown.test.ts`

## Architecture

Canvas-based 2D tank battle game built with Vue 3 + TypeScript + Vite. The Vue layer is minimal — `App.vue` renders `GameCanvas.vue`, which owns the `<canvas>` element and bootstraps the game.

### Core systems

**`src/game/Stage.ts`** — central orchestrator. Holds all active game entities in arrays, runs the render loop (`requestAnimationFrame`), manages level progression (clear enemies → next level; king/players die → gameover), and spawns enemies/props via `CountDown` timers.

**Entity model** — all renderable objects implement the `INode` interface (defined in `src/game.d.ts`). Entities are stored in typed arrays on `Stage` and iterated each frame for rendering and collision checks.

**Collision** — AABB checks in `src/game/utils.ts`. Type guards there distinguish entity types for collision response logic.

**Input** — keyboard listeners with key buffering live in `src/game/Tank.ts` (base class). `Player1.ts` / `Player2.ts` extend it with their keybindings from `src/game/config.ts`.

**AI** — `src/game/Enemy.ts` uses random direction changes and auto-shooting timers. Pause/resume is coordinated via `EventBus`.

**Pause/Resume** — `src/helper/EventBus.ts` is a simple pub/sub used to broadcast pause/resume/gameover events. All timer-holding classes extend `src/game/EventSync.ts` to subscribe automatically.

**Levels** — map definitions live in `src/game/maps/level1.ts`, `level2.ts`, `level3.ts`, registered in `src/game/maps/index.ts`. Each map describes the initial layout of bricks, adobe bricks, and the king position.

**Sprites** — all graphics come from a single sprite sheet at `src/assets/images/graphics.png`. Sprite coordinates and sizes are defined in `src/game/config.ts`.
