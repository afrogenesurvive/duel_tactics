export function calcElasticCountCoords(app, type, subType, data) {
  let drawCell;
  let mod = {
    x: undefined,
    y: undefined,
  };
  let finalCoords = {
    x: undefined,
    y: undefined,
  };

  const getMod = (direction, unit2) => {
    let mod2 = mod;
    switch (direction) {
      case "north":
        mod2 = {
          x: unit2 * 2,
          y: -unit2,
        };
        break;
      case "south":
        mod2 = {
          x: -(unit2 * 2),
          y: unit2,
        };
        break;
      case "east":
        mod2 = {
          x: unit2 * 2,
          y: unit2,
        };
        break;
      case "west":
        mod2 = {
          x: -(unit2 * 2),
          y: -unit2,
        };
        break;
      default:
    }

    return mod2;
  };

  const finish = (base2, unit3) => {
    switch (app.gridWidth) {
      case 19:
        unit3 = base2 / 3;
        break;
      case 15:
        unit3 = base2 / 2;
        break;
      case 12:
        unit3 = base2 / 1.5;
        break;
      case 9:
        unit3 = base2;
        break;
      case 6:
        unit3 = base2 * 2;
        break;
      case 3:
        unit3 = base2 * 6;
        break;
      default:
    }

    let dir = data.elasticCounter.direction;
    let baseCoords = {
      x: data.elasticCounter.coords.x,
      y: data.elasticCounter.coords.y,
    };

    if (data.elasticCounter.countUp.state === true) {
      dir = data.elasticCounter.direction;
    }
    if (data.elasticCounter.countDown.state === true) {
      dir = app.getOppositeDirection(data.elasticCounter.direction);
    }

    mod = getMod(dir, unit3);

    if (data.elasticCounter.pause.state !== true) {
      finalCoords = {
        x: baseCoords.x + mod.x,
        y: baseCoords.y + mod.y,
      };
    } else {
      finalCoords = {
        x: baseCoords.x,
        y: baseCoords.y,
      };
    }

    let targetCell;
    data.elasticCounter.coords = finalCoords;
    targetCell = app.getCellFromDirection(1, data.currentPosition.cell.number, dir);
    let targetCellRef = app.gridInfo.find((x) => x.number.x === targetCell.x && x.number.y === targetCell.y);
    drawCell = { x: undefined, y: undefined };

    if (data.elasticCounter.countUp.state === true) {
      if (targetCellRef) {
        drawCell = targetCellRef.number;
      } else {
        drawCell = data.currentPosition.cell.number;
      }
    }
    if (data.elasticCounter.pause.state === true && data.elasticCounter.pause.type === "peak") {
      if (targetCellRef) {
        drawCell = targetCellRef.number;
      } else {
        drawCell = data.currentPosition.cell.number;
      }
    }
    if (data.elasticCounter.countDown.state === true) {
      drawCell = data.currentPosition.cell.number;
    }
    if (
      (data.elasticCounter.pause.state === true && data.elasticCounter.pause.type === "start") ||
      (data.elasticCounter.pause.state === true && data.elasticCounter.pause.type === "end")
    ) {
      drawCell = data.currentPosition.cell.number;
    }
  };

  if (type === "halfPushBack") {
    let base = 0.015;
    let unit;
    let baseCoords = {
      x: undefined,
      y: undefined,
    };
    let dir = "";

    if (subType === "player") {
      switch (app.gridWidth) {
        case 12:
          unit = base / 3;
          break;
        case 9:
          unit = base;
          break;
        case 6:
          unit = base * 1.2;
          break;
        case 3:
          unit = base * 3;
          break;
        default:
      }

      baseCoords = {
        x: data.halfPushBack.coords.x,
        y: data.halfPushBack.coords.y,
      };

      if (data.halfPushBack.countUp.state === true) {
        dir = data.halfPushBack.direction;
      }
      if (data.halfPushBack.countDown.state === true) {
        dir = app.getOppositeDirection(data.halfPushBack.direction);
      }
    }

    if (subType === "obstacle") {
      unit = 2;

      baseCoords = {
        x: data.coords.x,
        y: data.coords.y,
      };

      if (data.countUp.state === true) {
        dir = data.direction;
      }
      if (data.countDown.state === true) {
        dir = app.getOppositeDirection(data.direction);
      }
    }

    mod = getMod(dir, unit);

    finalCoords = {
      x: baseCoords.x + mod.x,
      y: baseCoords.y + mod.y,
    };
    let targetCell;

    if (subType === "player") {
      data.halfPushBack.coords = finalCoords;

      targetCell = app.getCellFromDirection(1, data.currentPosition.cell.number, data.halfPushBack.direction);
    }
    if (subType === "obstacle") {
      data.coords = finalCoords;

      targetCell = app.getCellFromDirection(1, data.myCellNo, data.direction);
    }

    let targetCellRef = app.gridInfo.find((x) => x.number.x === targetCell.x && x.number.y === targetCell.y);
    drawCell = { x: undefined, y: undefined };

    if (subType === "player") {
      if (data.halfPushBack.countUp.state === true) {
        if (targetCellRef) {
          drawCell = targetCellRef.number;
        } else {
          drawCell = data.currentPosition.cell.number;
        }
      }
      if (data.halfPushBack.countDown.state === true) {
        drawCell = data.currentPosition.cell.number;
      }

      // app.players[data.number - 1] = data;
    }
    if (subType === "obstacle") {
      if (data.countUp.state === true) {
        if (targetCellRef) {
          drawCell = targetCellRef.number;
        } else {
          drawCell = data.myCellNo;
        }
      }
      if (data.countDown.state === true) {
        drawCell = data.myCellNo;
      }
    }
  }

  if (type === "deflected") {
    let base = 0.002;
    let unit;

    if (data.elasticCounter.countUp.count <= 3) {
      base = 0.007;
    }
    if (data.elasticCounter.countUp.count > 3 && data.elasticCounter.countUp.count < 6) {
      base = 0.005;
    }
    if (data.elasticCounter.countUp.count > 6) {
      base = 0.002;
    }

    finish(base, unit);
  }

  if (type === "dodging") {
    let base = 0.002;
    let unit;

    if (data.elasticCounter.countUp.count <= 3) {
      base = 0.007;
    }
    if (data.elasticCounter.countUp.count > 3 && data.elasticCounter.countUp.count < 6) {
      base = 0.005;
    }
    if (data.elasticCounter.countUp.count > 6) {
      base = 0.002;
    }

    finish(base, unit);
  }

  if (type === "attacking" || type === "defending") {
    let base = 0.002;
    let unit;

    if (data.elasticCounter.countUp.count <= 3) {
      if (data[type].directionType === "thrust") {
        base = 0.003;
      }
      if (data[type].directionType === "slash") {
        base = 0.005;
      }
    }
    if (data.elasticCounter.countUp.count > 3 && data.elasticCounter.countUp.count < 6) {
      if (data[type].directionType === "thrust") {
        base = 0.001;
      }
      if (data[type].directionType === "slash") {
        base = 0.003;
      }
    }
    if (data.elasticCounter.countUp.count > 6) {
      if (data[type].directionType === "thrust") {
        base = 0.0008;
      }
      if (data[type].directionType === "slash") {
        base = 0.002;
      }
    }

    finish(base, unit);
  }

  // console.log("calcElasticCountCoords", finalCoords);
  return {
    coords: finalCoords,
    drawCell: drawCell,
    player: data,
  };
}
