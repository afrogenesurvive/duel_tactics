export function drawObstaclesBarriers(app, context, context2, x, y, gridInfoCell, iso, offset, center) {
  // OBSTACLE BARRIER DIRECTIONAL ACTION ANIM
  for (const animAction of app.obstacleBarrierActionAnimationArray) {
    let lnWdth = 5;
    if (animAction.actionDirectionType === "thrust") {
      lnWdth = 8;
    }
    // for (const point of animAction.points) {
    //   context.fillStyle = point.color;
    //   context.beginPath();
    //   context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    //   context.fill();
    // }
    if (animAction.points.length > 1) {
      let lastPoint;

      context.beginPath();
      context.moveTo(animAction.points[0].x, animAction.points[0].y);
      for (var i = 1; i < animAction.points.length - 1; i++) {
        context.arcTo(animAction.points[i].x, animAction.points[i].y, animAction.points[i + 1].x, animAction.points[i + 1].y, 40);
      }
      lastPoint = animAction.points[animAction.points.length - 1];
      context.lineTo(lastPoint.x, lastPoint.y);

      context.strokeStyle = animAction.points[0].color;
      context.lineWidth = lnWdth;
      context.stroke();

      if (animAction.points[0].x2) {
        context.beginPath();
        context.moveTo(animAction.points[0].x2, animAction.points[0].y2);
        for (var i = 1; i < animAction.points.length - 1; i++) {
          context.arcTo(animAction.points[i].x2, animAction.points[i].y2, animAction.points[i + 1].x2, animAction.points[i + 1].y2, 30);
        }
        lastPoint = animAction.points[animAction.points.length - 1];
        context.lineTo(lastPoint.x, lastPoint.y);

        context.strokeStyle = animAction.points[0].color;
        context.lineWidth = lnWdth;
        context.stroke();
      }

      if (animAction.points[0].lineArray) {
        for (var i = 1; i < animAction.points.length - 1; i++) {
          if (i === animAction.points.length - 1) {
            let pointOuter = {
              x: animAction.points[i].x,
              y: animAction.points[i].y,
              // x: animAction.points[i].lineArray[0].x,
              // y: animAction.points[i].lineArray[0].y,
            };
            let pointInner = {
              x: animAction.points[i].x2,
              y: animAction.points[i].y2,
              // x: animAction.points[i].lineArray[length]?.x,
              // y: animAction.points[i].lineArray[length]?.y,
            };
            context.beginPath();
            context.moveTo(pointInner.x, pointInner.y);
            context.lineTo(pointOuter.x, pointOuter.y);

            context.strokeStyle = animAction.points[i].color;
            context.lineWidth = lnWdth;
            context.stroke();
          }
        }
      }
    }
  }

  // FALLING
  // IN BOUNDS
  if (gridInfoCell.obstacle.state === true && gridInfoCell.obstacle.moving.falling.state === true) {
    let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];

    context.drawImage(obstacleImg, gridInfoCell.obstacle.moving.nextPosition.x, gridInfoCell.obstacle.moving.nextPosition.y);
    gridInfoCell.obstacle.moving.nextPosition.y += 2;

    // console.log('falling obstacle',gridInfoCell.obstacle.moving.nextPosition,'x/y',x,y);
  }
  // OUT OF BOUNDS
  for (const obstacle of app.obstaclesOutOfBoundsFall) {
    // here!! draw at origin cell x/y
    // if (x === 0 && y === 0) {
    if (x === obstacle.moving.origin.number.x && y === obstacle.moving.origin.number.y) {
      // console.log('obstacle falling out of bounds b count',obstacle.moving.origin.center,'position',obstacle.moving.nextPosition);
      let obstacleImg = app.obstacleImgs[obstacle.type];
      context.drawImage(obstacleImg, obstacle.moving.nextPosition.x, obstacle.moving.nextPosition.y);
      obstacle.moving.nextPosition = {
        x: obstacle.moving.nextPosition.x,
        y: obstacle.moving.nextPosition.y + 2,
        // y: obstacle.moving.nextPosition.y+obstacle.moving.falling.count*5
      };
    }
  }

  // STATIONARY
  if (
    gridInfoCell.obstacle.state === true &&
    gridInfoCell.void.state !== true &&
    gridInfoCell.terrain.type !== "deep" &&
    gridInfoCell.obstacle.moving.falling.state !== true
  ) {
    let hide = false;

    if (app.obstacleBarrierToDestroy.length > 0) {
      for (const cell of app.obstacleBarrierToDestroy) {
        if (
          cell.type === "obstacle" &&
          gridInfoCell.number.x === cell.cell.number.x &&
          gridInfoCell.number.y === cell.cell.number.y &&
          gridInfoCell.obstacle.name === cell.cell.obstacle.name
        ) {
          hide = true;
        }
      }
    }

    if (app.halfPushBackObstacles.length > 0) {
      let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];

      for (const obs of app.halfPushBackObstacles) {
        if (obs.myCellNo.x === gridInfoCell.number.x && obs.myCellNo.y === gridInfoCell.number.y) {
          if (obs.state === true) {
            if (obs.countUp.state === true) {
              hide = true;
            }
          }
        }
      }
    }

    if (hide !== true) {
      let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];

      if (gridInfoCell.obstacle.moving.state !== true) {
        context2.drawImage(obstacleImg, iso.x - offset.x, iso.y - obstacleImg.height);
      } else {
        // console.log('x/y',x,y);
        // context2.drawImage(obstacleImg, gridInfoCell.obstacle.moving.nextPosition.x-offset.x, gridInfoCell.obstacle.moving.nextPosition.y- Math.ceil(obstacleImg.height/2));
      }
    }
  }

  // MOVING
  for (const cell of app.gridInfo) {
    if (cell.obstacle.state === true && cell.obstacle.moving.state === true) {
      let drawHere = {
        x: cell.obstacle.moving.origin.number.x,
        y: cell.obstacle.moving.origin.number.y,
      };
      let direction = undefined;
      if (cell.obstacle.moving.destination.number.y === cell.obstacle.moving.origin.number.y + 1) {
        direction = "south";
      }
      if (cell.obstacle.moving.destination.number.y === cell.obstacle.moving.origin.number.y - 1) {
        direction = "north";
      }
      if (cell.obstacle.moving.destination.number.x === cell.obstacle.moving.origin.number.x - 1) {
        direction = "west";
      }
      if (cell.obstacle.moving.destination.number.x === cell.obstacle.moving.origin.number.x + 1) {
        direction = "east";
      }

      if (
        cell.obstacle.moving.destination.number.x !== null &&
        cell.obstacle.moving.destination.number.x > -1 &&
        cell.obstacle.moving.destination.number.x < app.gridWidth + 1
      ) {
        if (direction === "south" || direction === "east") {
          drawHere = cell.obstacle.moving.destination.number;
        }
      }

      if (x === drawHere.x && y === drawHere.y) {
        // console.log('x/y',x,y,direction,cell.obstacle.moving.step);

        let obstacleImg = app.obstacleImgs[cell.obstacle.type];
        context2.drawImage(
          obstacleImg,
          cell.obstacle.moving.nextPosition.x - offset.x,
          cell.obstacle.moving.nextPosition.y - Math.ceil(obstacleImg.height / 2, 30, 30),
        );
      }

      // console.log('falling obstacle',gridInfoCell.obstacle.moving.nextPosition,'x/y',x,y);
    }
  }
  // HALFPUSHBACK
  if (app.halfPushBackObstacles.length > 0) {
    let drawCell;
    for (const obs of app.halfPushBackObstacles) {
      // if (obs.state === true) {
      //   if (obs.countUp.state === true) {
      //     if (obs.countUp.count === 1 && !obs.coords.x && !obs.coords.y) {
      //       obs.coords = {
      //         x: (iso.x - offset.x),
      //         y: (iso.y - (obstacleImg.height)),
      //       }
      //       drawCell = app.calcElasticCountCoords('halfPushBack','obstacle',obs).drawCell;
      //       console.log('drawCell1',drawCell);
      //       if (x === drawCell.x && y === drawCell.y) {
      //           context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
      //       }
      //
      //     }
      //     else {
      //
      //       obs.coords = app.calcElasticCountCoords('halfPushBack','obstacle',obs).coords;
      //       drawCell = app.calcElasticCountCoords('halfPushBack','obstacle',obs).drawCell;
      //       console.log('drawCell2',drawCell);
      //       if (x === drawCell.x && y === drawCell.y) {
      //           context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
      //       }
      //     }
      //   }
      // }
      if (obs.myCellNo.x === gridInfoCell.number.x && obs.myCellNo.y === gridInfoCell.number.y && gridInfoCell.obstacle.type) {
        if (obs.state === true) {
          if (obs.countUp.state === true) {
            let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];
            if (obs.countUp.count === 1 && !obs.coords.x && !obs.coords.y) {
              obs.coords = {
                x: iso.x - offset.x,
                y: iso.y - obstacleImg.height,
              };
              context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
            } else {
              obs.coords = app.calcElasticCountCoords("halfPushBack", "obstacle", obs).coords;
              context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
            }
          }
        }
      }
    }
  }

  // DROP ITEMS & DAMAGE/DESTROY OBSTACLES & BARRIERS
  for (const cell of app.obstacleBarrierToDestroy) {
    if (gridInfoCell.number.x === cell.cell.number.x && gridInfoCell.number.y === cell.cell.number.y) {
      // if (gridInfoCell.number.x === cell.cell.number.x && gridInfoCell.number.y === cell.cell.number.y && (cell.cell.obstacle.type || cell.cell.barrier.type)) {
      if (cell.count % 3 === 0) {
        if (cell.type === "obstacle" && cell.cell.obstacle.type) {
          let obstacleImg = app.obstacleImgs[cell.cell.obstacle.type];
          context2.drawImage(obstacleImg, iso.x - offset.x, iso.y - obstacleImg.height);
        }
        if (cell.type === "barrier" && cell.cell.barrier.type) {
          let barrierImg = app.barrierImgs[cell.cell.barrier.type][cell.cell.barrier.position];
          context2.drawImage(barrierImg, iso.x - offset.x, iso.y - barrierImg.height, barrierImg.width, barrierImg.height);
        }
      }
    }
  }
  for (const cell of app.obstacleItemsToDrop) {
    // console.log('obstacleItemsToDrop',cell);
    if (gridInfoCell.number.x === cell.target.x && gridInfoCell.number.y === cell.target.y) {
      if (cell.count % 3 === 0) {
        let itemImg;
        if (cell.item.type === "item") {
          itemImg = app.itemImgs[cell.item.name];
        }
        if (cell.item.type === "weapon" || cell.item.type === "armor") {
          itemImg = app.itemImgs[cell.item.subType];
        }
        context2.drawImage(itemImg, center.x - 15, center.y - 15);
      }
    }
  }

  // STATIONARY BARRIERS
  if (gridInfoCell.barrier.state === true && gridInfoCell.void.state !== true) {
    let hide = false;

    if (app.obstacleBarrierToDestroy.length > 0) {
      for (const cell of app.obstacleBarrierToDestroy) {
        if (
          cell.type === "barrier" &&
          gridInfoCell.number.x === cell.cell.number.x &&
          gridInfoCell.number.y === cell.cell.number.y &&
          gridInfoCell.barrier.name === cell.cell.barrier.name
        ) {
          hide = true;
        }
      }
    }

    if (hide !== true) {
      let barrierImg = app.barrierImgs[gridInfoCell.barrier.type][gridInfoCell.barrier.position];
      context2.drawImage(barrierImg, iso.x - offset.x, iso.y - barrierImg.height, barrierImg.width, barrierImg.height);
    }
  }
}
