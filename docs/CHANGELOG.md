# Changelog

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
