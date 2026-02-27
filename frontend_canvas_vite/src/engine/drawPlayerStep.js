import { drawCellsUnderAttackHighlight } from "./drawPlayerStep/drawCellsUnderAttackHighlight.js";
import { drawDepthSorting } from "./drawPlayerStep/drawDepthSorting.js";
import { processPlayerSpriteSheet } from "./drawPlayerStep/processPlayerSpriteSheet.js";
import { drawPlayerPopups } from "./drawPlayerStep/drawPlayerPopups.js";
import { drawObstaclesBarriers } from "./drawPlayerStep/drawObstaclesBarriers.js";

export function drawPlayerStep(app, playerNumber, canvas, context, canvas2, context2) {
  // console.log('drawing player step',playerNumber);

  let gridInfo = [];
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  let wall = app.wallRef.current;
  let wall2 = app.wall2Ref.current;
  let wall3 = app.wall3Ref.current;

  canvas.width = app.canvasWidth;
  canvas.height = app.canvasHeight;
  canvas2.width = app.canvasWidth;
  canvas2.height = app.canvasHeight;

  let floorImageWidth = app.floorImageWidth;
  let floorImageHeight = app.floorImageHeight;
  let wallImageWidth = app.wallImageWidth;
  let wallImageHeight = app.wallImageHeight;
  let sceneX = app.canvasWidth / 2;
  let sceneY = app.sceneY;
  let tileWidth = app.tileWidth;

  gridInfo = app.gridInfo;

  let player = app.players[playerNumber - 1];

  let updatedPlayerImg;
  let newDirection;

  if (player.falling.state === true) {
    // console.log('player',player.number,'falling count',player.falling.count,'limit',player.falling.limit,'position',player.nextPosition,'action',player.action);
    if (player.falling.count === player.falling.limit) {
      app.killPlayer(player);
    }
  }

  context.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
  context2.clearRect(0, 0, app.canvasWidth, app.canvasHeight);

  context.translate(app.camera.zoomFocusPan.x, app.camera.zoomFocusPan.y);
  context2.translate(app.camera.zoomFocusPan.x, app.camera.zoomFocusPan.y);

  context.scale(app.camera.zoom.x, app.camera.zoom.y);
  context2.scale(app.camera.zoom.x, app.camera.zoom.y);

  for (var x = 0; x < app.gridWidth + 1; x++) {
    for (var y = 0; y < app.gridWidth + 1; y++) {
      let p = new Point();
      p.x = x * tileWidth;
      p.y = y * tileWidth;
      let iso = app.cartesianToIsometric(p);

      if (app.showGridIsoGuide === true) {
        context.font = "15px Arial";
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(iso.x + sceneX, iso.y + sceneY, 3, 0, 2 * Math.PI);
        context.fill();
        context.fillText("" + x + "," + y + "", iso.x + sceneX - 25, iso.y + sceneY - 5);

        context.fillStyle = "white";
        context.beginPath();
        context.arc(p.x + sceneX, p.y + sceneY, 3, 0, 2 * Math.PI);
        context.fill();
        context.fillText("" + x + "," + y + "", p.x + sceneX, p.y + sceneY - 5);
      }

      let offset = { x: floorImageWidth / 2, y: floorImageHeight };
      iso.x += sceneX;
      iso.y += sceneY;
      let center = {
        x: iso.x - offset.x / 2 + 23,
        y: iso.y - offset.y / 2 - 2,
      };

      let floor;
      let drawFloor = true;
      let gridInfoCell = app.gridInfo.find((elem) => elem.number.x === x && elem.number.y === y);
      gridInfoCell.center = center;
      gridInfoCell.drawCenter = center;
      floor = app.floorImgs[gridInfoCell.terrain.name];

      // VOID
      // FLOOR
      if (gridInfoCell.void.state === true) {
        // drawFloor = false;
        floor = app.floorImgs.void3;
      }
      //BLINKER!!
      if (app.cellToVoid.state === true && app.cellToVoid.x === x && app.cellToVoid.y === y) {
        if (app.cellToVoid.count === 1) {
          if (
            !app.cellPopups.find(
              (x) => x.msg === "cellVoiding" && x.cell.number.x === gridInfoCell.number.x && x.cell.number.y === gridInfoCell.number.y,
            )
          ) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "cellVoiding",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === gridInfoCell.number.x && x.number.y === gridInfoCell.number.y),
            });
          }
        }
        if (app.cellToVoid.count % 5 === 0) {
          floor = app.floorImgs.void3;
          // drawFloor = false;
        } else {
          floor = app.floorImgs.void2;
          // drawFloor = true;
        }
      }

      // DROWNING
      for (const plyrb of app.players) {
        if (plyrb.drowning === true) {
          if (plyrb.currentPosition.cell.number.x === x && plyrb.currentPosition.cell.number.y === y) {
            // console.log('player',plyrb.number,'drowning count',plyrb.falling.count,'position',plyrb.nextPosition);
            if (plyrb.falling.count % 2 === 0) {
              // drawFloor = false;
              floor = app.floorImgs.void3;
            } else {
              // floor = floorImgs.stone
              floor = app.floorImgs[gridInfoCell.terrain.name];
            }
          }
        }
      }

      // FALLING OBSTACLE DEEP BLINKER
      if (gridInfoCell.obstacle.state === true && gridInfoCell.obstacle.moving.falling.state === true && gridInfoCell.terrain.type === "deep") {
        if (gridInfoCell.obstacle.moving.falling.count % 3 === 0) {
          floor = app.floorImgs.void3;
        } else {
          floor = app.floorImgs[gridInfoCell.terrain.name];
        }
      }

      floor = drawCellsUnderAttackHighlight(app, x, y, floor);

      // FLOOR
      if (drawFloor === true) {
        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);
      }

      // RUBBLE
      if (gridInfoCell.rubble === true) {
        context.drawImage(app.floorImgs.rubble, iso.x - offset.x, iso.y - offset.y);
      }

      // CELL COORD LABEL
      context.font = "10px Arial";
      context.fillStyle = "black";
      context.fillText("" + x + "," + y + "", iso.x - offset.x / 2 + 18, iso.y - offset.y / 2 + 12);

      context.fillStyle = "black";
      context.fillRect(center.x, center.y, 5, 5);

      // CELL VERTEX POINTS
      let vertices = [
        { x: center.x, y: center.y + tileWidth / 2 },
        { x: center.x + tileWidth, y: center.y },
        { x: center.x, y: center.y - tileWidth / 2 },
        { x: center.x - tileWidth, y: center.y },
      ];
      for (const vertex of vertices) {
        context.fillStyle = "yellow";
        context.fillRect(vertex.x - 2.5, vertex.y - 2.5, 5, 5);
      }
      gridInfoCell.vertices = vertices;

      // TARGET HIGHLIGHT!!
      let floorHighlight;
      for (const plyr3 of app.players) {
        if (x === plyr3.target.cell1.number.x && y === plyr3.target.cell1.number.y) {
          if (plyr3.ai.state !== true && plyr3.dead.state !== true && plyr3.falling.state !== true && plyr3.drowning !== true) {
            switch (plyr3.number) {
              case 1:
                floorHighlight = "purple";
                break;
              case 2:
                floorHighlight = "red";
                break;
            }
          }
          if (plyr3.ai.state === true && plyr3.dead.state !== true && plyr3.falling.state !== true && plyr3.drowning !== true) {
            floorHighlight = "brown";
          }
          if (plyr3.dead.state !== true) {
            context.lineWidth = 5;
            context.beginPath();
            for (const vertex of vertices) {
              context.strokeStyle = floorHighlight;

              context.lineTo(vertex.x, vertex.y);
            }
            context.closePath();
            context.stroke();
          }
        }
      }

      // MOUSED OVER CELL
      if (app.mouseOverCell.state === true && x === app.mouseOverCell.cell.number.x && y === app.mouseOverCell.cell.number.y) {
        context.lineWidth = 5;
        context.beginPath();
        for (const vertex of vertices) {
          context.strokeStyle = "orange";
          context.lineTo(vertex.x, vertex.y);
        }
        context.closePath();
        context.stroke();
      }

      // IN GAME ITEM PLACEMENT!!
      if (gridInfoCell.item.name !== "" && gridInfoCell.void.state !== true) {
        let hide = false;
        if (app.obstacleItemsToDrop.length > 0) {
          for (const cell of app.obstacleItemsToDrop) {
            if (gridInfoCell.number.x === cell.target.x && gridInfoCell.number.y === cell.target.y && gridInfoCell.item.name === cell.item.name) {
              hide = true;
            }
          }
        }

        if (hide !== true) {
          // console.log("Drawing item:", gridInfoCell.item);
          let itemImg;
          let fillClr;
          if (gridInfoCell.item.type === "item") {
            switch (gridInfoCell.item.name) {
              case "moveSpeedUp":
                fillClr = "purple";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "moveSpeedDown":
                fillClr = "blue";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "hpUp":
                fillClr = "yellow";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "hpDown":
                fillClr = "brown";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "focusUp":
                fillClr = "white";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "focusDown":
                fillClr = "black";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "strengthUp":
                fillClr = "green";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "strengthDown":
                fillClr = "red";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "ammo5":
                fillClr = "#283618";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "ammo10":
                fillClr = "#283618";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
            }
          } else if (gridInfoCell.item.type === "weapon") {
            switch (gridInfoCell.item.subType) {
              case "sword":
                fillClr = "orange";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "spear":
                fillClr = "maroon";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "crossbow":
                fillClr = "navy";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
            }
          } else if (gridInfoCell.item.type === "armor") {
            switch (gridInfoCell.item.subType) {
              case "helmet":
                fillClr = "grey";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "mail":
                fillClr = "olive";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "greaves":
                fillClr = "#b5179e";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
            }
          }

          context.drawImage(itemImg, center.x - 15, center.y - 15);

          // context.fillStyle = fillClr;
          // context.beginPath();
          // context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
          // context.fill();
        }
      }

      //POPUPS
      // CELL HIGHLIGHT
      for (const popup of app.cellPopups) {
        if (popup.state === true && x === popup.cell.number.x && y === popup.cell.number.y) {
          context.lineWidth = 5;
          context.beginPath();
          for (const vertex of vertices) {
            context.strokeStyle = popup.color;
            context.lineTo(vertex.x, vertex.y);
          }
          context.closePath();
          context.stroke();
        }
      }
      // // CELL POPUPS?

      // DRAWN PLAYERS!!
      const playerDrawLog = (
        x,
        y,
        plyr,
        finalAnimIndex,
        updatedPlayerImg,
        sx,
        sy,
        sWidth,
        sHeight,
        pointxthisplayerDrawWidth2,
        pointythisplayerDrawHeight2,
        thisplayerDrawWidth,
        thisplayerDrawHeight,
      ) => {
        console.log("** playerDrawLog **");
        // console.log("-- player --", plyr.number);
        // console.log("-- strafing --", plyr.strafing.state);
        // console.log("-- turning --", plyr.turning.state);
        console.log("-- currently drawing --", x, y);
        // console.log(
        //   "-- current position --",
        //   plyr.currentPosition.cell.number.x,
        //   plyr.currentPosition.cell.number.y
        // );
        // console.log("-- moving state --", plyr.moving.state);
        // console.log("-- moving step --", plyr.moving.step);
        // console.log("-- target --", plyr.target.cell1.number.x, plyr.target.cell1.number.y);
        // console.log("-- direction --", plyr.direction);
        console.log("-- origin --", plyr.moving.origin.number.x, plyr.moving.origin.number.y);
        // console.log("-- action --", plyr.action);
        // console.log("updatedPlayerImg", updatedPlayerImg);

        // console.log("finalAnimIndex", finalAnimIndex);
        // console.log("updatedPlayerImg", updatedPlayerImg);
        // console.log("sx", sx);
        // console.log("sy", sy);
        // console.log("sWidth", sWidth);
        // console.log("sHeight", sHeight);
        // console.log("point.x - app.playerDrawWidth / 2", pointxthisplayerDrawWidth2);
        // console.log("point.y - app.playerDrawHeight / 2", pointythisplayerDrawHeight2);
        // console.log("app.playerDrawWidth", thisplayerDrawWidth);
        // console.log("app.playerDrawHeight", thisplayerDrawHeight);
      };

      for (let plyr of app.players) {
        let point = {
          x: plyr.nextPosition.x,
          y: plyr.nextPosition.y,
        };
        let newCharDrawPoint = {
          x: plyr.nextPosition.x - app.floorImageHeight / 2,
          y: plyr.nextPosition.y - app.floorImageHeight,
        };

        let weapon = plyr.currentWeapon.type;
        if (plyr.currentWeapon.type === "" || !plyr.currentWeapon.type) {
          weapon = "unarmed";
        }

        let finalAnimIndex;

        if (plyr.attacking.state === true && plyr.success.deflected.state !== true) {
          plyr.action = "attacking";
        }

        ({ updatedPlayerImg, finalAnimIndex } = processPlayerSpriteSheet(app, plyr, x, y, finalAnimIndex, weapon, updatedPlayerImg));

        // SET SPRITE SHEET CLIP LOCATION!
        let dirs = ["north", "south", "east", "west"];
        let dirIndex = dirs.indexOf(plyr.direction);
        let sHeight = app.charSpriteHeight;
        let sWidth = app.charSpriteWidth;
        let sy = dirIndex * sHeight;
        let sx = (finalAnimIndex - 1) * sWidth;

        // PLAYER OUTLINES
        if (app.showPlayerOutlines === true) {
          // PLAYER OUTLINES
          let popupCoordObject = {
            north: app.popupDrawCalc("north", { x: plyr.nextPosition.x - 25, y: plyr.nextPosition.y - 25 }, plyr.number),
            west: app.popupDrawCalc("west", { x: plyr.nextPosition.x - 25, y: plyr.nextPosition.y - 25 }, plyr.number),
            south: app.popupDrawCalc("south", { x: plyr.nextPosition.x - 25, y: plyr.nextPosition.y - 25 }, plyr.number),
          };
          let origin = popupCoordObject.west;
          let width = popupCoordObject.north.pt4.x - origin.pt3.x;
          let height = popupCoordObject.south.pt2.y - origin.pt3.y;
          context2.strokeStyle = "red";
          context2.lineWidth = 2;
          context2.beginPath();
          context2.roundRect(origin.pt3.x, origin.pt3.y, width, height, 2);
          context2.stroke();

          let origin2 = {
            x: plyr.nextPosition.x - app.floorImageHeight / 2,
            y: plyr.nextPosition.y - app.floorImageHeight,
          };
          let height2 = plyr.nextPosition.y + app.floorImageHeight / 2 + 2 - (plyr.nextPosition.y - app.floorImageHeight);
          let width2 = app.playerDrawWidth + 2;
          context2.strokeStyle = "blue";
          context2.lineWidth = 2;
          context2.beginPath();
          context2.roundRect(origin2.x, origin2.y, width2 + 2, app.playerDrawHeight * 1.5, 2);
          // context2.roundRect(origin2.x, origin2.y, width2, height2, 2);
          // context2.roundRect(
          //   origin2.x,
          //   origin2.y,
          //   app.playerDrawWidth,
          //   app.playerDrawHeight * 1.5,
          //   2
          // );
          // context2.roundRect(
          //   origin2.x,
          //   origin2.y,
          //   app.playerDrawWidth + 2,
          //   app.floorImageHeight * 1.5,
          //   2
          // );
          context2.stroke();
        }

        drawDepthSorting(app, plyr, context, context2, updatedPlayerImg, sx, sy, sWidth, sHeight, newCharDrawPoint, x, y);

        // RESPAWN
        if (plyr.respawn === true) {
          if (x === plyr.startPosition.cell.number.x && y === plyr.startPosition.cell.number.y) {
            // console.log('respawning... confirm dead player',plyr.dead.state,x,y);

            let canRespawn = false;
            let positionOccupied = false;
            let respawnPosCellRef = app.gridInfo.find(
              (x) => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y,
            );
            let respawnCellNo;
            let respawnCellCenter;

            for (const plyrx of app.players) {
              if (
                plyrx.currentPosition.cell.number.x === plyr.startPosition.cell.number.x &&
                plyrx.currentPosition.cell.number.y === plyr.startPosition.cell.number.y
              ) {
                positionOccupied = true;
              }
            }
            if (respawnPosCellRef.obstacle.state === true || respawnPosCellRef.terrain.type === "deep" || respawnPosCellRef.void === true) {
              positionOccupied = true;
            }

            if (positionOccupied === true) {
              respawnCellNo = app.getRandomFreeCell();
              respawnPosCellRef = app.gridInfo.find((x) => x.number.x === respawnCellNo.number.x && x.number.y === respawnCellNo.number.y);

              if (respawnCellNo) {
                canRespawn = true;
              } else {
                console.log("no cells for respawn. Unlikely but true. Reassign obstacle cell");
                if (app.gridInfo.filter((x) => x.obstacle.state === true)[0]) {
                  app.gridInfo.filter((x) => x.obstacle.state === true)[0].obstacle.state = false;
                  respawnPosCellRef = app.gridInfo.find((x) => x.number.x === respawnCellNo.number.x && x.number.y === respawnCellNo.number.y);
                  let oldLvlData = app.gridInfo.filter((x) => x.obstacle.state === true)[0].levelData.split("_");
                  oldLvlData[1] = "*";
                  app.gridInfo.filter((x) => x.obstacle.state === true)[0].levelData = oldLvlData.join("_");
                  canRespawn = true;
                } else {
                  console.log("no free cells for respawn and no obstacle cell to comandeer. Highly unlikley");

                  if (app.gridInfo.filter((x) => x.void.state === true)[0]) {
                    app.gridInfo.filter((x) => x.void.state === true)[0].void.state = false;
                    respawnPosCellRef = app.gridInfo.find((x) => x.number.x === respawnCellNo.number.x && x.number.y === respawnCellNo.number.y);
                    let oldLvlData = app.gridInfo.filter((x) => x.void.state === true)[0].levelData.split("_");
                    oldLvlData[3] = "a";
                    app.gridInfo.filter((x) => x.void.state === true)[0].levelData = oldLvlData.join("_");
                    canRespawn = true;
                  }
                }
              }
            } else if ((canRespawn = true && respawnPosCellRef)) {
              canRespawn = true;
            }

            if (canRespawn === true) {
              // console.log('can respawn');
              let respawnPoint = respawnPosCellRef;
              plyr.dead.state = false;
              plyr.currentPosition.cell.number = respawnPoint.number;
              plyr.currentPosition.cell.center = respawnPoint.center;
              plyr.nextPosition = respawnPoint.center;
              app.getTarget(plyr);
              plyr.moving = {
                state: false,
                step: 0,
                course: "",
                origin: {
                  number: {
                    x: respawnPoint.number.x,
                    y: respawnPoint.number.y,
                  },
                  center: {
                    x: respawnPoint.center.x,
                    y: respawnPoint.center.y,
                  },
                },
                destination: {
                  x: app.players[plyr.number - 1].target.cell1.center.x,
                  y: app.players[plyr.number - 1].target.cell1.center.y,
                },
              };
              let origin2 = {
                x: plyr.nextPosition.x - app.floorImageHeight / 2,
                y: plyr.nextPosition.y - app.floorImageHeight,
              };

              plyr.direction = "north";
              plyr.respawn = false;
              app.players[plyr.number - 1] = plyr;

              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                // respawnPoint.center.x - 25,
                // respawnPoint.center.y - 50,
                origin2.x - 5,
                origin2.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );

              if (
                app.camera.customView.state !== true &&
                app.settingAutoCamera === false &&
                plyr.ai.state !== true &&
                app.camera.preInstructions.length === 0 &&
                app.camera.instructions.length === 0
              ) {
                app.setAutoCamera("playerSpawnFocus", plyr);
              } else {
                // console.log("no setting auto cam: playerSpawnFocus");
              }
            }
          }
        }
        // DEAD
        if (plyr.dead.state === true && player.dead.count > 0 && plyr.dead.count < plyr.dead.limit) {
          if (x === plyr.ghost.position.cell.number.x && y === plyr.ghost.position.cell.number.y) {
            // console.log('player',plyr.number,'dying',player.dead.count);
            context2.drawImage(app.indicatorImgs.death, plyr.ghost.position.cell.center.x - 15, plyr.ghost.position.cell.center.y - 15, 25, 25);
          }
        }
        // GHOST
        if (plyr.ghost.state === true && player.dead.count === 0) {
          if (x === plyr.ghost.position.cell.number.x && y === plyr.ghost.position.cell.number.y) {
            // console.log(
            //   "player ",
            //   plyr.number,
            //   "ghost @",
            //   plyr.ghost.position.cell.number,
            //   plyr.ghost.position.cell.center
            // );
            context2.drawImage(app.indicatorImgs.ghost, plyr.ghost.position.cell.center.x - 20, plyr.ghost.position.cell.center.y - 20, 25, 25);
          }
        }

        drawPlayerPopups(app, plyr, player, context2, x, y, point);

        app.players[plyr.number - 1] = plyr;
      }

      // OBSTACLES & BARRIERS

      drawObstaclesBarriers(app, context, context2, x, y, gridInfoCell, iso, offset, center);

      // PROJECTILES
      for (const bolt of app.projectiles) {
        if (bolt.currentPosition.number.x === x && bolt.currentPosition.number.y === y) {
          let boltImg;
          switch (bolt.direction) {
            case "north":
              boltImg = app.boltImgs[bolt.direction];
              break;
            case "south":
              boltImg = app.boltImgs[bolt.direction];
              break;
            case "east":
              boltImg = app.boltImgs[bolt.direction];
              break;
            case "west":
              boltImg = app.boltImgs[bolt.direction];
              break;
          }
          // console.log("dd", boltImg, bolt.direction);

          // context2.fillStyle = "black";
          // context2.fillRect(bolt.currentPosition.center.x, bolt.currentPosition.center.y,10,5);
          // app.testDraw.push({color:'green',x:bolt.currentPosition.center.x,y:bolt.currentPosition.center.y})
          context2.drawImage(boltImg, bolt.currentPosition.center.x - 15, bolt.currentPosition.center.y - 15, 35, 35);
        }
      }

      // CELL POPUPS
      if (app.hideAllPopups !== true) {
        // if (x === 0 && y === 0) {
        if (x === app.gridWidth && y === app.gridWidth) {
          // console.log(app.pickupAmmoRef.current);

          for (const popup of app.cellPopups) {
            let popupBorderColor = "black";
            if (popup.state === true) {
              // console.log("drawing a popup", popup.cell.number);
              // console.log('drawing a popup');
              let popupDrawCoords;
              if (popup.position === "" || !popup.position) {
                let currentPopups = app.cellPopups.filter((x) => x.state === true);
                let currentPopupsThisCell = app.cellPopups.filter(
                  (x) => x.state === true && x.cell.number.x === popup.cell.number.x && x.cell.number.y === popup.cell.number.y,
                );
                let positions = ["north", "east", "south", "west", "northEast", "northWest", "southEast", "southWest"];

                if (popup.color === "") {
                  popup.color = app.cellColorRef.find((x) => x.x === popup.cell.number.x && x.y === popup.cell.number.y).color;
                }

                // REMOVE POSITIONS OF POPUPS ALREADY DRAWN FOR THIS CELL
                for (const popup2 of currentPopupsThisCell) {
                  if (popup2.position && popup2.position !== "") {
                    let indx = positions.indexOf(popup2.position);
                    positions.splice(indx, 1);
                  }
                }

                let dir = undefined;
                let dirs = [];

                for (const plyr2 of app.players) {
                  if (plyr2.ai.state !== true) {
                    let myPos = popup.cell.number;
                    let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;
                    // let invalidPositions = [invalidPos];

                    // GET DIRECTION OF PLAYER CELL RELATIVE TO ME
                    dir = app.getDirectionFromCells(myPos, invalidPos);

                    if (dir && positions.includes(dir) === true) {
                      positions.splice(positions.indexOf(dir), 1);
                      // console.log('dont draw over player @',dir,'choose frome these position',positions);
                    }

                    // GET DIRECTION THAT ALL OTHER PLAYER'S POPUPS OCCUPY, RELATIVE TO ME
                    for (const pop of plyr2.popups) {
                      dir = undefined;

                      if (pop.state === true) {
                        let invalidPos2 = {
                          x: undefined,
                          y: undefined,
                        };

                        invalidPos2 = app.getCellFromDirection(1, invalidPos, pop.position);

                        // let dir = undefined;

                        dir = app.getDirectionFromCells(myPos, invalidPos2);

                        if (dir && positions.includes(dir) === true) {
                          positions.splice(positions.indexOf(dir), 1);
                          // console.log('dont draw over player @',dir,'choose frome these position',positions);
                        }
                      }
                    }
                  }
                }

                // GET DIRECTION OF CELLS THAT AREN'T THIS CELL'S POPUPS' POPUPS CELLS RELATIVE TO ME
                for (const popup2 of currentPopups) {
                  dir = undefined;

                  if (
                    popup.cell.number.x !== popup2.cell.number.x &&
                    popup.cell.number.y !== popup2.cell.number.y &&
                    popup2.msg !== popup.msg &&
                    popup2.state === true
                  ) {
                    let myPos = popup.cell.number;
                    let cellPos = popup2.cell.number;
                    let invalidPos2 = {
                      x: undefined,
                      y: undefined,
                    };

                    invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

                    dir = app.getDirectionFromCells(myPos, invalidPos2);

                    if (dir && positions.includes(dir) === true) {
                      positions.splice(positions.indexOf(dir), 1);
                      // console.log('dont draw over player @',dir,'choose frome these position',positions);
                    }
                  }
                }

                if (!positions[0]) {
                  // console.log('no open positions for', popup.msg);
                  popup.state = false;
                  popup.count = 0;
                } else {
                  popup.position = positions[0];
                }

                popup.img = app.popupImageRef[popup.msg];

                popupDrawCoords = app.popupDrawCalc(popup.position, { x: popup.cell.center.x - 25, y: popup.cell.center.y - 15 }, 0);
                app.drawPopupBubble(
                  context2,
                  popupDrawCoords.origin.x,
                  popupDrawCoords.origin.y,
                  app.popupSize,
                  app.popupSize,
                  5,
                  popupDrawCoords.anchor.x,
                  popupDrawCoords.anchor.y,
                  popup.color,
                );
                // context2.fillStyle = 'black';
                // context2.fillText(""+popup.type+"", popupDrawCoords.origin.x+10, popupDrawCoords.origin.y+5);
                // console.log('popup.msg',popup.msg,popup.img);
                let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;
                context2.drawImage(
                  popup.img,
                  popupDrawCoords.origin.x + centerPopupOffset,
                  popupDrawCoords.origin.y + centerPopupOffset,
                  app.popupImgSize,
                  app.popupImgSize,
                );
              } else {
                let dir = undefined;
                let dirs = [];

                let currentPopupsNotThis = app.cellPopups.filter(
                  (x) =>
                    x.state === true && x.msg !== popup.msg && x.cell.number.x !== popup.cell.number.x && x.cell.number.y !== popup.cell.number.y,
                );

                for (const plyr2 of app.players) {
                  if (plyr2.ai.state !== true) {
                    let myPos = popup.cell.number;
                    let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;

                    // invalidpostions2 push plyr2 position
                    // for player popups
                    //   invalid cell = pop.cell.number + popup position mod, invalposits2 push invalidcell
                    //

                    dir = app.getDirectionFromCells(myPos, invalidPos);

                    dirs.push(dir);

                    for (const pop of plyr2.popups) {
                      if (pop.state === true) {
                        let invalidPos2 = {
                          x: undefined,
                          y: undefined,
                        };

                        invalidPos2 = app.getCellFromDirection(1, invalidPos, pop.position);

                        dir = app.getDirectionFromCells(myPos, invalidPos2);

                        // if (dir && positions.includes(dir) === true) {
                        //   positions.splice(positions.indexOf(dir),1);
                        //   // console.log('dont draw over player @',dir,'choose frome these position',positions);
                        // }
                        dirs.push(dir);
                      }
                    }
                  }
                }

                for (const popup2 of currentPopupsNotThis) {
                  dir = undefined;

                  if (popup2.msg !== popup.msg && popup2.state === true) {
                    let myPos = popup.cell.number;

                    let cellPos = popup2.cell.number;
                    let invalidPos2 = {
                      x: undefined,
                      y: undefined,
                    };

                    invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

                    dir = app.getDirectionFromCells(myPos, invalidPos2);

                    dirs.push(dir);
                  }
                }

                // if (popup.position === dir ) {
                if (dirs.find((x) => x === popup.position)) {
                  // for (const pop of app.cellPopups) {
                  //   pop.position = '';
                  //   pop.state = false;
                  // }
                  app.cellPopups.find(
                    (x) => x.msg === popup.msg && x.cell.number.x === popup.cell.number.x && x.cell.number.x === popup.cell.number.x,
                  ).state = false;
                  app.cellPopups.find(
                    (x) => x.msg === popup.msg && x.cell.number.x === popup.cell.number.x && x.cell.number.x === popup.cell.number.x,
                  ).position = "";
                  // console.log('reconsidering...',popup.msg);
                } else {
                  popup.img = app.popupImageRef[popup.msg];
                  popupDrawCoords = app.popupDrawCalc(
                    popup.position,
                    {
                      x: popup.cell.center.x - 25,
                      y: popup.cell.center.y - 15,
                    },
                    0,
                  );
                  // app.drawPopupBubble2(context2,popupDrawCoords.origin.x,popupDrawCoords.origin.y,app.popupSize,app.popupSize,2)
                  app.drawPopupBubble(
                    context2,
                    popupDrawCoords.origin.x,
                    popupDrawCoords.origin.y,
                    app.popupSize,
                    app.popupSize,
                    5,
                    popupDrawCoords.anchor.x,
                    popupDrawCoords.anchor.y,
                    popup.color,
                  );
                  // context2.fillStyle = 'black';
                  // context2.fillText(""+popup.type+"", popupDrawCoords.origin.x+10, popupDrawCoords.origin.y+5);
                  // console.log('popup.msg',popup.msg);
                  let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;
                  context2.drawImage(
                    popup.img,
                    popupDrawCoords.origin.x + centerPopupOffset,
                    popupDrawCoords.origin.y + centerPopupOffset,
                    app.popupImgSize,
                    app.popupImgSize,
                  );
                }
              }
            }
          }
        }
      }

      // CAMERA FOCUS POINT
      if (x === app.gridWidth && y === app.gridWidth) {
        // console.log("Camera centered");
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(app.camera.focus.x, app.camera.focus.y, 10, 0, 2 * Math.PI);
        // context.arc(app.camera.zoomFocusPan.x, app.camera.zoomFocusPan.y, 10, 0, 2 * Math.PI);
        context.fill();
      }

      // TEST DRAW

      if (app.testDraw.length > 1) {
        if (x === app.gridWidth && y === app.gridWidth) {
          for (const point of app.testDraw) {
            context.fillStyle = point.color;
            context.beginPath();
            context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            context.fill();
          }
        }
        if (app.testDraw[0]?.type === "arcCrementer") {
          let lastPoint;
          context.beginPath();
          context.moveTo(app.testDraw[0].x, app.testDraw[0].y);
          for (var i = 1; i < app.testDraw.length - 1; i++) {
            context.arcTo(app.testDraw[i].x, app.testDraw[i].y, app.testDraw[i + 1].x, app.testDraw[i + 1].y, 20);
          }
          lastPoint = app.testDraw[app.testDraw.length - 1];
          context.lineTo(lastPoint.x, lastPoint.y);

          context.strokeStyle = app.testDraw[0].color;
          context.lineWidth = 5;
          context.stroke();

          if (app.testDraw[0].x2) {
            context.beginPath();
            context.moveTo(app.testDraw[0].x2, app.testDraw[0].y2);
            for (var i = 1; i < app.testDraw.length - 1; i++) {
              context.arcTo(app.testDraw[i].x2, app.testDraw[i].y2, app.testDraw[i + 1].x2, app.testDraw[i + 1].y2, 30);
            }
            lastPoint = app.testDraw[app.testDraw.length - 1];
            context.lineTo(lastPoint.x, lastPoint.y);

            context.strokeStyle = app.testDraw[0].color;
            context.lineWidth = 5;
            context.stroke();
          }

          if (app.testDraw[0].lineArray?.length > 0) {
            for (var i = 0; i < app.testDraw.length - 0; i++) {
              let pointOuter = {
                x: app.testDraw[i].x,
                y: app.testDraw[i].y,
                // x: app.testDraw[i].lineArray[0].x,
                // y: app.testDraw[i].lineArray[0].y,
              };
              let pointInner = {
                x: app.testDraw[i].x2,
                y: app.testDraw[i].y2,
                // x: app.testDraw[i].lineArray[length]?.x,
                // y: app.testDraw[i].lineArray[length]?.y,
              };
              context.beginPath();
              context.moveTo(pointInner.x, pointInner.y);
              context.lineTo(pointOuter.x, pointOuter.y);

              context.strokeStyle = app.testDraw[i].color;
              context.lineWidth = 5;
              context.stroke();
            }
          }
        } else {
          for (const point of app.testDraw) {
            if (x === app.gridWidth && y === app.gridWidth) {
              context.fillStyle = point.color;
              context.beginPath();
              context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
              context.fill();
            }
          }
        }
      }
    }
  }

  app.players[player.number - 1] = player;

  // if (player.ai.state === true ) {
  //   app.aiEvaluate(player)
  // }
}
