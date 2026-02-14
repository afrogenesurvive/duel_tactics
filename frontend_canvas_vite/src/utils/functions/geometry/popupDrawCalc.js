export function popupDrawCalc(app, position, playerOrigin, plyrNo) {
  let offset = (app.playerDrawWidth - app.popupSize) / 2;
  let pointerLength = app.popupSize / 3;
  let offset2 = pointerLength + offset;

  let playerCorners = [
    { x: playerOrigin.x, y: playerOrigin.y },
    { x: undefined, y: undefined },
    { x: undefined, y: undefined },
    { x: undefined, y: undefined },
  ];

  playerCorners[1] = {
    x: playerCorners[0].x + app.playerDrawWidth,
    y: playerCorners[0].y,
  };
  playerCorners[2] = {
    x: playerCorners[1].x,
    y: playerCorners[1].y + app.playerDrawHeight,
  };
  playerCorners[3] = {
    x: playerCorners[0].x,
    y: playerCorners[0].y + app.playerDrawHeight,
  };

  let popupCoords = {
    playerOrigin: playerCorners[0],
    origin: { x: undefined, y: undefined },
    pt2: { x: undefined, y: undefined },
    pt3: { x: undefined, y: undefined },
    pt4: { x: undefined, y: undefined },
    anchor: { x: undefined, y: undefined },
    midpoint: { x: undefined, y: undefined },
  };
  let midpoint;

  switch (position) {
    case "northWest":
      popupCoords.origin = {
        x: playerCorners[0].x + offset,
        y: playerCorners[0].y - (app.popupSize + offset2),
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.pt3.x + (popupCoords.pt4.x - popupCoords.pt3.x) * 0.5,
        y: popupCoords.pt3.y + (popupCoords.pt4.y - popupCoords.pt3.y) * 0.5,
      };
      popupCoords.anchor = {
        x: midpoint.x,
        y: midpoint.y + pointerLength,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
    case "southEast":
      popupCoords.origin = {
        x: playerCorners[3].x + offset,
        y: playerCorners[3].y + offset2,
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.origin.x + (popupCoords.pt2.x - popupCoords.origin.x) * 0.5,
        y: popupCoords.origin.y + (popupCoords.pt2.y - popupCoords.origin.y) * 0.5,
      };
      popupCoords.anchor = {
        x: midpoint.x,
        y: midpoint.y - pointerLength,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
    case "northEast":
      popupCoords.origin = {
        x: playerCorners[1].x + offset2,
        y: playerCorners[1].y + offset,
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.origin.x + (popupCoords.pt4.x - popupCoords.origin.x) * 0.5,
        y: popupCoords.origin.y + (popupCoords.pt4.y - popupCoords.origin.y) * 0.5,
      };
      popupCoords.anchor = {
        x: midpoint.x - pointerLength,
        y: midpoint.y,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
    case "southWest":
      popupCoords.origin = {
        x: playerCorners[0].x - (offset2 + app.popupSize),
        y: playerCorners[0].y + offset,
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.pt2.x + (popupCoords.pt3.x - popupCoords.pt2.x) * 0.5,
        y: popupCoords.pt2.y + (popupCoords.pt3.y - popupCoords.pt2.y) * 0.5,
      };
      popupCoords.anchor = {
        x: midpoint.x + pointerLength,
        y: midpoint.y,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
    case "west":
      popupCoords.origin = {
        x: playerCorners[0].x - (offset2 + app.popupSize),
        // y: playerCorners[0].y,
        y: playerCorners[0].y - app.popupSize - 5,
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.pt2.x + (popupCoords.pt3.x - popupCoords.pt2.x) * 0.5,
        y: popupCoords.pt2.y + (popupCoords.pt3.y - popupCoords.pt2.y) * 0.5,
      };
      popupCoords.anchor = {
        x: popupCoords.pt3.x + pointerLength,
        y: popupCoords.pt3.y,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
    case "north":
      popupCoords.origin = {
        x: playerCorners[1].x + offset2,
        y: playerCorners[1].y - app.popupSize - 5,
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.pt2.x + (popupCoords.pt3.x - popupCoords.pt2.x) * 0.5,
        y: popupCoords.pt2.y + (popupCoords.pt3.y - popupCoords.pt2.y) * 0.5,
      };
      popupCoords.anchor = {
        x: popupCoords.pt4.x - pointerLength,
        y: popupCoords.pt4.y,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
    case "south":
      popupCoords.origin = {
        x: playerCorners[3].x - (app.popupSize + offset2),
        y: playerCorners[3].y + 5,
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.pt2.x + (popupCoords.pt3.x - popupCoords.pt2.x) * 0.5,
        y: popupCoords.pt2.y + (popupCoords.pt3.y - popupCoords.pt2.y) * 0.5,
      };
      popupCoords.anchor = {
        x: popupCoords.pt2.x + pointerLength,
        y: popupCoords.pt2.y,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
    case "east":
      popupCoords.origin = {
        x: playerCorners[2].x + offset2,
        y: playerCorners[2].y + 5,
      };
      popupCoords.pt2 = {
        x: popupCoords.origin.x + app.popupSize,
        y: popupCoords.origin.y,
      };
      popupCoords.pt3 = {
        x: popupCoords.pt2.x,
        y: popupCoords.pt2.y + app.popupSize,
      };
      popupCoords.pt4 = {
        x: popupCoords.origin.x,
        y: popupCoords.origin.y + app.popupSize,
      };
      midpoint = {
        x: popupCoords.pt2.x + (popupCoords.pt3.x - popupCoords.pt2.x) * 0.5,
        y: popupCoords.pt2.y + (popupCoords.pt3.y - popupCoords.pt2.y) * 0.5,
      };
      popupCoords.anchor = {
        x: popupCoords.origin.x - pointerLength,
        y: popupCoords.origin.y,
      };
      popupCoords.midpoint = {
        x: midpoint.x,
        y: midpoint.y,
      };
      break;
  }

  return popupCoords;
}
