export function scanTargetAreaThreat(app, args) {
  // console.log('scanning area for threats');

  let point = args.point;
  let range = args.range;
  let playerPositions = [];
  let isSafe = true;
  let threats = [];
  for (const player of app.players) {
    if (player.ai.state !== true && player.number !== args.player) {
      playerPositions.push({
        player: player.number,
        position: player.currentPosition.cell.number,
      });
    }
  }
  for (const playerPos of playerPositions) {
    let xDiff;
    let yDiff;
    let largerx = Math.max(point.x, playerPos.position.x);
    // console.log('playerPos.position.x',playerPos.position.x,'point.x',point.x,'largerx',largerx);
    if (largerx === point.x) {
      xDiff = point.x - playerPos.position.x;
    } else {
      xDiff = playerPos.position.x - point.x;
    }
    let largery = Math.max(point.y, playerPos.position.y);
    // console.log('playerPos.position.y',playerPos.position.y,'point.y',point.y,'largery',largery);
    if (largery === point.y) {
      yDiff = point.y - playerPos.position.y;
    } else {
      yDiff = playerPos.position.y - point.y;
    }
    let diffSum = xDiff + yDiff;
    // console.log('vv',playerPos.player,diffSum);

    if (diffSum <= range) {
      threats.push({
        player: playerPos.player,
        position: playerPos.position,
        distValue: diffSum,
        distIndex: undefined,
      });
    }
  }

  if (threats.length > 0) {
    isSafe = false;
  }

  threats.sort((a, b) => (a.distValue > b.distValue ? 1 : -1));
  for (const threat of threats) {
    let threatIndex = threats.findIndex((x) => x.player === threat.player);
    threat.distIndex = threatIndex;
  }
  // console.log('threats',threats);

  return {
    isSafe: isSafe,
    threats: threats,
  };
}
