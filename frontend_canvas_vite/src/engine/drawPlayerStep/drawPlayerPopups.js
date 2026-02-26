export function drawPlayerPopups(app, plyr, player, context2, x, y, point) {
  // PLAYER POPUPS
  if (x === app.gridWidth && y === app.gridWidth && app.hideAllPopups !== true) {
    let popupBorderColor = app.playerColourRef["player" + plyr.number + ""];

    if (plyr.dead.state !== true && plyr.popups.length > 0) {
      for (const popup of plyr.popups) {
        if (popup.state === true) {
          // console.log('drawing a popup');
          let popupDrawCoords;
          if (popup.position === "" || !popup.position) {
            let currentPopups = plyr.popups.filter((x) => x.state === true);
            // let positions = ['north','east','south','west','northEast','southEast','southWest']
            let positions = ["north", "east", "south", "west", "northEast", "northWest", "southEast", "southWest"];

            // REMOVE 1ST FREE POSITION IF IT'S THE SAME AS PLAYER'S DIRECTION
            if (plyr.strafing.state === true) {
              if (positions[0] === plyr.strafing.direction) {
                const first = positions.shift();
                positions.push(first);
              }
            } else {
              if (positions[0] === plyr.direction) {
                const first = positions.shift();
                positions.push(first);
              }
            }

            // REMOVE POSITIONS ALREADY TAKEN BY PLAYERS' OTHER POPUPS
            for (const popup2 of currentPopups) {
              if (popup2.position && popup2.position !== "") {
                let indx = positions.indexOf(popup2.position);
                positions.splice(indx, 1);
              }
            }

            let dir = undefined;

            // CHECK OTHER PLAYER'S POSITION AND THE POPUPS POSITION
            // REMOVE OCCUPIED POSITIONS
            for (const plyr2 of app.players) {
              if (plyr2.ai.state !== true && plyr2.number !== plyr.number) {
                let myPos = plyr.currentPosition.cell.number;
                let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;

                dir = undefined;
                // let invalidPositions = [invalidPos];

                // GET DIRECTION OF OTHER PLAYER CELL RELATIVE TO ME
                dir = app.getDirectionFromCells(myPos, invalidPos);

                if (dir && positions.includes(dir) === true) {
                  positions.splice(positions.indexOf(dir), 1);
                  // console.log('player popups (unset): human player position is close to player',plyr.number,' @ ',invalidPos,'dir',dir);
                  // console.log('dont draw over player @',dir,'choose frome these position',positions);
                }

                // GET DIRECTION OF ALL OTHER PLAYERS' POPUPS OCCUPY, RELATIVE TO ME
                for (const pop of plyr2.popups) {
                  dir = undefined;

                  if (pop.state === true) {
                    let invalidPos2 = {
                      x: undefined,
                      y: undefined,
                    };

                    invalidPos2 = app.getCellFromDirection(1, invalidPos, pop.position);

                    dir = app.getDirectionFromCells(myPos, invalidPos2);

                    if (dir && positions.includes(dir) === true) {
                      positions.splice(positions.indexOf(dir), 1);
                      // console.log('player popups (unset): human player popup position is close to player',plyr.number,' @ ',invalidPos2,'dir',dir);
                      // console.log('dont draw over player @',dir,'choose frome these position',positions);
                    }
                  }
                }
              }
            }

            // GET DIRECTION OF CELL POPUPS' POPUPS  CELLS RELATIVE TO ME
            // REMOVE OCCUPIED POSITIONS
            for (const popup2 of app.cellPopups) {
              dir = undefined;

              if (popup2.state === true) {
                let myPos = plyr.currentPosition.cell.number;
                let cellPos = popup2.cell.number;
                let invalidPos2 = {
                  x: undefined,
                  y: undefined,
                };

                invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

                dir = app.getDirectionFromCells(myPos, invalidPos2);

                if (dir && positions.includes(dir) === true) {
                  positions.splice(positions.indexOf(dir), 1);
                  // console.log('player popups (unset): cell popup position is close to player',plyr.number,' @ ',invalidPos2,'dir',dir);
                  // console.log('dont draw over player @',dir,'choose frome these position',positions);
                }

                // let indx = positions.indexOf(popup2.position);
                // positions.splice(indx,1)
              }
            }

            // console.log('new or postponed popup ',popup.msg,'position',positions[0]);

            if (!positions[0]) {
              // console.log(
              //   "no open positions for new or postponed popup",
              //   popup.msg
              // );
              popup.state = false;
              popup.count = 0;
            } else {
              popup.position = positions[0];
              if (currentPopups.find((x) => x.msg === popup.msg)) {
                // console.log("popup already exists", popup.msg);
              }
            }

            let popupProgress = false;
            let showProgress = false;
            let writeValue = false;
            if (
              plyr.prePush.state === true ||
              plyr.prePull.state === true ||
              plyr.dodging.state === true ||
              plyr.action === "dodging" ||
              plyr.action === "defending" ||
              plyr.action === "attacking" ||
              plyr.attacking.state === true
            ) {
              showProgress = true;
            }
            if (
              popup.msg === "attacking1" ||
              popup.msg === "attacking2" ||
              popup.msg === "defending" ||
              popup.msg === "prePush" ||
              popup.msg === "prePull" ||
              popup.msg === "dodging" ||
              popup.msg === "charging"
            ) {
              popupProgress = true;
            }

            if (popup.img === "") {
              popup.img = app.popupImageRef[popup.msg];
            }

            if (popup.msg.split("_")) {
              if (popup.msg.split("_")[0] === "hpUp" || popup.msg.split("_")[0] === "hpDown") {
                writeValue = true;
                popup.img = app.popupImageRef[popup.msg.split("_")[0]];
              }
            }

            popupDrawCoords = app.popupDrawCalc(popup.position, { x: point.x - 25, y: point.y - 25 }, plyr.number);

            app.drawPopupBubble(
              context2,
              popupDrawCoords.origin.x,
              popupDrawCoords.origin.y,
              app.popupSize,
              app.popupSize,
              5,
              popupDrawCoords.anchor.x,
              popupDrawCoords.anchor.y,
              popupBorderColor,
            );
            let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;

            if (showProgress === true && popupProgress === true) {
              let perc = app.playerPopupProgressCalc(plyr, popup);
              context2.fillStyle = app.popupProgressImgGradColor2;
              context2.beginPath();
              // context2.roundRect(popupDrawCoords.origin.x,(popupDrawCoords.origin.y)+app.popupSize, app.popupSize, app.popupSize*perc, 5);
              // context2.stroke();
              context2.fillStyle = app.popupProgressImgGradColor1;
              context2.roundRect(popupDrawCoords.origin.x, popupDrawCoords.origin.y + app.popupSize, 10, app.popupSize * perc, 5);
              context2.fill();
              // console.log("playerPopupProgress init", perc);
            }

            if (writeValue === true) {
              context2.font = "15px Arial";
              context2.fillStyle = "black";
              context2.fillText(
                popup.msg.split("_")[1],
                popupDrawCoords.origin.x + (app.popupSize - popup.msg.split("_")[1].length * 7) / 2,
                popupDrawCoords.origin.y + 15,
              );

              centerPopupOffset = (app.popupSize - app.popupImgSize * 0.75) / 2;
              context2.drawImage(
                popup.img,
                popupDrawCoords.origin.x + centerPopupOffset,
                popupDrawCoords.origin.y + (centerPopupOffset + 5),
                app.popupImgSize * 0.75,
                app.popupImgSize * 0.75,
              );
            } else {
              context2.drawImage(
                popup.img,
                popupDrawCoords.origin.x + centerPopupOffset,
                popupDrawCoords.origin.y + centerPopupOffset,
                app.popupImgSize,
                app.popupImgSize,
              );
            }
          } else if (popup.position !== "northWest") {
            let dir = undefined;
            let dirs = [];

            let currentPopups = app.cellPopups.filter((x) => x.state === true);

            // HAVE ANY OTHER PLAYERS OR OTHER PLAYERS' POPUPS MOVED TO INVALID POSITIONS SINCE POPUP'S 1ST DRAW
            for (const plyr2 of app.players) {
              if (plyr2.ai.state !== true && plyr2.number !== plyr.number) {
                let myPos = plyr.currentPosition.cell.number;
                let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;

                dir = app.getDirectionFromCells(myPos, invalidPos);

                if (dir) {
                  // console.log('player popups (set): human player position is close to player',plyr.number,' @ ',invalidPos,' dir ',dir);
                  dirs.push(dir);
                }

                for (const pop of plyr2.popups) {
                  dir = undefined;
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
                  if (dir) {
                    // console.log('player popups (set): human player popup position is close to player',plyr.number,' @ ',invalidPos2,' dir ',dir);
                    dirs.push(dir);
                  }
                }
              }
            }

            // HAVE ANY CELL POPUPS MOVED TO A NEARBY CELL TO ME
            for (const popup2 of currentPopups) {
              dir = undefined;

              let myPos = plyr.currentPosition.cell.number;

              let cellPos = popup2.cell.number;
              let invalidPos2 = {
                x: undefined,
                y: undefined,
              };

              invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

              dir = app.getDirectionFromCells(myPos, invalidPos2);

              if (dir) {
                // console.log('player popups (set): cell popup position is close to player',plyr.number,' @ ',invalidPos2,' dir ',dir);
                dirs.push(dir);
              }
            }

            // console.log('dirs',dirs,'popup.position',popup.position);
            // if (popup.position === dir ) {
            if (dirs.find((x) => x === popup.position)) {
              plyr.popups.find((x) => x.msg === popup.msg).position = "";
              plyr.popups.find((x) => x.msg === popup.msg).state = false;
              console.log("A new invalid direction === popup's position. reconsidering...", popup.msg);
            } else {
              let popupProgress = false;
              let showProgress = false;
              let writeValue = false;
              if (
                plyr.prePush.state === true ||
                plyr.prePull.state === true ||
                plyr.dodging.state === true ||
                plyr.action === "dodging" ||
                plyr.action === "defending" ||
                plyr.action === "attacking" ||
                plyr.attacking.state === true
              ) {
                showProgress = true;
              }
              if (
                popup.msg === "attacking" ||
                popup.msg === "attacking1" ||
                popup.msg === "attacking2" ||
                popup.msg === "defending" ||
                popup.msg === "prePush" ||
                popup.msg === "prePull" ||
                popup.msg === "dodging" ||
                popup.msg === "charging"
              ) {
                popupProgress = true;
              }

              if (popup.img === "") {
                popup.img = app.popupImageRef[popup.msg];
              }

              if (popup.msg.split("_")) {
                if (popup.msg.split("_")[0] === "hpUp" || popup.msg.split("_")[0] === "hpDown") {
                  writeValue = true;
                  popup.img = app.popupImageRef[popup.msg.split("_")[0]];
                }
              }

              popupDrawCoords = app.popupDrawCalc(popup.position, { x: point.x - 25, y: point.y - 25 }, plyr.number);
              app.drawPopupBubble(
                context2,
                popupDrawCoords.origin.x,
                popupDrawCoords.origin.y,
                app.popupSize,
                app.popupSize,
                5,
                popupDrawCoords.anchor.x,
                popupDrawCoords.anchor.y,
                popupBorderColor,
              );
              let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;

              if (showProgress === true && popupProgress === true) {
                let perc = app.playerPopupProgressCalc(plyr, popup);
                context2.fillStyle = app.popupProgressImgGradColor2;
                context2.beginPath();
                // context2.roundRect(popupDrawCoords.origin.x,(popupDrawCoords.origin.y)+app.popupSize, app.popupSize, app.popupSize*perc, 5);
                // context2.stroke();
                context2.fillStyle = app.popupProgressImgGradColor1;
                context2.roundRect(popupDrawCoords.origin.x, popupDrawCoords.origin.y + app.popupSize, 10, app.popupSize * perc, 5);
                context2.fill();
                // console.log(
                //   "playerPopupProgress continue",
                //   perc,
                //   app.popupSize * perc
                // );
              }

              if (writeValue === true) {
                context2.font = "15px Arial";
                context2.fillStyle = "black";
                context2.fillText(
                  popup.msg.split("_")[1],
                  popupDrawCoords.origin.x + (app.popupSize - popup.msg.split("_")[1].length * 7) / 2,
                  popupDrawCoords.origin.y + 15,
                );

                centerPopupOffset = (app.popupSize - app.popupImgSize * 0.75) / 2;
                context2.drawImage(
                  popup.img,
                  popupDrawCoords.origin.x + centerPopupOffset,
                  popupDrawCoords.origin.y + (centerPopupOffset + 5),
                  app.popupImgSize * 0.75,
                  app.popupImgSize * 0.75,
                );
              } else {
                if (player.action === "defending" && popup.msg === "defending") {
                  if (player.defending.peak === true) {
                    popup.img = app.popupImageRef.defending_1;
                  }
                  if (player.defending.decay.state === true) {
                    let prog = 100 - (player.defending.decay.count / player.defending.decay.limit) * 100;
                    if (prog > 10) {
                      popup.img = app.popupImageRef.defending_4;
                    }
                    if (prog > 30) {
                      popup.img = app.popupImageRef.defending_3;
                    }
                    if (prog > 50) {
                      popup.img = app.popupImageRef.defending_2;
                    }
                    if (prog > 70) {
                      popup.img = app.popupImageRef.defending_1;
                    }
                  } else {
                    popup.img = app.popupImageRef.defending;
                  }
                }
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
  }
}
