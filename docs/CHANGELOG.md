# Changelog

## [0.0.1-4] — 2026-07-27

### Added

- **Settings tabbed layout** — Restructured the monolithic settings form into six tabs: Basic, Gear, AI, Controls, Gameplay, and UI
- **Settings data objects** — Added `settingsFormGameplayData` and `settingsFormUiData` with defaults for move cancel, action auto camera, pushback chaining, start items, trap data visibility, player outlines, on-player UI, cell info, action direction animation, and background theme
- **Settings engine gates** — Each new toggle controls its corresponding game behavior:
  - `checkMoveCancel.js` — Move Cancel toggling (disable reverses mid-move and dashing)
  - `checkAttacking.js` — Action Auto Camera toggling
  - `checkCellMouseOver.js` — Cell Info on mouse-over toggling
  - `cellInfo.jsx` — Trap data visibility toggle (show basic "Trapped" badge vs. full details)
  - `drawGridInit.js` — Dynamic background theme from UI settings
- **Background theme selector** — UI tab dropdown with 10 background options, uses existing `setBackgroundImage()` infrastructure
- **Master submit button** — Single always-visible Submit at form bottom; removed duplicate top submit; form reads from app state instead of DOM elements to work across tabs
- **Canvas persistence** — Settings canvases (human/AI start positions) kept in DOM across tab switches using CSS visibility, preventing drawn content loss

### Changed

- `loadSettings.js` — Reads `gridWidth`, `playerNumber`, `aiPlayerNumber` from app state objects instead of `event.target` to support tabbed layout
- `appState.js` — `showDirectionalActionAnimation` and `showPlayerOutlines` derived from `settingsFormUiData` defaults
- `settings.css` — Added tab, notice banner, sub-heading, gamepad notes, and canvas hidden state styles

## [0.0.1-3] — 2026-07-26

### Added

- **Live Log Window** — New in-game debug overlay positioned at bottom-left for viewing real-time `globalLogger` output:
  - `App.jsx` — Added `faTerminal` icon toggle in settings bar; wired `toggleLiveLog`, `clearLogBuffer`, and `toggleLogFilterMode` handlers
  - `appState.js` — Added `showLiveLog: false` to initial state; `app.logBuffer = []` and `app.logFilterMode = "filtered"` to constructor defaults
  - `globalLogger.js` — Refactored to always push structured entries (`id`, `type`, `message`, `data`, `origin`, `time`, `passed`) to `app.logBuffer` (max 500 entries, FIFO eviction), enabling the Live Log window to display entries regardless of filter state
  - `liveLogWindow.jsx` — New React component with category-colored badges, expandable detail rows (origin, data), auto-scroll, and Filtered/All mode toggle
  - `liveLogWindow.css` — Styled to match the game UI theme (dark panel with leather trim, monospace font)

## [0.0.1-2] — 2026-07-19

### Added

- Global logging for dash path blocked events (`player.dashing.blocked`):
  - `checkMoveCancel.js` — Logs `"blocked"` when origin cell or cell 1 is blocked at dash initiation
  - `checkDashing.js` — Logs `"cell2Blocked"` when dash arrives at cell 1 but cell 2 is blocked, and `"bounceComplete"` when the bounce thrust animation finishes
- `appState.js` — Added `blocked: false` to `dashing` logging settings; fixed `loggingSettings` to deep-merge localStorage cache with defaults so new toggles appear without requiring a cache clear

## [0.0.1-1] — 2026-07-19

### Added

- Comprehensive comment documentation for the dashing mechanic across all related files:
  - `checkDashing.js` — Full runtime logic annotated (reset state, collision resolution, feint handling, two-cell movement, post-dash cooldown)
  - `checkMoveCancel.js` — Dash initiation conditions, speed calculation, path blocking checks, and state setup documented
  - `handleKeyPress_.js` — Tap-tracking block for double-tap detection explained
  - `attackedCancel.js` — Attack-cancelled-dash case documented with reset logic
  - `playerUpdate.js` — Pipeline routing and input gating for dashing annotated
  - `checkNonMoveInput.js` — Early return guard during dash explained
  - `playerDataArray.js` — Dash state fields documented for both players
  - `appState.js` — `dashRef` tuning constants and stamina cost documented
