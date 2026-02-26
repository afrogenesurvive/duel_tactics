export function circleArcCrementer(app, type, owner, mode, radiusA, deg, startAng, shape, direction, face, elem) {
  const colors = [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#3366FF", // Blue
    "#FFD700", // Gold
    "#800080", // Purple
    "#FF1493", // Deep Pink
    "#00CED1", // Dark Turquoise
    "#8B4513", // Saddle Brown
    "#808080", // Gray
    "#FF6347", // Tomato
    "#9932CC", // Dark Orchid
    "#32CD32", // Lime Green
    "#4B0082", // Indigo
    "#FFD700", // Gold
    "#556B2F", // Dark Olive Green
    "#800000", // Maroon
    "#000080", // Navy
    "#40E0D0", // Turquoise
    "#EE82EE", // Violet
    "#DA70D6", // Orchid
  ];

  let color = "green";
  let pointA;
  let point;
  let ownerDirection = elem?.ownerDirection;
  let actionDirection = elem?.actionDirection;
  let ownerCellNo;
  if (type === "playerDirectionalAction") {
    pointA = {
      x: owner.currentPosition.cell.center.x,
      y: owner.currentPosition.cell.center.y,
    };
    ownerCellNo = owner.currentPosition.cell.number;
  }
  if (type === "obstacleBarrierDirectionalAction") {
    let refCell = app.gridInfo.find((x) => x.number.x === elem.locationCell.x && x.number.y === elem.locationCell.y);
    pointA = {
      x: refCell.center.x,
      y: refCell.center.y,
    };
    ownerCellNo = elem.locationCell;
  }
  if (type === "testing") {
    pointA = {
      x: owner.currentPosition.cell.center.x,
      y: owner.currentPosition.cell.center.y,
    };
    ownerDirection = owner.direction;
    actionDirection = elem;
    ownerCellNo = owner.currentPosition.cell.number;
  }
  point = {
    x: ownerCellNo.x * app.tileWidth,
    y: ownerCellNo.y * app.tileWidth,
  };

  // starAngles:
  // top face: 0 = east, 90 = south, 180 = west, 270 = north
  // side face: 0 = south, 90 = top/up, 180 = north/right, 270 = bottom/down
  // front face: 0 = bottom/down, 90 = back/left/west, 180 = top/up, 270 = front/right

  // type args: 'testing'/'playerDirectionalAction'/obstacleBarrierDirectionalAction

  let pointIso;
  let point1Iso;
  let point2Iso;
  const sceneX = app.canvasWidth / 2;
  const sceneY = app.sceneY;
  let offset = { x: app.floorImageWidth / 2, y: app.floorImageHeight };
  let xOffset;
  let yOffset;
  let faceRotation = 0;

  let pointB = {
    x: point.x + sceneX,
    y: point.y + sceneY,
  };

  let degrees = 360;
  if (deg && deg !== 0) {
    degrees = deg;
  }
  const cartesianToIsometric = (cartPt) => {
    let yMod = 2;
    if (face === "top") {
      // yMod = 1.5;
      yMod = 1.75;
      // yMod = 1.25;
      // faceRotation = 15;
    }
    if (face === "side" || face === "front") {
      yMod = 1.25;
    }
    const isoPt = {
      x: cartPt.x - cartPt.y,
      y: (cartPt.x + cartPt.y) / yMod,
    };

    return isoPt;
  };

  const rotatePoint = (x, y, cx, cy, theta) => {
    // Convert angle to radians
    var thetaRad = (Math.PI / 180) * theta;

    // Apply rotation transformation
    var xRotated = (x - cx) * Math.cos(thetaRad) - (y - cy) * Math.sin(thetaRad) + cx;
    var yRotated = (x - cx) * Math.sin(thetaRad) + (y - cy) * Math.cos(thetaRad) + cy;

    return { x: xRotated, y: yRotated };
  };

  const getPointOnArc = (originX, originY, radius, angle, fraction) => {
    let radians;
    if (direction === "clockwise") {
      radians = (angle + fraction * degrees) * (Math.PI / 180);
    } else {
      radians = (angle - fraction * degrees) * (Math.PI / 180);
    }

    const X = originX + radius * Math.cos(radians);
    const Y = originY + radius * Math.sin(radians);
    return { x: X, y: Y };
  };

  const getLineXYatPercent = (startPt, endPt, num, den) => {
    const percent = Math.round((num / den) * 10) / 10;
    let dx = endPt.x - startPt.x;
    let dy = endPt.y - startPt.y;
    let X = startPt.x + dx * percent;
    let Y = startPt.y + dy * percent;
    return { x: Math.round(X), y: Math.round(Y) };
  };
  if (mode === "isometric") {
    // xOffset = offset.x / 2 + 12;
    // yOffset = offset.y / 2 + 8;
    xOffset = -2;
    yOffset = offset.y / 2;

    color = "blue";
  }
  if (mode === "cartesian") {
    point = pointA;
  }

  const innerRadius = radiusA - 15;
  let incr = 0;
  let connectingLineIncr = 0;

  let count = 0;
  let limit = 0;
  if (type === "testing") {
    count = app.testCount.count;
    limit = app.testCount.limit;
  }
  if (type === "playerDirectionalAction" || type === "obstacleBarrierDirectionalAction") {
    count = elem.counter.count;
    limit = elem.counter.limit;
  }

  incr = count / limit;
  connectingLineIncr = limit;

  let point1 = getPointOnArc(point.x, point.y, radiusA, startAng, incr);
  let point2 = getPointOnArc(point.x, point.y, innerRadius, startAng, incr);

  if (face === "front") {
    faceRotation = 60;
    color = "yellow";
  }
  if (face === "side") {
    faceRotation = 120;
    color = "pink";
  }
  if (type === "playerDirectionalAction" || type === "obstacleBarrierDirectionalAction") {
    color = elem.color;
  }

  let connectingLineArray = [];

  const arcStep = (incr * 100).toFixed(0);

  if (mode === "isometric") {
    pointIso = cartesianToIsometric(point);

    point1Iso = cartesianToIsometric(point1);

    point2Iso = cartesianToIsometric(point2);

    point = pointIso;
    point1 = point1Iso;
    point2 = point2Iso;

    point.x += sceneX;
    point.y += sceneY;

    point1.x += sceneX;
    point1.y += sceneY;

    point2.x += sceneX;
    point2.y += sceneY;

    point.x += xOffset;
    point.y -= yOffset;
    point1.x += xOffset;
    point1.y -= yOffset;
    point2.x += xOffset;
    point2.y -= yOffset;

    let yDiff = point.y - pointA.y;
    point.y -= yDiff;
    point1.y -= yDiff;
    point2.y -= yDiff;

    if (faceRotation > 0) {
      point1 = rotatePoint(point1.x, point1.y, point.x, point.y, faceRotation);
      point2 = rotatePoint(point2.x, point2.y, point.x, point.y, faceRotation);
    }
  }

  if (shape === "ringSection") {
    if (count === 1 || count === limit) {
      for (let i = 0; i < connectingLineIncr; i++) {
        let point3 = getLineXYatPercent(point2, point1, i, connectingLineIncr);

        connectingLineArray.push(point3);
      }
    }
  }

  if (shape === "sector") {
    for (let i = 0; i < connectingLineIncr; i++) {
      let point3 = getLineXYatPercent(point, point1, i, connectingLineIncr);

      connectingLineArray.push(point3);
    }
  }

  // UNDER SLASHES ADJUSTED UP
  if (
    (type === "playerDirectionalAction" || type === "obstacleBarrierDirectionalAction") &&
    (face === "front" || face === "side") &&
    elem.actionDirectionType === "slash" &&
    ownerDirection === app.getOppositeDirection(actionDirection)
  ) {
    point.y -= 30;
    point1.y -= 30;
    point2.y -= 30;
    pointA.y -= 30;
  }

  // console.log("sceneX", sceneX, "sceneY", sceneY);
  // console.log("pointA", pointA.x.toFixed(2), pointA.y.toFixed(2));
  // console.log("point", point.x.toFixed(2), point.y.toFixed(2));
  // console.log("point1", point1.x.toFixed(2), point1.y.toFixed(2));

  if (type === "testing") {
    // app.testDraw.push(
    //   {
    //     color: color,
    //     x: point1.x,
    //     y: point1.y,
    //   },
    //   {
    //     color: color,
    //     x: point.x,
    //     y: point.y,
    //   },
    //   {
    //     color: "red",
    //     x: pointA.x,
    //     y: pointA.y,
    //   },
    //   {
    //     color: "purple",
    //     x: pointB.x,
    //     y: pointB.y,
    //   }
    // );
    if (shape === "arc") {
      app.testDraw.push({
        type: "arcCrementer",
        color: color,
        x: point1.x,
        y: point1.y,
      });
    }

    if (shape === "ringSection" || shape === "sector") {
      app.testDraw.push({
        type: "arcCrementer",
        color: "purple",
        x: point1.x,
        y: point1.y,
        x2: point2.x,
        y2: point2.y,
        lineArray: connectingLineArray,
      });
    }
  }
  if (type === "playerDirectionalAction" || type === "obstacleBarrierDirectionalAction") {
    if (shape === "arc") {
      elem.points.push({
        color: color,
        x: point1.x,
        y: point1.y,
      });
    }
    if (shape === "ringSection" || shape === "sector") {
      elem.points.push({
        color: color,
        x: point1.x,
        y: point1.y,
        x2: point2.x,
        y2: point2.y,
        lineArray: connectingLineArray,
      });
    }
  }

  if (type === "playerDirectionalAction") {
    let el = owner.actionDirectionAnimationArray.find((x) => x.id === elem.id);
    el = elem;
  }
  if (type === "obstacleBarrierDirectionalAction") {
    owner = elem;
  }

  return owner;
}
