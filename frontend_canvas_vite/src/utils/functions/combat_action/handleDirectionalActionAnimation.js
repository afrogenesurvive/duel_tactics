export function handleDirectionalActionAnimation(app, ownerType, action, phase, owner, arrayElemId, xCount, shape) {
  // action:
  //   attacking, defending
  // phase:
  // pullback, release

  let id;
  let arcAngle = 0;
  let startAngle = 0;
  let direction = "counterClockwise"; // 'clockwise' or 'counterClockwise'
  let face = "top"; // top,front,side
  let radius = 50;
  let color = "red";
  if (action === "defending") {
    color = "yellow";
  }
  let directionType = "";
  let ownerDirection = "";
  let actionDirection = "";
  let ownerlocationCell;
  if (ownerType === "player") {
    directionType = owner[action].directionType;
    ownerDirection = owner.direction;
    actionDirection = owner[action].direction;
    ownerlocationCell = owner.currentPosition.cell.number;
  } else {
    directionType = arrayElemId.acting.directionType;
    ownerDirection = arrayElemId.direction;
    actionDirection = arrayElemId.acting.direction;
    ownerlocationCell = owner.number;
  }

  // starAngles:
  // top face: 0 = east, 90 = south, 180 = west, 270 = north
  // side face: 0 = south, 90 = top/up, 180 = north/right, 270 = bottom/down
  // front face: 0 = bottom/down, 90 = back/left/west, 180 = top/up, 270 = front/right

  let countLimit = 10;
  let delay = 20;

  if (ownerType === "player" || ownerType === "obstacle" || ownerType === "barrier") {
    // console.log("directional action anim count", xCount);
    countLimit = xCount;
    if (countLimit > 18) {
      countLimit = 18;
    }
    if (countLimit < 8) {
      countLimit = 8;
    }
  }

  if (
    directionType === "thrust" ||
    (action === "attacking" && (owner.currentWeapon?.type === "crossbow" || owner[ownerType]?.trap?.item?.subType === "crossbow"))
  ) {
    countLimit = 10;

    if (phase === "release") {
      countLimit = 15;
    }
    if (owner.currentWeapon?.type === "crossbow" || owner[ownerType]?.trap?.item?.subType === "crossbow") {
      directionType = "thrust";
    }

    if (ownerType === "player") {
      id = owner.actionDirectionAnimationArray.length + 1;

      owner.actionDirectionAnimationArray.push({
        id: id,
        ownerType: ownerType,
        ownerDirection: ownerDirection,
        action: action,
        actionDirection: actionDirection,
        actionDirectionType: directionType,
        phase: phase,
        radius: radius,
        angle: arcAngle,
        startAngle: startAngle,
        direction: direction,
        face: face,
        shape: shape,
        color: color,
        counter: {
          count: 0,
          limit: countLimit,
        },
        delay: {
          state: false,
          count: 0,
          limit: delay,
        },
        points: [],
        locationCell: ownerlocationCell,
      });
    } else {
      id = app.obstacleBarrierActionAnimationArray.length + 1;

      app.obstacleBarrierActionAnimationArray.push({
        id: id,
        ownerType: ownerType,
        ownerDirection: ownerDirection,
        action: action,
        actionDirection: actionDirection,
        actionDirectionType: directionType,
        phase: phase,
        radius: radius,
        angle: arcAngle,
        startAngle: startAngle,
        direction: direction,
        face: face,
        shape: shape,
        color: color,
        counter: {
          count: 0,
          limit: countLimit,
        },
        delay: {
          state: false,
          count: 0,
          limit: delay,
        },
        points: [],
        locationCell: ownerlocationCell,
      });
    }
  } else {
    if (action === "defending") {
      // arcAngle = 90;
      phase = "release";
    }

    if (phase === "pullback") {
      arcAngle = 90;
    }
    if (phase === "release") {
      arcAngle = 180;
      // color = "blue";
    }

    if (ownerDirection === "north") {
      if (actionDirection === "north") {
        face = "side";
        if (phase === "pullback") {
          startAngle = 90;
          direction = "counterClockwise";
        }
        if (phase === "release") {
          startAngle = 0;
          direction = "clockwise";
        }
      }
      if (actionDirection === "south") {
        face = "side";
        if (phase === "pullback") {
          startAngle = 270;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 0;
          direction = "counterClockwise";
        }
      }
    }

    if (ownerDirection === "south") {
      if (actionDirection === "north") {
        face = "side";
        if (phase === "pullback") {
          startAngle = 270;
          direction = "counterClockwise";
        }
        if (phase === "release") {
          startAngle = 180;
          direction = "clockwise";
        }
      }
      if (actionDirection === "south") {
        face = "side";
        if (phase === "pullback") {
          startAngle = 90;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 180;
          direction = "counterClockwise";
        }
      }
    }
    // ----------------
    if (ownerDirection === "east") {
      if (actionDirection === "east") {
        face = "front";
        if (phase === "pullback") {
          startAngle = 180;
          direction = "ccounterClockwise";
        }
        if (phase === "release") {
          startAngle = 90;
          direction = "clockwise";
        }
      }
      if (actionDirection === "west") {
        face = "front";
        if (phase === "pullback") {
          startAngle = 0;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 90;
          direction = "counterClockwise";
        }
      }
    }
    // ----------------
    if (ownerDirection === "west") {
      if (actionDirection === "east") {
        face = "front";
        if (phase === "pullback") {
          startAngle = 0;
          direction = "counterClockwise";
        }
        if (phase === "release") {
          startAngle = 270;
          direction = "clockwise";
        }
      }
      if (actionDirection === "west") {
        face = "front";
        if (phase === "pullback") {
          startAngle = 180;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 270;
          direction = "counterClockwise";
        }
      }
    }
    // ----------------
    if (ownerDirection === "east") {
      if (actionDirection === "north") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 270;
          direction = "counterClockwise";
        }
        if (phase === "release") {
          startAngle = 180;
          direction = "clockwise";
        }
      }
      if (actionDirection === "south") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 90;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 180;
          direction = "counterClockwise";
        }
      }
    }
    if (ownerDirection === "west") {
      if (actionDirection === "north") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 270;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 0;
          direction = "counterClockwise";
        }
      }
      if (actionDirection === "south") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 90;
          direction = "counterClockwise";
        }
        if (phase === "release") {
          startAngle = 0;
          direction = "clockwise";
        }
      }
    }
    // ----------------
    if (ownerDirection === "north") {
      if (actionDirection === "east") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 0;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 90;
          direction = "counterClockwise";
        }
      }
      if (actionDirection === "west") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 180;
          direction = "counterClockwise";
        }
        if (phase === "release") {
          startAngle = 90;
          direction = "clockwise";
        }
      }
    }
    if (ownerDirection === "south") {
      if (actionDirection === "east") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 0;
          direction = "counterClockwise";
        }
        if (phase === "release") {
          startAngle = 270;
          direction = "clockwise";
        }
      }
      if (actionDirection === "west") {
        face = "top";
        if (phase === "pullback") {
          startAngle = 180;
          direction = "clockwise";
        }
        if (phase === "release") {
          startAngle = 270;
          direction = "counterClockwise";
        }
      }
    }

    if (ownerType === "player") {
      id = owner.actionDirectionAnimationArray.length + 1;

      owner.actionDirectionAnimationArray.push({
        id: id,
        ownerType: ownerType,
        ownerDirection: ownerDirection,
        action: action,
        actionDirection: actionDirection,
        actionDirectionType: directionType,
        phase: phase,
        radius: radius,
        angle: arcAngle,
        startAngle: startAngle,
        direction: direction,
        face: face,
        shape: shape,
        color: color,
        counter: {
          count: 0,
          limit: countLimit,
        },
        delay: {
          state: false,
          count: 0,
          limit: delay,
        },
        points: [],
        locationCell: ownerlocationCell,
      });
    } else {
      id = app.obstacleBarrierActionAnimationArray.length + 1;

      app.obstacleBarrierActionAnimationArray.push({
        id: id,
        ownerType: ownerType,
        ownerDirection: ownerDirection,
        action: action,
        actionDirection: actionDirection,
        actionDirectionType: directionType,
        phase: phase,
        radius: radius,
        angle: arcAngle,
        startAngle: startAngle,
        direction: direction,
        face: face,
        shape: shape,
        color: color,
        counter: {
          count: 0,
          limit: countLimit,
        },
        delay: {
          state: false,
          count: 0,
          limit: delay,
        },
        points: [],
        locationCell: ownerlocationCell,
      });
    }
  }

  if (ownerType === "player") {
    return owner;
  } else {
    return arrayElemId;
  }
}
