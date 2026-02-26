export function getBoltTarget(app, bolt) {
  // console.log('get bolt target');

  let index = app.projectiles.findIndex((blt) => blt.id === bolt.id);

  let path = [];
  let originCell = {
    x: bolt.moving.origin.number.x,
    y: bolt.moving.origin.number.y,
  };

  bolt.target.path.push({
    number: {
      x: originCell.x,
      y: originCell.y,
    },
    center: {
      x: 0,
      y: 0,
    },
    vertices: [],
  });

  let nextCell = {
    number: {
      x: 0,
      y: 0,
    },
    center: {
      x: 0,
      y: 0,
    },
    vertices: [],
  };
  while (nextCell.number.x >= 0 && nextCell.number.y >= 0 && nextCell.number.x <= app.gridWidth && nextCell.number.y <= app.gridWidth) {
    // console.log(originCell.x,originCell.y);
    let cell = {
      number: {
        x: 0,
        y: 0,
      },
      center: {
        x: 0,
        y: 0,
      },
      vertices: [],
    };

    // cell.number = app.getCellFromDirection(1,originCell.number,app.players[bolt.owner-1].direction);
    cell.number = app.getCellFromDirection(1, originCell, bolt.direction);

    nextCell = cell;
    originCell = nextCell.number;
    bolt.target.path.push(cell);
  }
  if (bolt.target.path.length > 1) {
    bolt.target.path.splice(bolt.target.path.length - 1, 1);
  }

  // console.log('bolt path',bolt.target.path);

  for (const cell2 of bolt.target.path) {
    let cell = app.gridInfo.find((elem) => elem.number.x === cell2.number.x && elem.number.y === cell2.number.y);

    if (cell) {
      cell2.center.x = cell.center.x;
      cell2.center.y = cell.center.y;
      cell2.vertices = cell.vertices;
    }
  }
  if (bolt.target.path.length === 1) {
    bolt.target.path.push({
      number: app.getCellFromDirection(1, bolt.target.path[0].number, bolt.direction),
      center: app.getVoidCenter(1, bolt.direction, bolt.target.path[0].center),
      vertices: [],
    });
  }

  bolt.moving.state = true;

  app.projectiles[index] = bolt;
}
