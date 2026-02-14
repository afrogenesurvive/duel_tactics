export function redrawSettingsGrid(app, canvas3, context3, canvas4, context4) {
  // console.log('redrawSettingsGrid',app.settingsFormPlyrStartPosList);

  let takenSpaces = [];
  for (const elem of app.settingsFormPlyrStartPosList) {
    takenSpaces.push({
      plyrNo: elem.plyrNo,
      type: "start",
      pos: {
        x: elem.selected.x,
        y: elem.selected.y,
      },
    });
  }
  for (const elem2 of app.settingsFormAiStartPosList) {
    let humanPlyrCount = app.settingsFormPlyrStartPosList.length;
    let plyrNo = humanPlyrCount + elem2.plyrNo;

    for (const elem3 of elem2.selected) {
      takenSpaces.push({
        plyrNo: plyrNo,
        type: elem3.type,
        pos: {
          x: elem3.cell.x,
          y: elem3.cell.y,
        },
      });
    }
  }

  let floorImageWidth = app.floorImageWidth;
  let floorImageHeight = app.floorImageHeight;
  let wallImageWidth = app.wallImageWidth;
  let wallImageHeight = app.wallImageHeight;
  let sceneX = app.settingsSceneX;
  let sceneY = app.settingsSceneY;
  let tileWidth = app.tileWidth;

  let wall = app.wallRef.current;
  let wall2 = app.wall2Ref.current;
  let wall3 = app.wall3Ref.current;

  let floorImgs = app.floorImgs;
  let obstacleImgs = app.obstacleImgs;
  let barrierImgs = app.barrierImgs;

  class Point {
    constructor(x, y) {
      app.x = x;
      app.y = y;
    }
  }

  for (var x = 0; x < app.settingsGridWidth + 1; x++) {
    for (var y = 0; y < app.settingsGridWidth + 1; y++) {
      let p2 = new Point();
      p2.x = x * (tileWidth / 2);
      p2.y = y * (tileWidth / 2);

      let iso2 = app.cartesianToIsometric(p2);
      let offset2 = { x: floorImageWidth / 2 / 2, y: floorImageHeight / 2 };

      // apply offset to center scene for a better view
      iso2.x += sceneX;
      iso2.y += sceneY;

      let center2 = {
        x: iso2.x - offset2.x / 2 + app.cellCenterOffsetX / 2,
        y: iso2.y - offset2.y / 2 - app.cellCenterOffsetY / 2,
      };

      let cell = app.settingsGridInfo.find(
        (elem) => elem.number.x === x && elem.number.y === y,
      );
      let cellLevelData = app.settingsGridInfo.find(
        (elem) => elem.number.x === x && elem.number.y === y,
      ).levelData;

      let floor = floorImgs[cell.terrain.name];

      if (cell.void.state === true) {
        // drawFloor = false;
        floor = floorImgs.void3;
      }

      if (x === app.gridWidth && y === app.gridWidth) {
        floor = floorImgs.void2;
      }
      if (x === app.gridWidth && y === 0) {
        floor = floorImgs.void2;
      }

      context3.drawImage(floor, iso2.x - offset2.x, iso2.y - offset2.y, 50, 50);

      context3.fillStyle = "black";
      context3.fillText(
        "" + x + "," + y + "",
        iso2.x - offset2.x / 2 + 5,
        iso2.y - offset2.y / 2 + 2,
      );

      // context3.fillStyle = "black";
      // context3.fillRect(center2.x, center2.y,2.5,2.5);

      if (context4) {
        context4.drawImage(floor, iso2.x - offset2.x, iso2.y - offset2.y, 50, 50);
        context4.fillStyle = "black";
        context4.fillText(
          "" + x + "," + y + "",
          iso2.x - offset2.x / 2 + 5,
          iso2.y - offset2.y / 2 + 2,
        );
      }

      let vertices = [
        { x: center2.x, y: center2.y + app.tileWidth / 4 },
        { x: center2.x + app.tileWidth / 2, y: center2.y },
        { x: center2.x, y: center2.y - app.tileWidth / 4 },
        { x: center2.x - app.tileWidth / 2, y: center2.y },
      ];

      for (const vertex of vertices) {
        context3.fillStyle = "yellow";
        context3.fillRect(vertex.x - 1.5, vertex.y - 1.5, 2.5, 2.5);
        if (context4) {
          context4.fillStyle = "yellow";
          context4.fillRect(vertex.x - 1.5, vertex.y - 1.5, 2.5, 2.5);
        }
      }

      // TAKEN POSITIONS HIGHLIGHT!!
      let floorHighlight;
      for (const space of takenSpaces) {
        if (x === space.pos.x && y === space.pos.y) {
          switch (space.plyrNo) {
            case 1:
              floorHighlight = "blue";
              break;
            case 2:
              floorHighlight = "red";
              break;
            case 3:
              floorHighlight = "green";
              break;
            case 4:
              floorHighlight = "purple";
              break;
            case 5:
              floorHighlight = "orange";
              break;
            case 6:
              floorHighlight = "black";
              break;
          }
          context3.lineWidth = 5;
          context3.beginPath();
          if (context4) {
            context4.lineWidth = 5;
            context4.beginPath();
          }
          for (const vertex of vertices) {
            context3.strokeStyle = floorHighlight;
            context3.lineTo(vertex.x, vertex.y);
            if (context4) {
              context4.strokeStyle = floorHighlight;
              context4.lineTo(vertex.x, vertex.y);
            }
          }
          context3.closePath();
          context3.stroke();
          if (context4) {
            context4.closePath();
            context4.stroke();
          }
        }
      }

      // BARRIERS & OBSTACLES

      if (cell.obstacle.state === true && cell.void.state !== true) {
        // let offset = {x: wallImageWidth/4, y: wallImageHeight/2}
        let obstacleImg = obstacleImgs[cell.obstacle.type];

        context3.drawImage(
          obstacleImg,
          iso2.x - offset2.x,
          iso2.y - obstacleImg.height / 2,
          obstacleImg.width / 2,
          obstacleImg.height / 2,
        );
        if (context4) {
          context4.drawImage(
            obstacleImg,
            iso2.x - offset2.x,
            iso2.y - obstacleImg.height / 2,
            obstacleImg.width / 2,
            obstacleImg.height / 2,
          );
        }
      }

      if (cell.barrier.state === true && cell.void.state !== true) {
        let barrierImg = barrierImgs[cell.barrier.type][cell.barrier.position];
        context3.drawImage(
          barrierImg,
          iso2.x - offset2.x,
          iso2.y - barrierImg.height / 2,
          barrierImg.width / 2,
          barrierImg.height / 2,
        );
        if (context4) {
          context4.drawImage(
            barrierImg,
            iso2.x - offset2.x,
            iso2.y - barrierImg.height / 2,
            barrierImg.width / 2,
            barrierImg.height / 2,
          );
        }
      }
    }
  }

  app.setState({
    stateUpdater: "..",
  });
}
