export function getVoidCenter(app, range, direction, originCenter) {
  let voidCenter = {
    x: undefined,
    y: undefined,
  };
  let xMod = app.floorImageWidth / 2;
  let yMod = app.floorImageHeight / 2;
  if (range === 2) {
    xMod = app.floorImageWidth;
    yMod = app.floorImageHeight;
  }
  switch (direction) {
    case "north":
      voidCenter = {
        x: originCenter.x + xMod,
        y: originCenter.y - yMod,
      };
      break;
    case "south":
      voidCenter = {
        x: originCenter.x - xMod,
        y: originCenter.y + yMod,
      };
      break;
    case "west":
      voidCenter = {
        x: originCenter.x - xMod,
        y: originCenter.y - yMod,
      };
      break;
    case "east":
      voidCenter = {
        x: originCenter.x + xMod,
        y: originCenter.y + yMod,
      };
      break;
  }

  return voidCenter;
}
