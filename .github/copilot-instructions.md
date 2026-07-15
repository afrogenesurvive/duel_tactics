# Duel Tactics — Project Guidelines

## Code Style

### Frontend (React + Canvas)

- **React**: Class components extending `Component`. State managed via `this.state` + `setState()`. All game state mutation is on the `app` singleton object passed between functions.
- **Canvas**: 2D isometric rendering via HTML Canvas. All drawing functions receive `(app, canvas, context)`.
- **Engine functions**: Standalone exported functions in `src/engine/` and `src/engine/playerUpdate/`. All take `app` as the first argument.
- **Utility functions**: In `src/utils/functions/` organized by domain (ai/, camera/, combat_action/, geometry/, input/, items/, misc/, navigation/, non_combat_action/, settings/, stage/).
- **UI Components**: In `src/utils/components/` as JSX files.
- **Imports**: All engine/util functions are imported and bound in `App.jsx` constructor via arrow function wrappers: `this.fn = (...args) => fn(this, ...args)`.

### Player State Pattern

Every player action follows this state machine:

```js
propertyName: {
  state: false,    // boolean toggle
  count: 0,        // frame counter
  limit: N,        // frame limit
  // additional fields as needed
}
```

Actions progress each frame: `count++` until `count >= limit`, then action completes.

### Debug Logging

Use `app.globalLogger(component, message, data, meta)` for all debug output. Never use `console.log` in production paths.

### Random Number Generation

Use `app.rnJesus(min, max)` for all random rolls. Returns a number in range [min, max].

## Architecture

### Frontend Engine Pipeline

```
gameLoop (requestAnimationFrame)
  └─ for each player →
       playerUpdate(app, player, canvas, context)
         ├─ checkTests
         ├─ checkVoid
         ├─ checkStamina
         ├─ checkDeflection
         ├─ checkCellMouseOver
         ├─ checkMoveCancel
         ├─ checkDashing / checkMoveProgress
         ├─ checkAttacking / checkDefending
         ├─ checkFlanking / checkDodge
         ├─ checkPushPull / checkPlayerGear
         └─ checkMoveInput / checkNonMoveInput
       drawPlayerStep(app, playerNumber, canvas, context)
         ├─ drawCellsUnderAttackHighlight
         ├─ drawDepthSorting
         ├─ processPlayerSpriteSheet
         ├─ drawObstaclesBarriers
         └─ drawPlayerPopups
```

### AI Pipeline

```
aiEvaluate → (aiEvaluateTargetReset → aiEvaluateTargeting → aiEvaluateItemLogic → aiEvaluateMission → aiEvaluateCheckJumpDestination)
aiDecide → chooses action based on evaluated data
aiAct → maps decision to game inputs
```

### Backend

- Express.js server with GraphQL endpoint at `/graphql`
- Authentication via JWT middleware
- MongoDB via Mongoose (models: User, Patient, Appointment, Visit, Queue, Reminder, Tutorial)
- Socket.io for real-time communication

## Build & Run Commands

```bash
# Frontend (in frontend_canvas_vite/)
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend (in root)
npm start            # Start with nodemon
```

## Conventions

- New state fields go in `playerDataArray.js` (player-linked) or `appState.js` (game-wide)
- New tuning constants go in `appState.js` inside `applyConstructorDefaults()`
- New engine checks must be: (1) created as a standalone function, (2) imported in `playerUpdate.js`, (3) called in the correct order within `playerUpdate()`, (4) bound in `App.jsx` constructor
- Input gating: check `player.moving.state`, `player.attacking.state`, `player.defending.state`, `player.dashing.state`, etc. before reading inputs
- Timing: all values in frames (game ticks at 60fps via requestAnimationFrame throttling)
- Isometric coordinates: use `cartesianToIsometric()` for grid→screen conversion

## Design Notes

Design documents and game theory analysis are stored in `frontend_canvas_vite/src/notes/` as `.txt` files. Reference them when working on related features.
