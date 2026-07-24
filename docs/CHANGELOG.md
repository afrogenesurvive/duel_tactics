# Changelog

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
