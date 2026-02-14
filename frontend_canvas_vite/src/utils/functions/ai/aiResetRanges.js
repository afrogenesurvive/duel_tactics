export function aiResetRanges(app, plyr) {
  app.players[plyr.number - 1].ai.pathfindingRanges = {
    spear: 3,
    crossbow: 5,
  };
  app.players[plyr.number - 1].ai.safeRange = true;
}
