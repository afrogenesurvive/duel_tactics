export function setAutoCamera(app, args, player) {
  app.camera.state = false;
  app.camera.fixed = false;
  app.settingAutoCamera = true;
  // console.log("setting auto camera instructions: ", args);

  let weaponType = "";
  if (player !== "") {
    if (player.currentWeapon.type === "spear" || player.currentWeapon.type === "sword" || player.currentWeapon.type === "") {
      weaponType = "melee";
    }
    if (player.currentWeapon.type === "crossbow" || player.currentWeapon.type === "bow") {
      weaponType = "ranged";
    }
  }

  let parsedPreInstructions = [];

  let getPath = () => {
    app.autoCamPanWaitingForPath = true;
    return new Promise((resolve, reject) => {
      let originCell = {
        x: player.currentPosition.cell.number.x,
        y: player.currentPosition.cell.number.y,
      };
      let destCell = {
        x: app.players[1].currentPosition.cell.number.x,
        y: app.players[1].currentPosition.cell.number.y,
      };

      let pathSet = [];
      app.updatePathArray();
      app.easyStar = new Easystar.js();
      app.easyStar.setGrid(app.pathArray);
      app.easyStar.setAcceptableTiles([0]);
      app.easyStar.enableDiagonals();
      app.easyStar.findPath(originCell.x, originCell.y, destCell.x, destCell.y, function (path) {
        if (path === null) {
          // console.log("Path was not found");
          reject("Path was not found");
        } else {
          pathSet = path;
          resolve(pathSet);
        }
      });
      app.easyStar.setIterationsPerCalculation(1000);
      app.easyStar.calculate();
    });
  };

  let reset = false;
  let attackFocusBreakZoomCorrection = "";
  let zoomSteps = ((app.camera.zoom.x - 1 - app.zoomThresh) / 0.02).toFixed(0);
  zoomSteps = parseInt(zoomSteps);
  if (zoomSteps === 0) {
    zoomSteps = 1;
  }
  if (zoomSteps < 0) {
    zoomSteps = zoomSteps * -1;
  }

  if (app.camera.preInstructions.length > 0 || app.camera.instructions.length > 0) {
    if (args === "attackFocusBreak" || args === "defendFocusBreak" || args === "zoomreset") {
      if (app.camera.instructions.length > 0) {
        if (
          app.camera.instructions[app.camera.instructions.length - 1].action === "zoom_in" ||
          app.camera.instructions[app.camera.instructions.length - 1].action === "zoom_out"
        ) {
          // attackFocusBreakZoomCorrection = `zoom_out_${app.camera.instructions[app.camera.instructions.length-1].count}`
          attackFocusBreakZoomCorrection = `zoom_out_${zoomSteps}`;
        }

        // app.camera.preInstructions = [];
        // app.camera.instructions = [];
        // app.camera.currentInstruction = 0;
        // app.settingAutoCamera = false;
        // reset = true;
      }
      // app.autoCamPanWaitingForPath = false;
      app.camera.preInstructions = [];
      app.camera.currentPreInstruction = 0;
      app.camera.instructions = [];
      app.camera.currentInstruction = 0;
      app.settingAutoCamera = false;
      reset = true;
    }
  }

  let zoom = app.camera.zoom.x;
  let prePanZoom = false;
  let prePanZoomAmount = 0;
  if (zoom - 1 <= app.zoomThresh) {
    prePanZoomAmount = ((app.zoomThresh - (zoom - 1)) / 0.02).toFixed(0);
    prePanZoomAmount++;
    prePanZoom = true;
  }

  let getZoom = (args2) => {
    let zoomSteps2 = 0;
    let thresh = 0;
    if (args2 === "melee") {
      // thresh = .5;
      thresh = 0.35;
      // thresh = app.zoomThresh;

      if (app.camera.zoom.x - 1 < thresh) {
        zoomSteps2 = ((thresh - (app.camera.zoom.x - 1)) / 0.02).toFixed(0);
        if (zoomSteps2 === 0) {
          zoomSteps2 = 1;
        }
        if (zoomSteps2 < 0) {
          zoomSteps2 = zoomSteps2 * -1;
        }
        app.camera.preInstructions.push("zoom_in_" + zoomSteps2 + "");
      }
      if (app.camera.zoom.x - 1 > thresh) {
        zoomSteps2 = ((app.camera.zoom.x - 1 - thresh) / 0.02).toFixed(0);
        if (zoomSteps2 === 0) {
          zoomSteps2 = 1;
        }
        if (zoomSteps2 < 0) {
          zoomSteps2 = zoomSteps2 * -1;
        }
        app.camera.preInstructions.push("zoom_out_" + zoomSteps2 + "");
      }
    }

    if (args2 === "ranged") {
      // thresh = .35;
      thresh = 0.15;
      // thresh = app.zoomThresh;

      if (app.camera.zoom.x - 1 < thresh) {
        zoomSteps2 = ((thresh - (app.camera.zoom.x - 1)) / 0.02).toFixed(0);
        if (zoomSteps2 === 0) {
          zoomSteps2 = 1;
        }
        if (zoomSteps2 < 0) {
          zoomSteps2 = zoomSteps2 * -1;
        }
        app.camera.preInstructions.push("zoom_in_" + zoomSteps2 + "");
      }

      if (app.camera.zoom.x - 1 > thresh) {
        zoomSteps2 = ((app.camera.zoom.x - 1 - thresh) / 0.02).toFixed(0);
        if (zoomSteps2 === 0) {
          zoomSteps2 = 1;
        }
        if (zoomSteps2 < 0) {
          zoomSteps2 = zoomSteps2 * -1;
        }
        app.camera.preInstructions.push("zoom_out_" + zoomSteps2 + "");
      }
    }
    // console.log('zoomSteps2',zoomSteps2);
  };

  let boltId;
  if (args.split("_")[0]) {
    if (args.split("_")[0] === "followBolt") {
      boltId = args.split("_")[1];
      args = "followBolt";
    }
  }
  let livingHumanPlayerCount = app.players.filter((x) => x.ai.state !== true && x.dead.state !== true).length;
  switch (args) {
    case "test":
      app.camera.preInstructions.push(
        "zoom_in_" + 1 + "",
        // "moveTo_" + 4 + "_" + 2 + "_fast"
        // "zoom_in_" + 10 + ""

        // "moveTo_" + 1 + "_" + 8 + "_fast",
        // "waitFor_20",
        // "moveTo_" + 1 + "_" + 1 + "_fast",
        // "waitFor_20",
        // "moveTo_" + 8 + "_" + 1 + "_fast",
        // "waitFor_20",
        // "moveTo_" + 8 + "_" + 8 + "_fast",
        // "waitFor_20",
        // "moveTo_" + 6 + "_" + 6 + "_fast",
        // "waitFor_20",
        // "moveTo_" + 6 + "_" + 3 + "_slow",
        // "waitFor_20",
        // "moveTo_" + 3 + "_" + 3 + "_slow",
        // "waitFor_20",
        // "moveTo_" + 3 + "_" + 6 + "_slow",
        // "waitFor_20",
        // "moveTo_" + 6 + "_" + 6 + "_slow"
        // "zoom_in_" + 5 + ""
        // "zoom_outToInit"
        // "move&&zoom_in_" + 1 + "_" + 5 + "_slow_" + 5
        "move&&zoom_in_" + 5 + "_" + 1 + "_fast_" + 8,
      );

      break;
    case "attackFocus":
      if (prePanZoom === true) {
        app.camera.preInstructions.push("zoom_in_" + prePanZoomAmount + "");
      }

      if (livingHumanPlayerCount === 1) {
        app.camera.preInstructions.push(
          "moveTo_" + player.currentPosition.cell.number.x + "_" + player.currentPosition.cell.number.y + "_fast",
          // 'waitFor_50',
        );

        if (weaponType === "melee") {
          getZoom(weaponType);
        }

        if (weaponType === "ranged") {
          getZoom(weaponType);
        }
      }

      if (livingHumanPlayerCount === 2) {
        // twoPlayerCalc();
        getPath()
          .then((pathSet) => {
            // console.log('Path set:', pathSet);
            parsedPreInstructions = pathSet;

            finish();
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        let finish = () => {
          app.autoCamPanWaitingForPath = false;
          // console.log('parsedPreInstructions',parsedPreInstructions);

          if (parsedPreInstructions.length < 4) {
            // console.log('attack focus auto cam: 2 players in close range');

            if (prePanZoom === true) {
              app.camera.preInstructions.push("zoom_in_" + prePanZoomAmount + "");
            }

            if (weaponType === "melee") {
              app.camera.preInstructions.push(
                "moveTo_" + player.currentPosition.cell.number.x + "_" + player.currentPosition.cell.number.y + "_fast",
              );

              getZoom(weaponType);
            }

            if (weaponType === "ranged") {
              getZoom(weaponType);
            }
          } else {
            // console.log('attack focus auto cam: 2 players at a distance');

            // console.log('preInstructions',parsedPreInstructions,parsedPreInstructions[(parsedPreInstructions.length/2).toFixed(0)]);

            let intermediateCell = app.getIntermediateCellByArea(parsedPreInstructions);

            app.camera.preInstructions.push(
              "moveTo_" + intermediateCell.x + "_" + intermediateCell.y + "_fast",
              // 'waitFor_50',
            );

            getZoom("ranged");
          }
        };
      }

      break;
    case "defendFocus":
      weaponType = "melee";
      if (prePanZoom === true) {
        app.camera.preInstructions.push("zoom_in_" + prePanZoomAmount + "");
      }

      if (livingHumanPlayerCount === 1) {
        app.camera.preInstructions.push(
          "moveTo_" + player.currentPosition.cell.number.x + "_" + player.currentPosition.cell.number.y + "_fast",
          // 'waitFor_50',
        );

        if (weaponType === "melee") {
          getZoom(weaponType);
        }
      }

      if (livingHumanPlayerCount === 2) {
        // twoPlayerCalc();
        getPath()
          .then((pathSet) => {
            // console.log('Path set:', pathSet);
            parsedPreInstructions = pathSet;

            finish();
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        let finish = () => {
          app.autoCamPanWaitingForPath = false;
          // console.log('parsedPreInstructions',parsedPreInstructions);

          if (parsedPreInstructions.length < 4) {
            // console.log('attack focus auto cam: 2 players in close range');

            if (prePanZoom === true) {
              app.camera.preInstructions.push("zoom_in_" + prePanZoomAmount + "");
            }

            if (weaponType === "melee") {
              app.camera.preInstructions.push(
                "moveTo_" + player.currentPosition.cell.number.x + "_" + player.currentPosition.cell.number.y + "_fast",
              );

              getZoom(weaponType);
            }
          } else {
            // console.log('attack focus auto cam: 2 players at a distance');

            // console.log('preInstructions',parsedPreInstructions,parsedPreInstructions[(parsedPreInstructions.length/2).toFixed(0)]);

            let intermediateCell = app.getIntermediateCellByArea(parsedPreInstructions);

            app.camera.preInstructions.push(
              "moveTo_" + intermediateCell.x + "_" + intermediateCell.y + "_fast",
              // 'waitFor_50',
            );

            getZoom("ranged");
          }
        };
      }

      break;
    case "attackFocusBreak":
      app.autoCamPanWaitingForPath = false;
      if (app.camera.zoom.x - 1 > app.zoomThresh) {
        if (reset === true && attackFocusBreakZoomCorrection !== "") {
          app.camera.preInstructions.push(attackFocusBreakZoomCorrection);
        } else {
          let zoomDifference = 0;
          app.camera.preInstructions.push("zoom_outToInit");
        }
      }
      break;
    case "defendFocusBreak":
      app.autoCamPanWaitingForPath = false;
      if (app.camera.zoom.x - 1 > app.zoomThresh) {
        if (reset === true && attackFocusBreakZoomCorrection !== "") {
          app.camera.preInstructions.push(attackFocusBreakZoomCorrection);
        } else {
          let zoomDifference = 0;
          app.camera.preInstructions.push("zoom_outToInit");
        }
      }
      break;
    case "zoomReset":
      if (zoom - 1 < app.zoomThresh) {
        app.camera.preInstructions.push("zoom_inToInit");
      }
      if (zoom - 1 > app.zoomThresh) {
        app.camera.preInstructions.push("zoom_outToInit");
      }
      if (app.settingAutoCameraFollowBolt === true) {
        app.settingAutoCameraFollowBolt = false;
      }

      break;
    case "playerSpawnFocus":
      if (prePanZoom === true) {
        app.camera.preInstructions.push("zoom_in_" + prePanZoomAmount + "");
      }

      if (livingHumanPlayerCount === 1) {
        app.camera.preInstructions.push(
          "moveTo_" + player.currentPosition.cell.number.x + "_" + player.currentPosition.cell.number.y + "_fast",
          // 'waitFor_50',
        );

        getZoom("melee");

        app.camera.preInstructions.push("waitFor_50");

        app.camera.preInstructions.push("zoom_outToInit");
      }

      if (livingHumanPlayerCount === 2) {
        getPath()
          .then((pathSet) => {
            // console.log('Path set:', pathSet);
            parsedPreInstructions = pathSet;

            finish();
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        let finish = () => {
          app.autoCamPanWaitingForPath = false;
          if (parsedPreInstructions.length < 4) {
            // console.log('plyr spawn focus auto cam: 2 players in close range');

            app.camera.preInstructions.push(
              "moveTo_" + app.players[0].currentPosition.cell.number.x + "_" + app.players[0].currentPosition.cell.number.y + "_fast",
            );

            getZoom("melee");
          } else {
            // console.log('plyr spawn focus auto cam: 2 players at a distance','zoomadjust',Math.ceil((((app.camera.zoom.x-1)-.35)*10)*5));

            // console.log('preInstructions',parsedPreInstructions,parsedPreInstructions[(parsedPreInstructions.length/2).toFixed(0)]);

            let intermediateCell = app.getIntermediateCellByArea(parsedPreInstructions);

            app.camera.preInstructions.push("moveTo_" + intermediateCell.x + "_" + intermediateCell.y + "_fast");

            getZoom("ranged");
          }

          app.camera.preInstructions.push("waitFor_50");

          app.camera.preInstructions.push("zoom_outToInit");
        };
      }

      // console.log('player spawn focus preInstructions',app.camera.preInstructions);
      break;
    case "aiSpawnFocus":
      if (prePanZoom === true) {
        app.camera.preInstructions.push("zoom_in_" + prePanZoomAmount + "");
      }

      app.camera.preInstructions.push(
        "moveTo_" + player.currentPosition.cell.number.x + "_" + player.currentPosition.cell.number.y + "_fast",
        // 'waitFor_50',
      );

      getZoom("ranged");

      app.camera.preInstructions.push("waitFor_50");

      app.camera.preInstructions.push("zoom_outToInit");

      // console.log('aiSpawnFocus app.camera.preInstructions',app.camera.preInstructions);

      break;
    case "pushbackPan":
      // pan to pushback target
      break;
    case "followBolt":
      app.settingAutoCameraFollowBolt = true;
      if (prePanZoom === true) {
        app.camera.preInstructions.push("zoom_in_" + prePanZoomAmount + "");
      }
      let bolt = app.projectiles.find((x) => x.id === boltId);
      app.camera.preInstructions.push("moveTo_" + bolt.origin.number.x + "_" + bolt.origin.number.y + "_fast");
      let endCell = {
        x: 0,
        y: 0,
      };
      switch (bolt.direction) {
        case "north":
          endCell.x = bolt.origin.number.x;
          endCell.y = 0;
          break;
        case "south":
          endCell.x = bolt.origin.number.x;
          endCell.y = app.gridWidth;
          break;
        case "west":
          endCell.x = 0;
          endCell.y = bolt.origin.number.y;
          break;
        case "east":
          endCell.x = app.gridWidth;
          endCell.y = bolt.origin.number.y;
          break;
        default:
          break;
      }
      app.camera.preInstructions.push("moveTo_" + endCell.x + "_" + endCell.y + "_fast");

      break;
    default:
  }

  if (app.camera.preInstructions.length === 0 && app.autoCamPanWaitingForPath !== true) {
    app.settingAutoCamera = false;
  }
}
